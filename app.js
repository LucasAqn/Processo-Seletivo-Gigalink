const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const port = process.env.PORT;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect(err => {
    if(err){    
        console.log('Erro ao conectar ao banco de dados...')
        return err;
    }
    console.log('Conectado ao Banco de Dados!')
});


const sourceDirectory = path.join(__dirname, "src");
const viewsPath = path.join(__dirname, "./src/views/");
app.set('views', viewsPath);
app.set('view engine', 'hbs');

app.use(express.static(sourceDirectory));

app.get("/", (req, res) => {       
    res.render('index')
    
});


app.get("/GenerateRequest", (req, res) => {
    db.query('SELECT id, nome FROM transportadora', (error, results) => {
        if(error){
            console.log(error);
        }
        else {
            return res.render('GenerateRequest',{
            shippingCompanyList : results
        });
        }
    });

});

app.get("/searchProduct",(req,res) => {
    db.query(`SELECT id FROM produto WHERE nome = ?`,[req.query.productName])
    if(error){
        console.log(error);
        }
        else{
            return results
        }
});

app.post("/addRequest", (req, res)=>{
    
            db.query(`INSERT INTO pedido (id_transportadora, datahora, notaFiscal, valorFrete, desconto, valorTotal) VALUES ('${req.body.shippingCompanyId}', CURRENT_TIMESTAMP(),'${req.body.requestInvoice}','${req.body.requestShippingFee}','${req.body.requestDiscount}','${req.body.requestAmount}')`, (error, results) => {
                if(error){
                console.log(error);
                }
                else{
                    db.query('SELECT id FROM pedido WHERE notaFiscal = ?',[req.body.requestInvoice], (error, results) => {
                        if(error){
                            console.log(error);
                        }
                        else{
                            
                            let requestId = results;
                            let productList = req.body.productTable;
                                
                            for( i = 0 ; i <= productList.rows.length;i++){
                                db.query(`INSERT INTO item (id_produto, id_pedido, quantidade, valor) VALUES ('${req.body.productList.rows[i].cells[0]}','${req.body.requestId}','${req.body.productList.rows[i].cells[2]}','${req.body.productList.rows[i].cells[3]}')`, (error, results) => {
                                    if(error){
                                    console.log(error);
                                    }
                                    else{
                                        console.log('Novo item Salvo com sucesso!');
                                        
                                    }
                                });
                            }
                            return res.render('GenerateRequest', {
                                feedback : 'Produto Cadastrado com sucesso!'
                            });
                        }
                    });
                }
            });

});

app.get('/VisualizeRequests', (req,res) =>{
    let requestDetails = req.query.requestDetails; 
    db.query('SELECT id, datahora, notaFiscal, valorTotal FROM pedido ORDER BY datahora DESC', (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            return res.render('VisualizeRequests', {
                requestsList: results,
                requestDetails: requestDetails
                });
        }
    })
});

app.get('/requestDetails', (req,res) =>{
    let requestDetails = "";

    db.query('SELECT pedido.id, pedido.datahora, pedido.notaFiscal, transportadora.nome, pedido.valorFrete, pedido.desconto, pedido.valorTotal  FROM pedido INNER JOIN transportadora ON pedido.id_transportadora = transportadora.id WHERE pedido.id = ?',[req.query.Id], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
           requestDetails = results;
           
        }
    })

    db.query('SELECT produto.nome, item.quantidade, item.valor FROM produto INNER JOIN item ON produto.id = item.id_produto INNER JOIN pedido ON item.id_pedido = pedido.id WHERE item.id_pedido= ?',[req.query.Id], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            return res.json({
                productsList: results,
                requestDetails
                
                });
        }
    })
}); 

app.get('/RegisterProduct',(req, res) =>{

    db.query('SELECT id, nome FROM fornecedor', (error, results) => {
        if(error){
        console.log(error);
        }
        else{
            return res.render('RegisterProduct', {
                suppliersList: results
            });
        }
        
    })
}); 

app.post('/addProduct',(req, res) =>{

    db.query(`INSERT INTO produto (id_fornecedor, nome, descricao) VALUES ('${req.body.SupplierID}','${req.body.ProductName}','${req.body.ProductDescription}')`, (error, results) => {
        if(error){
        console.log(error);
        }
        else{
            return res.render('RegisterProduct', {
                feedback: 'Produto Cadastrado com sucesso!'
            });
        }
        
    })
}); 

app.get('/RegisterSupplier',(req, res) =>{
    res.render('RegisterSupplier')
});

  
app.post('/addSupplier',(req, res) =>{

    db.query('SELECT id FROM fornecedor WHERE nome = ?',[req.body.supplierName], (error, results) => {
        if(error){
            console.log(error);
        }
        if(!results.length == 0){
            console.log('Fornecedor já cadastrado!')
            return res.render('RegisterSupplier', {
                feedback: 'Este Fornecedor já está cadastrado no Banco de Dados...'
            });
        }
        else {
            db.query(`INSERT INTO fornecedor (nome, descricao, cidade, endereco, bairro, numero) VALUES ('${req.body.supplierName}','${req.body.supplierDescription}','${req.body.supplierCity}','${req.body.supplierAddress}','${req.body.supplierNeighborhood}','${req.body.supplierNumber}')`, (error, results) => {
                if(error){
                console.log(error);
                }

            });  
        }
    });    
});

app.post('/addSupplierInfo',(req, res) =>{
console.log(req);
console.log("LISTA DE TELEFONES:" + req.body.telList);
    db.query('SELECT id FROM fornecedor WHERE nome = ?',[req.body.supplierName], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            
            let idSupplier = results;
            let emailListLength = req.body.emailList.length;
            let telListLength = req.body.telList.length;
                
            for( i = 0 ; i < emailListLength ;i++){
                db.query(`INSERT INTO email (id_fornecedor, email, referencia) VALUES ('${idSupplier}','${req.body.emailList[i][0]}','${req.body.emailList[i][1]}')`, (error, results) => {
                    if(error){
                    console.log(error);
                    }
                    else{
                        console.log('Novo Email Salvo com sucesso!');
                        
                    }
                });
            }

            for(i = 0; i < telListLength; i++){
                db.query(`INSERT INTO telefone (id_fornecedor, ddd, numero, referencia) VALUES ('${idSupplier}','${req.body.telList[i][0]}','${req.body.telList[i][1]}','${req.body.telList[i][2]}')`, (error, results) => {
                    if(error){
                    console.log(error);
                    }
                    else{
                        console.log('Novo Telefone Salvo com sucesso!')
                            
                    }
                });  
            }
            
            return res.json({
            feedback: 'Fornecedor cadastrado com sucesso!'                                    
            });
        }
    }); 

});

app.get('/RegisterShippingCompany',(req, res) =>{
    res.render('RegisterShippingCompany')
     
}); 

app.post('/addShippingCompany',(req, res) =>{

    db.query(`INSERT INTO transportadora (nome) VALUES ('${req.body.ShippingCompanyName}')`, (error, results) => {
        if(error){
        console.log(error);
        }
        else{
            return res.render('RegisterShippingCompany', {
                feedback: 'Transportadora Cadastrada com sucesso!'
            });
        }
        
    })
}); 

app.listen(port, () => console.log(`Aplicação em Execução na porta ${port}`));