function appendProduct(productName, productQuantity, productPrice){
    let response = doGET("http://127.0.0.1:3000/searchProduct?productName=" + productName)
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
        updateAmount(productQuantity,productPrice);
    }
    
}

function doGET(url){
    let connection = new XMLHttpRequest()
    connection.open("GET",url,false)
    connection.send()
    return connection.responseText
} 


function updateAmount(productQuantity,productPrice){
    let currentAmount = document.getElementById("requestAmount").getAttribute("value");
    let newAmount = parseFloat(currentAmount) + (parseFloat(productQuantity) * parseFloat(productPrice));
    console.log(newAmount);
    document.getElementById("requestAmount").setAttribute("value", newAmount);
    document.getElementById("requestAmount").innerHTML = "Valor Total: " + newAmount;
}