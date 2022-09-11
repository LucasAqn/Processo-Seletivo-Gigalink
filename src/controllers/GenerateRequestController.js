function appendProduct(productName, productQuantity, productPrice){
    let response = doGET("http://127.0.0.1:3000/searchProduct/" + productName)
    let productId = JSON.parse(response);

    var table = document.getElementById("productTable");
    var newRow = table.insertRow(table.rows.length);
    
    var newProductId = newRow.insertCell(0);
    var newProductName = newRow.insertCell(1);
    var newQuantity = newRow.insertCell(2);
    var newPrice = newRow.insertCell(3);
    if(!productName || !productQuantity || !productPrice){
        alert('Preencha todos os campos para adicionar novo produto!');
    }
    else{
        newProductId.innerHTML = productId;
        newProductName.innerHTML = productName;
        newQuantity.innerHTML = productQuantity;
        newPrice.innerHTML = productPrice;
        document.getElementById("requestAmount").innerHTML = document.getElementById("requestAmount").value + (productQuantity * productPrice);
    }
    
}

function doGET(url){
    let connection = new XMLHttpRequest()
    connection.open("GET",url,false)
    connection.send()
    return connection.responseText
} 

function setRequestDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hrs = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    document.getElementById("requestDate").innerHTML =  year + "/" + month + "/" + day  + "  " + hrs + ":" + min + ":" + sec;
}

function setAmount(){

}