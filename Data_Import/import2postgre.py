import psycopg2
conn = psycopg2.connect(
    "host=localhost dbname=postgres user=postgres password=222333")
cur = conn.cursor()

queries = ["""
            CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            created_at Date NOT NULL,
            order_name text NOT NULL,
            customer_id text Not NULL
        )""",
           """
        CREATE TABLE order_items (
            id SERIAL PRIMARY KEY,
            order_id integer NOT NULL,
            price_per_unit DOUBLE PRECISION,
            quantity integer NOT NULL,
            product text NOT NULL,
               FOREIGN KEY (order_id)
                REFERENCES orders (id)
                ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
           """
        CREATE TABLE deliveries (
            id SERIAL PRIMARY KEY,
            order_item_id integer NOT NULL,
            delivered_quantity integer NOT NULL,
            FOREIGN KEY (order_item_id)
                REFERENCES order_items (id)
                ON UPDATE CASCADE ON DELETE CASCADE
        )
        """
           ]

for query in queries:
    cur.execute(query)
    print("pass")

files = ["Test task - Postgres - orders.csv",
         "Test task - Postgres - order_items.csv", "Test task - Postgres - deliveries.csv"]
tables = ["orders", "order_items", "deliveries"]

SQL_STATEMENT = """
    COPY %s FROM STDIN WITH
        CSV
        HEADER
        DELIMITER AS ','
    """


def process_file(conn, table_name, file_object):
    cursor = conn.cursor()
    cursor.copy_expert(sql=SQL_STATEMENT % table_name, file=file_object)
    conn.commit()
    cursor.close()


for i in range(len(files)):
    f = open(files[i], 'r')
    process_file(conn, tables[i], f)
    f.close()


conn.commit()
