# Copyright 2014 Kong Luoxing

# Licensed under the Apache License, Version 2.0 (the 'License'); you may not
# use this file except in compliance with the License. You may obtain a copy
# of the License at http://www.apache.org/licenses/LICENSE-2.0

import datetime
from copy import deepcopy

try:
    import simplejson as json
except ImportError:
    import json

from celery.beat import Scheduler, ScheduleEntry
from celery.utils.log import get_logger
from celery import current_app
import celery.schedules

from redis.client import StrictRedis

from decoder import DateTimeDecoder, DateTimeEncoder

# share with result backend
rdb = StrictRedis.from_url(current_app.conf.CELERY_REDIS_SCHEDULER_URL)

ADD_ENTRY_ERROR = """\

Couldn't add entry %r to redis schedule: %r. Contents: %r
"""

logger = get_logger(__name__)
debug, info, error = logger.debug, logger.info, logger.error


class ValidationError(Exception):
    pass


class PeriodicTask(object):
    '''represents a periodic task
    '''
    name = None
    task = None

    type_ = None

    interval = None
    crontab = None

    args = []
    kwargs = {}

    queue = None
    exchange = None
    routing_key = None

    # datetime
    expires = None
    enabled = True

    # datetime
    last_run_at = None

    total_run_count = 0

    date_changed = None
    description = None

    no_changes = False

    def __init__(self, name, task, schedule, key, queue='celery', enabled=True, task_args=[], task_kwargs={}, **kwargs):
        self.task = task
        self.enabled = enabled
        if isinstance(schedule, self.Interval):
            self.interval = schedule
        if isinstance(schedule, self.Crontab):
            self.crontab = schedule

        self.queue = queue

        self.args = task_args
        self.kwargs = task_kwargs

        self.name = name
        self.key = key

    class Interval(object):

        def __init__(self, every, period='seconds'):
            self.every = every
            # could be seconds minutes hours
            self.period = period

        @property
        def schedule(self):
            return celery.schedules.schedule(datetime.timedelta(**{self.period: self.every}))

        @property
        def period_singular(self):
            return self.period[:-1]

        def __unicode__(self):
            if self.every == 1:
                return 'every {0.period_singular}'.format(self)
            return 'every {0.every} {0.period}'.format(self)

    class Crontab(object):

        def __init__(self, minute, hour, day_of_week, day_of_month, month_of_year):
            self.minute = minute
            self.hour = hour
            self.day_of_week = day_of_week
            self.day_of_month = day_of_month
            self.month_of_year = month_of_year

        @property
        def schedule(self):
            return celery.schedules.crontab(minute=self.minute,
                                            hour=self.hour,
                                            day_of_week=self.day_of_week,
                                            day_of_month=self.day_of_month,
                                            month_of_year=self.month_of_year)

        def __unicode__(self):
            rfield = lambda f: f and str(f).replace(' ', '') or '*'
            return '{0} {1} {2} {3} {4} (m/h/d/dM/MY)'.format(
                rfield(self.minute), rfield(self.hour), rfield(self.day_of_week),
                rfield(self.day_of_month), rfield(self.month_of_year),
            )

    @staticmethod
    def get_all(key_prefix):
        """get all of the tasks, for best performance with large amount of tasks, return a generator
        """
        tasks = rdb.keys(key_prefix + '*')
        for task_key in tasks:
            try:
                dct = json.loads(rdb.get(task_key), cls=DateTimeDecoder)
                # task name should always correspond to the key in redis to avoid
                # issues arising when saving keys - we want to add information to
                # the current key, not create a new key
                dct['key'] = task_key
                yield dct
            except json.JSONDecodeError:  # handling bad json format by ignoring the task
                get_logger(__name__).warning('ERROR Reading task value at %s', task_key)

    def delete(self):
        rdb.delete(self.name)

    def save(self):
        # must do a deepcopy
        self_dict = deepcopy(self.__dict__)
        if self_dict.get('interval'):
            self_dict['interval'] = self.interval.__dict__
        if self_dict.get('crontab'):
            self_dict['crontab'] = self.crontab.__dict__

        # remove the key from the dict so we don't save it into the redis
        del self_dict['key']
        rdb.set(self.key, json.dumps(self_dict, cls=DateTimeEncoder))

    def clean(self):
        """validation to ensure that you only have
        an interval or crontab schedule, but not both simultaneously"""
        if self.interval and self.crontab:
            msg = 'Cannot define both interval and crontab schedule.'
            raise ValidationError(msg)
        if not (self.interval or self.crontab):
            msg = 'Must defined either interval or crontab schedule.'
            raise ValidationError(msg)

    @staticmethod
    def from_dict(d):
        """
        build PeriodicTask instance from dict
        :param d: dict
        :return: PeriodicTask instance
        """
        if d.get('interval'):
            schedule = PeriodicTask.Interval(d['interval']['every'], d['interval']['period'])
        if d.get('crontab'):
            schedule = PeriodicTask.Crontab(
                d['crontab']['minute'],
                d['crontab']['hour'],
                d['crontab']['day_of_week'],
                d['crontab']['day_of_month'],
                d['crontab']['month_of_year']
            )
        task = PeriodicTask(d['name'], d['task'], schedule, d['key'])
        for elem in d:
            if elem not in ('interval', 'crontab', 'schedule'):
                setattr(task, elem, d[elem])
        return task

    @property
    def schedule(self):
        if self.interval:
            return self.interval.schedule
        elif self.crontab:
            return self.crontab.schedule
        else:
            raise Exception('must define interval or crontab schedule')

    def __unicode__(self):
        fmt = '{0.name}: {{no schedule}}'
        if self.interval:
            fmt = '{0.name}: {0.interval}'
        elif self.crontab:
            fmt = '{0.name}: {0.crontab}'
        else:
            raise Exception('must define internal or crontab schedule')
        return fmt.format(self)


