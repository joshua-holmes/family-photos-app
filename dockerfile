FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app.py ./google_api.py ./config.py ./utilities.py ./
COPY ./database/db.py ./database/schema.sql ./database/
COPY ./.secrets/photoslibrary_v1.token ./.secrets/

CMD ["flask", "run"]
# CMD [ "gunicorn", "-w 2", "app:app"]