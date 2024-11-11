from flask import Flask
app = Flask(__name__)

# This decorator maps the root URL '/' to the hello_world function below
# When a user visits the root URL, Flask will call hello_world()
@app.route('/')
def hello_world():
    return '<h1>Flask Dockerized For David on K8!</h1>'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

