
import sqlite3

connection=sqlite3.connect('database/data.db')
cursor=connection.cursor()

create_table="CREATE TABLE users (id int,username text,password text)"
cursor.execute(create_table)

users=[
    (1,'ptsang','123456'),
(2,'bmnguyen','123456'),
(3,'hphat','123456'),
(4,'ntkien','123456'),
(5,'vdquan','123456')
]

insert_query= "INSERT INTO users VALUES(?,?,?) "
cursor.executemany(insert_query,users)

select_query="SELECT * FROM users"
for row in cursor.execute(select_query):
    print(row)

connection.commit()
connection.close()