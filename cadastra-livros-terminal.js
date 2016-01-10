var http= require('http');
//executar no path do arquivo: node cadastra-livros-terminal.js
var configuracoes = {
  host:'localhost',
  port: 3000,
  path:'/produtos',
  method:'POST',
  headers:{
    //isto eh o content negotiation
    'Accept':'application/json',//o navegador prefere um html normalmente, para ser aceito pelo cliente
    'Content-Type':'application/json'//para enviar o dado como json
    // 'Accept':'text/html'//o navegador prefere um html normalmente
  }
};

var cliente = http.request(configuracoes, function(res){
  console.log(res.statusCode);
  //quando os dados da requisicao tiver pronto, chame uma outra funcao
  res.on('data', function(body){
    //com a string antes voltou o html, sem volta o binario
    console.log('corpo = '+ body);
  })
});
var produto = {"titulo":"","descricao":"NODE JS HTTP","preco":100.90};
//dispara a requisicao
cliente.end(JSON.stringify(produto));
