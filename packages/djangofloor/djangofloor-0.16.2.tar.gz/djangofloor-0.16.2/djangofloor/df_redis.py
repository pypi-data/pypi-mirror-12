# -*- coding: utf-8 -*-
"""Emulate some functionalities of the websockets.

A call from Python to JavaScript is stored in the Redis database.
The JS client polls all signals for it.

These functions are reserved for private use only.

"""
from __future__ import unicode_literals
import json
from django.http import HttpRequest
from djangofloor.decorators import SignalRequest

from django.conf import settings
from redis import ConnectionPool, StrictRedis
from djangofloor.tasks import get_signal_encoder, get_signal_decoder

__author__ = 'Matthieu Gallet'


redis_connection_pool = ConnectionPool(**settings.WS4REDIS_CONNECTION)
WS4REDIS_PREFIX = settings.WS4REDIS_PREFIX


def push_signal_call(request, signal_name, kwargs):
    """
    Store signal data into Redis for future use (by fetch_calls)
    :param request:
    :type request:
    :param signal_name:
    :type signal_name:
    :param kwargs:
    :type kwargs:
    :return:
    :rtype:
    """
    assert isinstance(request, SignalRequest)
    connection = StrictRedis(connection_pool=redis_connection_pool)
    signal_data = {'signal': signal_name, 'options': kwargs}
    connection.lpush('%s-session-%s' % (WS4REDIS_PREFIX, request.session_key), json.dumps(signal_data, cls=get_signal_encoder()).encode('utf-8'))


def fetch_signal_calls(request):
    """
    Fetch signal data for a given client (identified by its session key).

    :param request:
    :type request:
    :return:
    :rtype:
    """
    key = None
    if isinstance(request, SignalRequest):
        key = request.session_key
    elif isinstance(request, HttpRequest):
        key = request.session.session_key if request.session else None
    connection = StrictRedis(connection_pool=redis_connection_pool)
    result = []
    signal_data = connection.lpop('%s-session-%s' % (WS4REDIS_PREFIX, key))
    while signal_data:
        result.append(json.loads(signal_data.decode('utf-8'), cls=get_signal_decoder()))
        signal_data = connection.lpop('%s-session-%s' % (WS4REDIS_PREFIX, key))
    return result
