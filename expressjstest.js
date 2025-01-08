//The following JavaScript code example implements the /login method using Express framework to initiate the authorization request:
import "functions.js"

// Import Express and Querystring
const express = require('express');
const querystring = require('querystring');
const { generateRandomString } = require('./functions');


var client_id = '82528eb71dcd4f9cb0223b53b6a59ab5'; // client_
var client_secret = "";
var redirect_uri = 'http://localhost:8080/callback'; //callback url
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";

var app = express();

//app.get function -- same as requestAuthorization **Probably NOT using the expressjs way...
app.get('/login', function(req, res) {

  var state = generateRandomString(16); //Optional
  var scope = 'user-read-private user-read-email'; //Look at what these scopes mean, we're asking the permissions we want, which are the user's read-email, read-private

  res.redirect('https://accounts.spotify.com/authorize?' +  //querystring.stringify() builds the url we are redirecting to (after authorization)
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

//app.listen sets up and runs the server
app.listen(8080, function() {
    console.log('Server is running on http://localhost:8080');
  });
  
  //ChatGPT says "Now, when you run this, visiting http://localhost:8080/login will trigger the redirect."
