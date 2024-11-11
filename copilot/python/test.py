# write a function to query postgres   database given an user 
def query_postgres(user):
    import psycopg2
    conn = psycopg2.connect("dbname='postgres' user='postgres' host='localhost' password='postgres'")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE user = %s", (user,))
    rows = cur.fetchall()
    return rows


# Path: github/programming/copilot/python/test.py
# Compare this snippet from github/programming/copilot/copilot/python/test.py


# write test function of the above function
def test_query_postgres():
    assert query_postgres("test") == [("