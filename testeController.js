
function loadRequestDetails(){
    let response = doGET("http://127.0.0.1:3000/VisualizeRequests")
    console.log(response)
}
function doGET(url){
    let connection = new XMLHttpRequest()
    connection.open("GET",url)
    connection.send()
    return connection.responseText
}
