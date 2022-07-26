import bcrypt
from jinja2 import Undefined
import pyodbc, json
from pycessor import Pycessor

try:
  pyc = Pycessor()
  path = pyc.input['path']
  db = None
  with open(path) as f:
    db = pyodbc.connect(r'Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ='+json.load(f)['DBQ'])
    user = pyc.input['user']
    pswd = pyc.input['pswd']
    cursor = db.cursor()
    query = 'SELECT Entry, First, Middle, Last, Username, Password, Active FROM Techs WHERE username=?'
    cursor.execute(query, user)
    for tech in cursor.fetchall():
        if bcrypt.checkpw(pswd.encode('utf-8'), tech[5].encode('utf-8')) and tech[6] == 'Yes':
          info = [tech[0], tech[1], tech[2], tech[3]]
          pyc.output = { 'ret': info, 'err': None }
    if 'ret' not in pyc.output: pyc.output = { 'ret':  [], 'err': 'Username or password not found.' }
except (Exception, pyodbc.Error) as e:
    pyc.output = { 'ret': [], 'err': str(e)}
finally:
    pyc.flush()
    if db: db.close()