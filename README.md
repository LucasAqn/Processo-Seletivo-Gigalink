# Processo-Seletivo-Gigalink
Criação de um sistema Web para gerenciamento de compra e venda de produtos.
______________________________________________________________________________
#Passo a passo para Iniciar o Sistema:
- Inicie o Servidor MYSQL e importe o Banco de Dados presente neste repositório;
- Instale os módulos utilizados no projeto por meio do comando "npm install";
- Inicie o Back-end por meio do comando "npm start";
- Acesse a página inicial no endereço localhost com a porta de acordo com o que foi definido no arquivo .env (neste caso, porta 3000);
- Pronto!  

#Descrição:
  Esta aplicação visa simular um ambiente de vendas semelhante ao que se é visto em um mercado padrão; a ação de gerar uma "nota de compra", isto é, criar um Pedido que deverá conter as informações de produtos, valores, dentre outras, foi considerada como ponto principal, pois, através deste, um dado estabelecimento poderia ter total controle do seu histórico de vendas. 
  A fim de sustentar a funcionalidade principal do sistema, também foram implementadas formas de armazenar os produtos que serão vendidos, seus respectivos fornecedores e as transportadoras responsáveis pelo envio.

#Funcionalidades Implementadas no Sistema:
  - Gerar Novo Pedido
    -> Um pedido, basicamente, contém uma tabela com os produtos e seus respectivos preços e quantidades da venda, o valor do frete e a transportadora associada, um valor de desconto e uma nota fiscal. Os produtos são inseridos na tabela de um pedido por meio de seu nome, simulando a ação de uma máquina leitora de código de barras, por conta disso, vale salientar a importância de verificar que um produto será adicionado a um pedido caso esteja cadastrado no banco de dados. 
    
  - Visualizar Pedidos
    -> Permite avaliar a partir de elementos chave todos os pedidos já realizados na ordem que foram gerados, do mais novo para o mais antigo. Caso seja necessário avaliar mais informações sobre um dado pedido, basta acionar o botão "detalhes" e serão buscadas todas as demais correspondentes.
    
  - Registrar Novo Produto
    ->Possibilita cadastrar um novo produto no sistema que deverá ter um fornecedor correspodente.
    
  - Registrar Novo Fornecedor
    ->Possibilita cadastrar um fornecedor no sistema, que deverá ter, obrigatoriamente, um contato de telefone. De forma arbitrária, também podem ser adicionados endereços de e-mails para o fornecedor em questão. 
    
  - Registrar Nova Transportadora
    ->Possibilita cadastrar uma nova transportadora no sistema.

Tecnologias Utilizadas:
->Front-End
  -HTML
  -CSS
  
->Back-End
  -NODEJS
  
->Banco de Dados
  -MYSQL
