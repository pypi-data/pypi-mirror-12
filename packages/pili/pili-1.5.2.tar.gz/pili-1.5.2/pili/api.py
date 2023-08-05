from .auth import auth_interface
import pili.conf as conf
from urllib2 import Request
import json

@auth_interface
def create_stream(**args):
    keyword = ['hub', 'title', 'publishKey', 'publishSecurity']
    if set(args) - set(keyword):
        raise ValueError('invalid key')
    encoded = json.dumps(args)
    url = "http://%s/%s/streams" % (conf.API_HOST, conf.API_VERSION)
    return Request(url=url, data=encoded)

@auth_interface
def get_stream(stream_id):
    url = "http://%s/%s/streams/%s" % (conf.API_HOST, conf.API_VERSION, stream_id)
    return Request(url=url)

@auth_interface
def get_stream_list(**args):
    keyword = ['hub', 'marker', 'limit', 'title']
    if set(args) - set(keyword):
        raise ValueError('invalid key')
    url = "http://%s/%s/streams?" % (conf.API_HOST, conf.API_VERSION)
    for k in args:
        if args[k] is not None:
            url += "&%s=%s" % (k, args[k])
    req = Request(url=url)
    return req

@auth_interface
def update_stream(stream_id, **args):
    keyword = ['publishKey', 'publishSecurity', 'disabled']
    if set(args) - set(keyword):
        raise ValueError('invalid key')
    encoded = json.dumps(args)
    url = "http://%s/%s/streams/%s" % (conf.API_HOST, conf.API_VERSION, stream_id)
    return Request(url=url, data=encoded)

@auth_interface
def delete_stream(stream_id):
    url = "http://%s/%s/streams/%s" % (conf.API_HOST, conf.API_VERSION, stream_id)
    req = Request(url=url)
    req.get_method = lambda: 'DELETE'
    return req

@auth_interface
def get_status(stream_id):
    url = "http://%s/%s/streams/%s/status" % (conf.API_HOST, conf.API_VERSION, stream_id)
    return Request(url=url)

@auth_interface
def get_segments(stream_id, start_second=None, end_second=None, limit=None):
    url = "http://%s/%s/streams/%s/segments" % (conf.API_HOST, conf.API_VERSION, stream_id)
    if start_second and end_second:
        url += "?start=%s&end=%s" % (start_second, end_second)
    if limit != None:
        url += "&limit=%s" % (limit)
    return Request(url=url)

@auth_interface
def save_stream_as(stream_id, **args):
    keyword = ['name', 'notifyUrl', 'start', 'end', 'format']
    if set(args) - set(keyword):
        raise ValueError('invalid key')
    encoded = json.dumps(args)
    url = "http://%s/%s/streams/%s/saveas" % (conf.API_HOST, conf.API_VERSION, stream_id)
    return Request(url=url, data=encoded)

@auth_interface
def snapshot_stream(stream_id, **args):
    keyword = ['name', 'format', 'time', 'notifyUrl']
    if set(args) - set(keyword):
        raise ValueError('invalid key')
    encoded = json.dumps(args)
    url = "http://%s/%s/streams/%s/snapshot" % (conf.API_HOST, conf.API_VERSION, stream_id)
    return Request(url=url, data=encoded)
