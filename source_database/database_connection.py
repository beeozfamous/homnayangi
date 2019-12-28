import psycopg2

MASTERNAME = "bmnguyen"
PASSWORD = "thewinner123"
DATABASE_NAME = "postgres"
ENDPOINT = "database-test.cemjothahgv9.ap-southeast-1.rds.amazonaws.com"
PORT ="5432"

engine = psycopg2.connect(
    database=DATABASE_NAME,
    user=MASTERNAME,
    password=PASSWORD,
    host=ENDPOINT,
    port=PORT
)

