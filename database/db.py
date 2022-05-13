import sqlite3
from flask import g
from datetime import today

DATABASE = 'db.sqlite3'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def db_exe(query, mode='r'):
    try:
        cur = get_db().execute(query)
        rv = cur.fetchall()
        cur.close()
        if mode == 'w': return True
        return rv
    except Exception as e:
        now = datetime.today()
        with open(f'./logs/{now.date()}.txt', 'a') as f:
            f.write(f'{now.time()} error occurred:\n{e}')
        return False

def parse_data(data, fields):
    def parse_record(record):
        return {field: value for field, value in zip(fields, data)}
    if (fields[0] == '*'):
        return [list(record) for record in data]
    return [parse_record(record) for record in data]

def select(fields, table, where):
    if type(fields) is str: fields = [fields]
    query = f"SELECT {', '.join(fields)} FROM {table}"
    if where:
        query += f" WHERE {where}"
    data = db_exe(query)
    result = parse_data(data, fields)
    return result