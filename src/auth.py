# Needed to authorize the application
# auth_token expires in 1 hour

from dotenv import load_dotenv
import os
import base64
from requests import post, get
import json
# import flask?

# Load environment variables from a .env file into the OS environment.
load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

# This token extraction uses Client Credentials Flow, which is app-specific and does not provide access to user-specific features like playback control.
# To authenticate a user, we'll need a redirect_uri
def getToken():
    auth_string = client_id + ":" + client_secret
    # Convert the combined string into bytes and encode it in Base64 format.
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"   # Spotify's API endpoint for retrieving access tokens.
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content) # Parse the JSON response from Spotify, then extract the access token
    token = json_result["access_token"]
    return token

def getAuthHeader(token):
    return {"Authorization": "Bearer " + token}

# Example code from https://www.youtube.com/watch?v=WAmEZBEeNmg&t=402s&ab_channel=AkamaiDeveloper
def searchArtist(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = getAuthHeader(token)
    query = f"?q={artist_name}&type=artist&limit=1"
    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)["artists"]["items"]

    if len(json_result) == 0:
        print("No artist with this name exists...")
        return None
    
    return json_result[0]

def getPlaybackState(token):
    playback_url = "https://api.spotify.com/v1/me/player" # endpoint
    headers = getAuthHeader(token)
    # query
    # result

token = getToken()
print(token)
print("\n")
print(searchArtist(token, "Kanye West"))
