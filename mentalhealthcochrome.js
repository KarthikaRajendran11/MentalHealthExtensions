const API_KEY = "AIzaSyBnXdHoymkdhSY2oDso-IoAaeeKa13DCqc"
let userSignedIn = false
let email = ""

chrome.identity.getProfileUserInfo({accountStatus : 'ANY'}, function(userInfo) {
    email = userInfo["email"]
});

chrome.identity.getAuthToken({'interactive': true}, function (token) {
    if ( chrome.runtime.lastError)
    {
        console.log( "ERROR! " + chrome.runtime.lastError.message );
        return;
    }
    console.log(token)
    if ( typeof token != 'undefined ')
    {
        access_token = token;
        console.log(access_token)
    }
    
});

chrome.history.onVisited.addListener(function(result) {
    var data = {
        "url" : result.url,
        "email": email,
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('GET', 'POST', 'OPTIONS');
    var response = fetch("https://EC2Co-EcsEl-13VVDBYDJCR4H-496411098.us-east-1.elb.amazonaws.com/website", {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors',
        headers: headers
    })
    response
        .then(value => {console.log(value)})
        .catch(err => {console.log(err)})
});
