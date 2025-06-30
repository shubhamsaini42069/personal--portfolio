from flask import Flask, render_template, request, redirect, url_for
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()


uri = os.getenv("MONGO_URI")

if not uri:
    raise Exception("MONGO_URI not found in .env")


client = MongoClient(uri, server_api=ServerApi('1'))
db = client['portfolio']
messages = db['messages']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    # Save to MongoDB
    messages.insert_one({
        'name': name,
        'email': email,
        'message': message
    })
    return f"Thank you, {name}! Your message has been sent."

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
