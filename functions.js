function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Retrieves the code from the URL, which is then used in the 'body' in 
// fetchAccessToken
function getCode(){
  let code = null;
  const queryString = window.location.search;
  if(querystring > 0){
    const urlParams = new URLSearchParams(querystring);
    code = urlParams.get('code');
  }
  return code;
}

// After user accepts request, this function creates the 'body' with its
// respective parameters, which is then used in callAuthorizationAPI(body)
function fetchAccessToken(code){
  let body = "grant_type=authorization_code";
  body += "&code" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  callAuthorizationAPI(body);
}

function callAuthorizationAPI(body){
  let xhr = new XMLHttpRequest();
  xhr.OPEN("POST", TOKEN, true);
  xhr.setRequestHeader('Content-Type', application/x-www-form-urlencoded);
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
  if (this.status == 200){
      var data = JSON.parse(this.responseText);
      console.log(data);
      var data = JSON.parse(this.responseText);
      if(data.access_token != undefined){
          access_token = data.access_token;
          localStorage.setItem("access_token", access_token);
      }
      if(data.refresh_token  != undefined){
          refresh_token = data.refresh_token;
          localStorage.setItem("refresh_token", refresh_token);
      }
      onPageLoad();
  }
  else {
      console.log(this.responseText);
      alert(this.responseText);
  }
}

function callAPI(method, url, body, callback){
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true)
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  xhr.send(body);
  xhr.onload = callback;
}

  module.exports = { generateRandomString };
