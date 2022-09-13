function doGET(url){
    let connection = new XMLHttpRequest()
    connection.open("GET",url,false)
    connection.send()
    return connection.responseText
}

function loadRequestDetails(id){
    let response = JSON.parse(doGET("http://127.0.0.1:3000/requestDetails?Id="+id));
    let requestDetails = response["requestDetails"][0];
    let productsList = response["productsList"];

    createDetailsTable(requestDetails);

    for(i = 0; i < productsList.length; i++){
        createProductsTable(productsList[i]);       
    }
   
    document.getElementById("requestTable").style.display = "none";
    document.getElementById("requestDetailsBox").style.display = "block";
    document.getElementById("returnLink").setAttribute("href","/VisualizeRequests");   
    
}

function createDetailsTable(requestDetails){
    var table = document.getElementById("requestDetailsTable");
    var newRow = table.insertRow(table.rows.length);
    
    var newId = newRow.insertCell(0);
    var newDate = newRow.insertCell(1);
    var newInvoice = newRow.insertCell(2);
    var newShippingCompany = newRow.insertCell(3);
    var newShippingFee = newRow.insertCell(4);
    var newDiscount = newRow.insertCell(5);
    var newAmount = newRow.insertCell(6);
   
    newId.innerHTML = requestDetails.id;
    newDate.innerHTML = requestDetails.datahora;
    newInvoice.innerHTML = requestDetails.notaFiscal;
    newShippingCompany.innerHTML = requestDetails.nome;
    newShippingFee.innerHTML = requestDetails.valorFrete;
    newDiscount.innerHTML = requestDetails.desconto;
    newAmount.innerHTML = requestDetails.valorTotal;

}

function createProductsTable(product){
    var table = document.getElementById("requestProductsTable");
    var newRow = table.insertRow(table.rows.length);
    
    var newProduct = newRow.insertCell(0);
    var newQuantity = newRow.insertCell(1);
    var newPrice = newRow.insertCell(2);
   
    newProduct.innerHTML = product.nome;
    newQuantity.innerHTML = product.quantidade;
    newPrice.innerHTML = product.valor;
}
    /*/renderizar de novo o div do requestDetails
    console.log(itens)
    html = ""
    itens["productsList"].forEach((product) => {
        html += "<span>"+ product.nome + ',' + product.quantidade +"</span>"
    })
    itens["requestDetails"].forEach((pedido) => {
        html += "<span>"+ pedido.id + ',' + pedido.notaFiscal +"</span>"
    })

    document.getElementById("pagina").innerHTML = html;
    */


