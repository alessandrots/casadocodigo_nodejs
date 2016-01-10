var mysql = require('mysql');

// module.exports = function() {
//   return mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'casadocodigo_nodejs'
//   });
// }

//http://www.sitepoint.com/understanding-module-exports-exports-node-js/
//aqui o arquivo que retorna no module.exports eh um objeto e por isso
//que ele tem que ser instanciado var x = carraca()
/*
var greetings = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }
};

var greetings = require("./greetings.js");
*/
var createDBConnection = function() {
  console.log('agora realmente estou me conectando ao banco XXXX.');
  //variavel de ambiente definido no application.js do node (development eh o padrao), vc pode
  //definir ela production
  if (!process.env.NODE_ENV) {//se nao foi definida em lugar nenhum entao eh development
    return mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'casadocodigo_nodejs'
    });
  }

//chamando via linha de comando NODE_ENV=test ./node_modules/.bin/mocha
//estamos fazendo isso para nao sujar o ambiente e ficar persistindo o ambiente errado.
//a criacao deste banco de teste esta abaixo
  if (process.env.NODE_ENV == 'test') {//se nao foi definida em lugar nenhum entao eh development
    return mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'casadocodigo_nodejs_test'
    });
  }

}

//wrapper
module.exports = function() {
  console.log('so retornando o envelope');
  return createDBConnection;//so retorna a funcao nao a esta executando tem q ter ()
}

/*
mysql -u root

create database casadocodigo_nodejs_test;

use casadocodigo_nodejs_test

create table livros (
id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
titulo varchar(255) DEFAULT NULL,
descricao text,
preco decimal(10,2) DEFAULT NULL
);

*/
