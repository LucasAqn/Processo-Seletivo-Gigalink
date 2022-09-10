function loadRequestDetails(RequestId){
    let response = JSON.parse(doGET("http://127.0.0.1:3000/requestDetails"));
    let detailsTable = document.getElementById("requestDetailTable")
    let productsTable = document.getElementById("requestProductsTable")
    
    let detailsRow = newDetailsRow(response.requestDetails)
    detailsTable.appendChild(detailsRow.requestDetails);

    response.productsList.forEach(element => {
        let row = newProductRow(element);    
        productsTable.appendChild(row);
        
    });
  
}

function newDetailsRow(element){
    row = document.createElement("tr");
    newId.document.createElement("td");
    newDate.document.createElement("td");
    newInvoice.document.createElement("td");
    newShippingCompanyName.document.createElement("td");
    newShippingFee.document.createElement("td");
    newDiscount.document.createElement("td");
    newAmount.document.createElement("td");

    newId.innerHTML = element.pedido.id
    newDate.innerHTML = element.pedido.datahora
    newInvoice.innerHTML = element.pedido.notaFiscal
    newShippingCompanyName.innerHTML = element.transportadora.nome
    newShippingFee.innerHTML = element.pedido.valorFrete
    newDiscount.innerHTML = element.pedido.desconto
    newAmount.innerHTML = element.pedido.valorTotal

    row.appendChild(newId);
    row.appendChild(newDate);
    row.appendChild(newInvoice);
    row.appendChild(newShippingCompanyName);
    row.appendChild(newShippingFee);
    row.appendChild(newDiscount);
    row.appendChild(newAmount);

    return row;
}

function newProductRow(element){
    row = document.createElement("tr");
    newProduct.document.createElement("td");
    newQuantity.document.createElement("td");
    newPrice.document.createElement("td");
    
    newProduct.innerHTML = element.produto.nome
    newQuantity.innerHTML = element.item.quantidade
    newPrice.innerHTML = element.item.valor
   
    row.appendChild(newProduct);
    row.appendChild(newQuantity);
    row.appendChild(newPrice);

    return row;
}

function doGET(url){
    let connection = new XMLHttpRequest()
    connection.open("GET",url,false)
    connection.send()
    return connection.responseText
}