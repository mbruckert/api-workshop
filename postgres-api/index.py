import psycopg2
from flask import Flask, request, jsonify
import os

app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ['HOST'],
        database=os.environ['DATABASE'],
        user=os.environ['USERNAME'],
        password=os.environ['PASSWORD']
    )
    return conn


@app.route('/posts', methods=['GET', 'POST'])
def posts():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == 'GET':
        cur.execute("SELECT * FROM posts")
        posts = cur.fetchall()
        return jsonify(posts)

    if request.method == 'POST':
        data = request.get_json()
        cur.execute("INSERT INTO posts (title, content, author) VALUES (%s, %s, %s)",
                    (data['title'], data['content'], data['author']))
        conn.commit()
        return jsonify(data)

    conn = get_db_connection()
    cur = conn.cursor()


if __name__ == '__main__':
    app.run(debug=True)
