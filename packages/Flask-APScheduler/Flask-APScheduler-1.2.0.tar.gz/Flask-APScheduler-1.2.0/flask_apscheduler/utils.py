# Copyright 2015 Vinicius Chiele. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Utility module."""

import json

from collections import OrderedDict
from flask import Response


def job_to_dict(job):
    """Converts a job to an OrderedDict."""

    items = [
        ('id', job.id),
        ('name', job.name),
        ('func', job.func_ref),
        ('args', job.args),
        ('kwargs', job.kwargs),
        ('trigger', str(job.trigger))
    ]

    if not job.pending:
        items += [
            ('misfire_grace_time', str(job.misfire_grace_time)),
            ('max_instances', str(job.max_instances)),
            ('next_run_time', str(job.next_run_time))
        ]

    return OrderedDict(items)


def jsonify(data, status=None):
    return Response(json.dumps(data, indent=2), status=status, mimetype='application/json')


def fix_job_def(job_def):
    # it keeps compatibility backward
    if isinstance(job_def.get('trigger'), dict):
        trigger = job_def.pop('trigger')
        job_def['trigger'] = trigger.pop('type', 'date')
        job_def.update(trigger)
