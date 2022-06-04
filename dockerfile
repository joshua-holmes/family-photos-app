FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app.py ./google_api.py ./config.py ./utilities.py ./
COPY ./database/db.py ./database/schema.sql ./database/
RUN mkdir ./database/logs

CMD [ "gunicorn", "-b 0.0.0.0:5000", "-w 2", "app:app"]