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
        return this.request.responseText;
    }
}

function sendRequestInfo(){
    //e.preventDefault();
    
    table = document.getElementById("productTable");
    let ShippingFee = document.getElementById("ShippingFee").value;
    let invoice = document.getElementById("invoice").value;
    let Discount = document.getElementById("Discount").value;
    let shippingCompanyId = document.getElementById("shippingCompanyId").value;
    let productAmount = document.getElementById("requestAmount").getAttribute("value");

    let  requestAmount =  parseFloat(productAmount) + (parseFloat(ShippingFee) - parseFloat(Discount));
    console.log(requestAmount)

    productList = new Array((table.rows.length-1));
    createProductList(productList,table);
    
    body = {
        "shippingCompanyId": shippingCompanyId,
        "requestInvoice": invoice,
        "requestShippingFee": ShippingFee,
        "requestDiscount": Discount,
        "requestAmount": requestAmount,
        "productList": productList,
    }

    let response = JSON.parse(doPOST("http://127.0.0.1:3000/addRequest", body));
    let feedback = response["feedback"];
    alert(feedback);
}

function updateAmount(productQuantity,productPrice){
    let currentAmount = document.getElementById("requestAmount").getAttribute("value");
    let newAmount = parseFloat(currentAmount) + (parseFloat(productQuantity) * parseFloat(productPrice));
    document.getElementById("requestAmount").setAttribute("value", newAmount);
    document.getElementById("requestAmount").innerHTML = newAmount;
}