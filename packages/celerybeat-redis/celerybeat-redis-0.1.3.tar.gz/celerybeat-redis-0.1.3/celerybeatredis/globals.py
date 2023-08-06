# -*- coding: utf-8 -*-
# Copyright 2014 Kong Luoxing

# Licensed under the Apache License, Version 2.0 (the 'License'); you may not
# use this file except in compliance with the License. You may obtain a copy
# of the License at http://www.apache.org/licenses/LICENSE-2.0

from redis.client import StrictRedis
from celery import current_app
from celery.utils.log import get_logger

rdb = StrictRedis.from_url(current_app.conf.CELERY_REDIS_SCHEDULER_URL)

ADD_ENTRY_ERROR = """\

Couldn't add entry %r to redis schedule: %r. Contents: %r
"""

logger = get_logger(__name__)
