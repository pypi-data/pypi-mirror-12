import requests
import json
import re

from .filterhandler import filter_handler
from .habanero_utils import switch_classes
from .exceptions import *

def request(url, path, ids = None, query = None, filter = None,
        offset = None, limit = None, sample = None, sort = None,
        order = None, facet = None, works = None, agency = False, **kwargs):

  url = url + path

  filt = filter_handler(filter)

  payload = {'query':query, 'filter':filt, 'offset':offset,
             'rows':limit, 'sample':sample, 'sort':sort,
             'order':order, 'facet':facet}
  payload = dict((k, v) for k, v in payload.iteritems() if v)

  if(ids.__class__.__name__ == 'NoneType'):
    url = url.strip("/")
    tt = requests.get(url, params = payload, **kwargs)
    tt.raise_for_status()
    check_json(tt)
    js = tt.json()
    coll = switch_classes(js, path, works, agency)
  else:
    if(ids.__class__.__name__ == "str"):
      ids = ids.split()
    if(ids.__class__.__name__ == "int"):
      ids = [ids]
    coll = []
    for i in range(len(ids)):
      if works:
        endpt = url + str(ids[i]) + "/works"
      else:
        if agency:
          endpt = url + str(ids[i]) + "/agency"
        else:
          endpt = url + str(ids[i])

      endpt = endpt.strip("/")
      tt = requests.get(endpt, params = payload, **kwargs)
      tt.raise_for_status()
      check_json(tt)
      js = tt.json()
      tt_out = switch_classes(js, path, works, agency)
      coll.append(tt_out)

    if len(coll) == 1:
      coll = coll[0]

  return coll

def check_json(x):
  ctype = x.headers['Content-Type']
  matched = re.match("application/json", ctype)
  if matched.__class__.__name__ == 'NoneType':
    scode = x.status_code
    if str(x.text) == "Not implemented.":
      scode = 400
    raise RequestError(scode, str(x.text))
