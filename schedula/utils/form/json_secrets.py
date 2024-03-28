import json
import hashlib
from flask import session


def dumps_secret(o):
    dhash = hashlib.sha256()
    dhash.update(json.dumps(o, sort_keys=True).encode())
    key = dhash.hexdigest()
    if not '$secrets' in session:
        session['$secrets'] = {}
    if key not in session['$secrets']:
        session['$secrets'][key] = o
    return key


def loads_secret(key):
    return session['$secrets'][key]


def secrets(obj, dumps=True):
    if isinstance(obj, list):
        return [secrets(v, dumps) for v in obj]
    elif isinstance(obj, dict):
        res = {
            k: secrets(v, dumps)
            for k, v in obj.items() if '$secret' != k
        }
        if '$secret' in obj:
            res = {}
            if dumps:
                res['$secret'] = dumps_secret(obj['$secret'])
            else:
                obj = loads_secret(obj['$secret'])
                if res:
                    res.update(obj)
                else:
                    res = obj

        return res
    return obj


def dumps(obj, **kwargs):
    return json.dumps(secrets(obj), **kwargs)


def loads(s, **kwargs):
    return secrets(json.loads(s, **kwargs), dumps=False)