import base64
import requests
import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade

app = Flask(__name__)

#SQLite Database
app.secret_key = os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI').replace('mysql://', 'mysql+pymysql://')
db = SQLAlchemy(app)

migrate = Migrate(app, db)

# @app.before_first_request
# def create_tables():
    # Upgrade the database to the latest revision
    # with app.app_context():
        # upgrade()

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(500), nullable=False)

#Spotify Integration
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
REFRESH_TOKEN = os.environ.get('REFRESH_TOKEN')

def refresh_spotify_token():
    auth = base64.b64encode(f'{CLIENT_ID}:{CLIENT_SECRET}'.encode()).decode()

    headers = {
        'Authorization': f'Basic {auth}'
    }

    data = {
        'grant_type': 'refresh_token',
        'refresh_token': REFRESH_TOKEN
    }

    response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
    return response.json().get('access_token')

@app.route('/spotify')
def spotify():
    token = refresh_spotify_token()

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', headers=headers)
    return response.json()


#Primary Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/contactme', methods=['POST'])
def contactme():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    contact = Contact(name=name, email=email, message=message)
    db.session.add(contact)
    db.session.commit()

    return jsonify('Thanks for your message! I will get back to you shortly.')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
