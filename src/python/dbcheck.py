from jinja2 import Undefined
import pyodbc, json
from pycessor import Pycessor

try:
  pyc = Pycessor()
  path = pyc.input['path']
  db = None
  with open(path) as f:
    db = pyodbc.connect(r'Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ='+json.load(f)['DBQ'])
    pyc.output = { 'ret':  True, 'err': None}
except (Exception, pyodbc.Error) as e:
    pyc.output = { 'ret': False, 'err': str(e)}
finally:
    pyc.flush()
    if db: db.close()