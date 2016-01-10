// produtoController
//    lista JSON
//    cadastro aceita JSON
//    cadastro aceita urlencoded
//tem que criar a pasta test e na raiz do projeto roda o comando: ./node_modules/.bin/mocha
// var http = require('http');
// var assert = require('assert');

//retorna uma funcao q precisa invocar para carregar o objeto especifico para fazer o trabalho
//uma hora retorna o objeto pronto outra hora a funcao que tem que ser invocada

//tem que passar uma referencia do servidor(usando as libs do node)  ou do express
//ai nesse caso o servidor (nodemon)nao precisa estar no ar, pq o q vai ser testado
//sao as rotas do express, simulando toda uma requisicao http, sem que o servidor
//esteja em pe, e a referencia do express vai conseguir suprir isso
var express = require ('../config/express')();//retorna uma funcao entao tem q invocar
var request = require('supertest')(express);


describe('ProdutoControllerTest', function() {
  //ver modulo node-database-cleaner para limpeza do banco

  beforeEach(function(done){
     var conn = express.infra.connectionFactory();
     conn.query("delete from livros", function(exception, result) {
        if (!exception) {
          done();
        }
     });
  });

  it('listagem json', function(done) {
    // var configuracoes = {
    //   host:'localhost',
    //   port: 3000,
    //   path:'/produtos',
    //   headers:{
    //     //isto eh o content negotiation
    //     'Accept':'application/json'
    //   }
    // };

    // http.get(configuracoes, function(res){
    //   assert.equal(res.statusCode,200);
    //   assert.equal(res.headers['content-type'],'application/json; charset=utf-8');
    //   // if (res.statusCode == 200) {
    //   //   console.log("Status OK");
    //   // }
    //   // // console.log(res.headers['content-type']);
    //   // // if (res.headers['content-type'] == 'text/html; charset=utf-8'){
    //   // if (res.headers['content-type'] == 'application/json; charset=utf-8'){
    //   //   console.log("Content-Type OK");
    //   // }
    //   done();
    // });

//Fazendo um refactory do teste usando o module supertest
    request.get('/produtos')//neste caso so passa a rota nao precisa da url completa//'http://localhost:3000/produtos')
    .set('Accept', 'application/json')//a gente configurou json para resposta, que volte um json
    .expect('Content-Type', /json/)//o q vc espera q aconteca, neste caso aqui q volte um json as barras sao expressao regular
    .expect(200, done); //so o argumento e o status de retorno
    //o done eh a funcao de finalizacao

    //  console.log("teste de verificacao de listagem json");
  });

  it('#cadastro aceita html', function(done) {
    request.get('/produtos')//neste caso so passa a rota nao precisa da url completa//'http://localhost:3000/produtos')
    .set('Accept', 'text/html')//a gente configurou json para resposta, que volte um json
    .expect('Content-Type', /html/)//o q vc espera q aconteca, neste caso aqui q volte um json as barras sao expressao regular
    .expect(200, done); //so o argumento e o status de retorno
  });

  it('#cadastro de novo produto com dados invalidos', function(done) {
    request.post('/produtos')
    .send({"titulo":"","descricao":"livro introdutório sobre NODE JS"})
    .expect(400, done); //so o argumento e o status de retorno
  });

  it('#cadastro de novo produto com dados VALIDOS', function(done) {
    request.post('/produtos')
    .send({"titulo":"Comecando com nodejs","descricao":"livro introdutório sobre nodejs","preco":39.9})
    .expect(302, done); //302 pq na rota esta fazendo um redirect
  });



  //
  // it('#cadastro aceita urlencoded', function() {
  //
  // });
});
