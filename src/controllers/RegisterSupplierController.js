function appendEmail(email, reference){
    var table = document.getElementById("emailTable");
    var newRow = table.insertRow(table.rows.length);
    
    var newEmail = newRow.insertCell(0);
    var newReference = newRow.insertCell(1);
    if(!email || !reference){
        alert('Preencha todos os campos para adicionar novo e-mail!');
    }
    else{
        newEmail.innerHTML = email;
        newReference.innerHTML = reference;
    }
};

function appendTel(ddd, number, reference){
    var table = document.getElementById("telTable");
    var newRow = table.insertRow(table.rows.length);
    
    var newDdd = newRow.insertCell(0);
    var newNumber = newRow.insertCell(1);
    var newReference = newRow.insertCell(2);

    if(!ddd || !number || !reference){
        alert('Preencha todos os campos para adicionar novo telefone!');
    }
    else{
        newDdd.innerHTML = ddd;
        newNumber.innerHTML = number;
        newReference.innerHTML = reference;
    }
};

