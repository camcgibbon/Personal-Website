import os
from flask import Flask, request, redirect
import requests
import base64
import urllib

app = Flask(__name__)

@app.route('/')
def login():
    scope = "user-top-read"
    auth_url = "https://accounts.spotify.com/authorize"

    query_parameters = {
        "response_type": "code",
        "redirect_uri": "http://localhost:5001/callback",
        "scope": scope,
        "client_id": os.environ.get('CLIENT_ID')
    }

    url_args = "&".join(["{}={}".format(key,urllib.parse.quote(val)) for key,val in query_parameters.items()])
    auth_url = "{}/?{}".format(auth_url, url_args)
    return redirect(auth_url)

@app.route("/callback")
def callback():
    code = request.args.get('code')
    print(f"Code: {code}")
    token_url = "https://accounts.spotify.com/api/token"
    client_id = os.environ.get('CLIENT_ID')
    client_secret = os.environ.get('CLIENT_SECRET')
    client_creds = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    headers = {
        "Authorization": "Basic " + client_creds
    }
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:5001/callback"
    }
    r = requests.post(token_url, headers=headers, data=payload)
    return r.json()

if __name__ == '__main__':
    app.run(debug=True)
