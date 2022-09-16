function appendProduct(name,quantity,price){
    var table = document.getElementById("productTable");
     
    if(!name || !quantity || !price){
        alert('Preencha todos os campos para adicionar novo produto!');
    }
    else{
        var newRow = table.insertRow(table.rows.length);
        var newName = newRow.insertCell(0);
        var newQuantity = newRow.insertCell(1);
        var newPrice = newRow.insertCell(2);

        newName.innerHTML = name;
        newQuantity.innerHTML = quantity;
        newPrice.innerHTML = price;
        updateAmount(quantity,price);
    }
      
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
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));

    request.onload = function(){
        response = JSON.parse(this.responseText);
        let feedback = response["feedback"];
        alert(feedback);
    };

}

function sendRequestInfo(){
    //e.preventDefault();   
    table = document.getElementById("productTable");
    let invoice = document.getElementById("invoice").value;
    
    if(invoice==''){
        alert("Atribua um valor de Nota Fiscal para gerar um novo Pedido...");
    }
    else
        if(table.rows.length<=1){
            alert("Adicione ao menos um produto para gerar um novo Pedido...");
        }
        else{
            let ShippingFee = document.getElementById("ShippingFee").value;
            let invoice = document.getElementById("invoice").value;
            let Discount = document.getElementById("Discount").value;
            let shippingCompanyId = document.getElementById("shippingCompanyId").value;
            let productAmount = document.getElementById("requestAmount").getAttribute("value");
            let  requestAmount =  parseFloat(productAmount);

            if(!ShippingFee == '') {
                requestAmount  += parseFloat(ShippingFee) ;
            }
            if(!Discount == ''){
                requestAmount -= parseFloat(Discount);
            }

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
            doPOST("http://127.0.0.1:3000/addRequest", body);
            
        }
}

function updateAmount(productQuantity,productPrice){
    let currentAmount = document.getElementById("requestAmount").getAttribute("value");
    let newAmount = parseFloat(currentAmount) + (parseFloat(productQuantity) * parseFloat(productPrice));
    document.getElementById("requestAmount").setAttribute("value", newAmount);
    document.getElementById("requestAmount").innerHTML = "Valor Total em produtos: " + newAmount;
}