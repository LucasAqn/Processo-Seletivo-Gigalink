function appendEmail(email, reference){
    var table = document.getElementById("emailTable");
    var newRow = table.insertRow(table.rows.length);
    
    if(!email || !reference){
        alert('Preencha todos os campos para adicionar novo e-mail!');
    }
    else{
        var newEmail = newRow.insertCell(0);
        var newReference = newRow.insertCell(1);

        newEmail.innerHTML = email;
        newReference.innerHTML = reference;
    }
};

function appendTel(ddd, number, reference){
    var table = document.getElementById("telTable");
    var newRow = table.insertRow(table.rows.length);

    if(!ddd || !number || !reference){
        alert('Preencha todos os campos para adicionar novo telefone!');
    }
    else{
        var newDdd = newRow.insertCell(0);
        var newNumber = newRow.insertCell(1);
        var newReference = newRow.insertCell(2);
        
        newDdd.innerHTML = ddd;
        newNumber.innerHTML = number;
        newReference.innerHTML = reference;
    }
};

function createEmailList(emailList,table){
    
    for(i = 0; i < (table.rows.length-1); i++){
        emailList[i] = new Array(2);    
        emailList[i][0] = (table.rows[i+1].cells[0].innerText);
        emailList[i][1] = (table.rows[i+1].cells[1].innerText);
        
    }
    console.log(emailList);
}

function createTelList(telList,table){
     
    for(i = 0; i < (table.rows.length-1); i++){
        telList[i] = new Array(3);    
        telList[i][0] = (table.rows[i+1].cells[0].innerText);
        telList[i][1] = (table.rows[i+1].cells[1].innerText);
        telList[i][2] = (table.rows[i+1].cells[2].innerText);
        
    }
    console.log(telList)
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

function sendSupplierInfo(){
    //e.preventDefault();
    let supplierName = document.getElementById("supplierName").value;
    
    telTable = document.getElementById("telTable");
    telList = new Array((telTable.rows.length-1));
    createTelList(telList,telTable);
    
    let emailTable = document.getElementById("emailTable");
    emailList = new Array((emailTable.rows.length-1));
    createEmailList(emailList,emailTable);
    
    console.log(telList);
    console.log(emailList);
    

    body = {
        "supplierName": supplierName,
        "emailList": emailList,
        "telList": telList
    }
    console.log(body);

    //let response = JSON.parse(doPOST("http://127.0.0.1:3000/addSupplierInfo", body));
    //let feedback = response["feedback"];
    //console.log(feedback);
}
