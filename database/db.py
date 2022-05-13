import sqlite3
from flask import g
from datetime import datetime

DATABASE = './database/db.sqlite'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def db_exe(query, mode='r'):
    try:
        db = get_db()
        cur = db.execute(query)
        res = cur.fetchall()
        if mode == 'w': 
            res = True
            db.commit()
            cur.close()
        return res
    except Exception as e:
        now = datetime.today()
        with open(f'./database/logs/{now.date()}.txt', 'a') as f:
            f.write(f'{now.time()} error occurred:\n{e}\n\n')
        return False

def parse_data(data, fields):
    def parse_record(record):
        return {field: value for field, value in zip(fields, record)}
    if (fields[0] == '*'):
        return [list(record) for record in data]
    return [parse_record(record) for record in data]

def select(fields, table, where=None, one=False):
    if type(fields) is str: fields = [fields]
    query = f"SELECT {', '.join(fields)} FROM {table}"
    if where:
        query += f" WHERE {where}"
    data = db_exe(query)
    if not data:
        return None
    result = parse_data(data, fields)
    return result[0] if one and len(result) else result

def insert(table, data):
    values = [f"'{v}'" for v in data.values()]
    query = f"INSERT INTO {table} ({', '.join(data)}) VALUES ({', '.join(values)})"
    is_successful = db_exe(query, mode='w')
    return is_successful

def update(table, data, join_table=None, join_predicate=None, where=None):
    values = [f"'{v}'" for v in data.values()]
    col_vals = [f"{col} = {val}" for col, val in zip(data, values)]
    query = f"UPDATE {table} SET {', '.join(col_vals)}"
    # if join_table and join_predicate:
    #     query += f" FROM {table} LEFT JOIN {join_table} ON {join_predicate}"
    if where:
        query += f" WHERE {where}"
    print(query)
    is_successful = db_exe(query, mode='w')
    return is_successful