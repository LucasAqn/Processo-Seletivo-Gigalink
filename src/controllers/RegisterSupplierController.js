function appendEmail(email, reference){
    var table = document.getElementById("emailTable");
    
    if(!email || !reference){
        alert('Preencha todos os campos para adicionar novo e-mail!');
    }
    else{
        var newRow = table.insertRow(table.rows.length);
        var newEmail = newRow.insertCell(0);
        var newReference = newRow.insertCell(1);

        newEmail.innerHTML = email;
        newReference.innerHTML = reference;
    }
};

function appendTel(ddd, number, reference){
    var table = document.getElementById("telTable");
    
    if(!ddd || !number || !reference){
        alert('Preencha todos os campos para adicionar novo telefone!');
    }
    else{
        var newRow = table.insertRow(table.rows.length);
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
}

function createTelList(telList,table){
     
    for(i = 0; i < (table.rows.length-1); i++){
        telList[i] = new Array(3);    
        telList[i][0] = (table.rows[i+1].cells[0].innerText);
        telList[i][1] = (table.rows[i+1].cells[1].innerText);
        telList[i][2] = (table.rows[i+1].cells[2].innerText);
        
    }
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

function sendSupplierInfo(){
    //e.preventDefault();
    telTable = document.getElementById("telTable");
    let supplierName = document.getElementById("supplierName").value;
    if(supplierName == ''){
        alert("Informe o nome do Fornecedor...");
    }
    else
        if(telTable.rows.length <= 1){
            alert("Informe ao menos um contato de telefone para o Fornecedor...");
        }
        else{
            let supplierDescription = document.getElementById("supplierDescription").value;
            let supplierCity = document.getElementById("supplierCity").value;
            let supplierAddress = document.getElementById("supplierAddress").value;
            let supplierNeighborhood = document.getElementById("supplierNeighborhood").value;
            let supplierNumber = document.getElementById("supplierNumber").value;

            
            telList = new Array((telTable.rows.length-1));
            createTelList(telList,telTable);

            let emailTable = document.getElementById("emailTable");
            emailList = new Array((emailTable.rows.length-1));
            createEmailList(emailList,emailTable);

            body = {
                "supplierName": supplierName,
                "supplierDescription": supplierDescription,
                "supplierCity": supplierCity,
                "supplierAddress": supplierAddress,
                "supplierNeighborhood": supplierNeighborhood,
                "supplierNumber": supplierNumber,
                "emailList": emailList,
                "telList": telList
            }
            doPOST("http://127.0.0.1:3000/addSupplier", body);
        }
}
