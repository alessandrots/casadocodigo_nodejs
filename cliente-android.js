var http= require('http');
//executar no path do arquivo: node cliente-android.js
var configuracoes = {
  host:'localhost',
  port: 3000,
  path:'/produtos2',
  headers:{
    //isto eh o content negotiation
    'Accept':'application/json'//o navegador prefere um html normalmente
    // 'Accept':'text/html'//o navegador prefere um html normalmente
  }
};

http.get(configuracoes, function(res){
  console.log(res.statusCode);
  //quando os dados da requisicao tiver pronto, chame uma outra funcao
  res.on('data', function(body){
    //com a string antes voltou o html, sem volta o binario
    console.log('corpo = '+ body);
  })
});