class RedisScheduleEntry(ScheduleEntry):
    def __init__(self, task):
        self._task = task

        self.app = current_app._get_current_object()
        self.name = self._task.key  # passing key here as the task name is a human use only field.
        self.task = self._task.task

        self.schedule = self._task.schedule

        self.args = self._task.args
        self.kwargs = self._task.kwargs
        self.options = {
            'queue': self._task.queue,
            'exchange': self._task.exchange,
            'routing_key': self._task.routing_key,
            'expires': self._task.expires
        }
        if not self._task.total_run_count:
            self._task.total_run_count = 0
        self.total_run_count = self._task.total_run_count

        if not self._task.last_run_at:
            # subtract some time from the current time to populate the last time
            # that the task was run so that a newly scheduled task does not get missed
            time_subtract = (self.app.conf.CELERYBEAT_MAX_LOOP_INTERVAL or 30)
            self._task.last_run_at = self._default_now() - datetime.timedelta(seconds=time_subtract)
            self.save()
        self.last_run_at = self._task.last_run_at

    def _default_now(self):
        return self.app.now()

    def next(self):
        self._task.last_run_at = self.app.now()
        self._task.total_run_count += 1
        return self.__class__(self._task)

    __next__ = next

    def is_due(self):
        due = self.schedule.is_due(self.last_run_at)
        if not self._task.enabled:
            get_logger(__name__).info('task %s disabled', self.name)
            # if the task is disabled, we always return false, but the time that
            # it is next due is returned as usual
            return False, due[1]
        return due

    def __repr__(self):
        return '<RedisScheduleEntry ({0} {1}(*{2}, **{3}) {{4}})>'.format(
            self.name, self.task, self.args,
            self.kwargs, self.schedule,
        )

    def reserve(self, entry):
        new_entry = Scheduler.reserve(entry)
        return new_entry

    def save(self):
        if self.total_run_count > self._task.total_run_count:
            self._task.total_run_count = self.total_run_count
        if self.last_run_at and self._task.last_run_at and self.last_run_at > self._task.last_run_at:
            self._task.last_run_at = self.last_run_at
        self._task.save()

    @classmethod
    def from_entry(cls, name, skip_fields=('relative', 'options'), **entry):
        options = entry.get('options') or {}
        fields = dict(entry)
        for skip_field in skip_fields:
            fields.pop(skip_field, None)
        fields['name'] = current_app.conf.CELERY_REDIS_SCHEDULER_KEY_PREFIX + name
        schedule = fields.pop('schedule')
        schedule = celery.schedules.maybe_schedule(schedule)
        if isinstance(schedule, celery.schedules.crontab):
            fields['crontab'] = {
                'minute': schedule._orig_minute,
                'hour': schedule._orig_hour,
                'day_of_week': schedule._orig_day_of_week,
                'day_of_month': schedule._orig_day_of_month,
                'month_of_year': schedule._orig_month_of_year
            }
        elif isinstance(schedule, celery.schedules.schedule):
            fields['interval'] = {'every': max(schedule.run_every.total_seconds(), 0), 'period': 'seconds'}

        fields['args'] = fields.get('args', [])
        fields['kwargs'] = fields.get('kwargs', {})
        fields['queue'] = options.get('queue')
        fields['exchange'] = options.get('exchange')
        fields['routing_key'] = options.get('routing_key')
        fields['key'] = fields['name']
        return cls(PeriodicTask.from_dict(fields))


class RedisScheduler(Scheduler):
    # how often should we sync in schedule information
    # from the backend redis database
    UPDATE_INTERVAL = datetime.timedelta(seconds=5)

    Entry = RedisScheduleEntry

    def __init__(self, *args, **kwargs):
        if hasattr(current_app.conf, 'CELERY_REDIS_SCHEDULER_URL'):
            get_logger(__name__).info('backend scheduler using %s',
                                      current_app.conf.CELERY_REDIS_SCHEDULER_URL)
        else:
            get_logger(__name__).info('backend scheduler using %s',
                                      current_app.conf.CELERY_REDIS_SCHEDULER_URL)

        self._schedule = {}
        self._last_updated = None
        Scheduler.__init__(self, *args, **kwargs)
        self.max_interval = (kwargs.get('max_interval') \
                             or self.app.conf.CELERYBEAT_MAX_LOOP_INTERVAL or 300)

    def setup_schedule(self):
        self.install_default_entries(self.schedule)
        self.update_from_dict(self.app.conf.CELERYBEAT_SCHEDULE)

    def requires_update(self):
        """check whether we should pull an updated schedule
        from the backend database"""
        if not self._last_updated:
            return True
        return self._last_updated + self.UPDATE_INTERVAL < datetime.datetime.now()

    def get_from_database(self):
        # self.sync()
        d = {}
        for task in PeriodicTask.get_all(current_app.conf.CELERY_REDIS_SCHEDULER_KEY_PREFIX):
            t = PeriodicTask.from_dict(task)
            d[t.key] = RedisScheduleEntry(t)
        return d

    def update_from_dict(self, dict_):
        s = {}
        for name, entry in dict_.items():
            try:
                s[name] = self.Entry.from_entry(name, **entry)
            except Exception as exc:
                error(ADD_ENTRY_ERROR, name, exc, entry)
        self.schedule.update(s)

    @property
    def schedule(self):
        if self.requires_update():
            self._schedule = self.get_from_database()
            self._last_updated = datetime.datetime.now()
        return self._schedule

    def sync(self):
        for entry in self._schedule.values():
            entry.save()

    def close(self):
        self.sync()
