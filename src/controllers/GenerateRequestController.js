function appendProduct(name,quantity,price){
    var table = document.getElementById("productTable");
    var newRow = table.insertRow(table.rows.length);
    
    if(!name || !quantity || !price){
        alert('Preencha todos os campos para adicionar novo produto!');
    }
    else{
        var newName = newRow.insertCell(0);
        var newQuantity = newRow.insertCell(1);
        var newPrice = newRow.insertCell(2);

        newName.innerHTML = name;
        newQuantity.innerHTML = quantity;
        newPrice.innerHTML = price;
    }
    updateAmount(quantity,price);  
}
function createProductList(productList,table){
    for(i = 0; i < (table.rows.length-1); i++){
        productList[i] = new Array(3);    
        productList[i][0] = (table.rows[i+1].cells[0].innerText);
        productList[i][1] = (table.rows[i+1].cells[1].innerText);
        productList[i][2] = (table.rows[i+1].cells[2].innerText);
        
    }
    console.log(productList)
}

function doPOST(url, body){
    console.log("BODY DEPOIS=", body)
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    request.onload= function (){
        console.log(this.request.responseText);
    }
}

function sendProductInfo(){
    //e.preventDefault();
    
    table = document.getElementById("productTable");
    let invoice = document.getElementById("invoice").value;

    productList = new Array((table.rows.length-1));
    createProductList(productList,table);
    
    console.log(productList);

    body = {
        "requestInvoice": invoice,
        "productList": productList,
    }
    console.log(body);

    //let response = JSON.parse(doPOST("http://127.0.0.1:3000/addProductInfo", body));
    //let feedback = response["feedback"];
    //console.log(feedback);
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