const express = require('express')
const app = express();
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.post('/RegisterShippingCompany',(req, res) =>{

    db.query(`INSERT INTO transportadora (nome) VALUES ('${req.body.nomeTransportadora}')`, (error, results) => {
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

app.post('/VisualizeRequests', (req,res) =>{
    db.query('SELECT * FROM pedido', (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            return res.render('VisualizeRequests', {
                feedback: 'lista de pedidos'
                });
        }
    })
});

app.get('/VisualizeRequests/RequestDetails', (req,res) =>{
    //consultar nome da trasnsportadora associada
    db.query('SELECT nome FROM transportadora WHERE id = ?', ['id_transportadora'], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
           let RegisterShippingCompanyName = results;
        }
    })

    //consultar lista de produtos do pedido
    db.query('SELECT nome FROM produto INNER JOIN item ON produto.id = item.id_produto WHERE id_pedido= ?', ['id_pedido'], (error, results) => {
        if(error){
            console.log(error);
        }
        else{
           //retornar todos os dados consultados
        }
    })
}); 

app.post('/RegisterSupplier',(req, res) =>{

    db.query('SELECT id FROM fornecedor WHERE nome = ?',[req.body.SupplierName], (error, results) => {
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
            db.query(`INSERT INTO fornecedor (nome, descricao, cidade, endereco, bairro, numero) VALUES ('${req.body.nomeFornecedor}','${req.body.descricao}',${req.body.cidade},'${req.body.endereco}','${req.body.bairro}',${req.body.numero})`)`)`, (error, results) => {
                if(error){
                console.log(error);
                }
                else{
                    db.query('SELECT id FROM fornecedor WHERE nome = ?',[req.body.SupplierName], (error, results) => {
                        if(error){
                            console.log(error);
                        }
                        else{
                            let idSupplier = results;

                            //percorrer lista de telefones
                                db.query(`INSERT INTO telefone (id_fornecedor, ddd, numerom referencia) VALUES ('${idSupplier}','${req.body.telList.ddd}','${req.body.telList.numero}',${req.body.telList.referencia})`)`)`, (error, results) => {
                                    if(error){
                                    console.log(error);
                                    }
                                    else{
                                        //se a lista de e-mails tiver pelo menos um elemento
                                        //percorrer lista de emails
                                        db.query(`INSERT INTO email (id_fornecedor, email, referencia) VALUES ('${idSupplier}','${req.body.emailList.email}','${req.body.emailList.referencia}')`)`)`, (error, results) => {
                                            if(error){
                                            console.log(error);
                                            }
                                            else{
                                                return res.render('RegisterSupplier', {
                                                feedback: 'Fornecedor cadastrado com sucesso!'
                                                });
                                            }
                                        }
                                    }
                                }                                      
                        }

                    });
                    
                }
            }   
        }


    })    
       
});

app.listen(port, () => console.log(`Aplicação em Execução na porta ${port}`));