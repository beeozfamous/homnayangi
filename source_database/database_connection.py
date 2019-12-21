import psycopg2

MASTERNAME = "ptsang"
PASSWORD = "695930599"
DATABASE_NAME = "postgres"
ENDPOINT = "homnayanlondatabase.cemjothahgv9.ap-southeast-1.rds.amazonaws.com"
PORT ="5432"

engine = psycopg2.connect(
    database=DATABASE_NAME,
    user=MASTERNAME,
    password=PASSWORD,
    host=ENDPOINT,
    port=PORT
)

