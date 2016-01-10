var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/**
macAle:casadocodigo alessandrots$ heroku apps:create  cdc-alessandro-nodejs1
Creating cdc-alessandro-nodejs1... done, stack is cedar-14
https://cdc-alessandro-nodejs1.herokuapp.com/ | https://git.heroku.com/cdc-alessandro-nodejs1.git


*/


module.exports = function() {
  console.log('express no .GIT ... ');
  var app = express();
// middleware definido para a parte estatica
  app.use(express.static('./app/public'));//ponto relativo a casa do casadocodigo
  app.set('view engine', 'ejs');
  app.set('views', './app/views');//a partir do arquivo app.js que eh o root

  // console.log('express = ', app);

/**
 entendimento do use:
 requisicao para express -> function -> function -> function -> funcoes NOSSAS colocadas no use ->rota

  como exemplo so ver a funcao expressValidator ele retorna uma funcao que eh a assinatura do express.
  e la dentro dessa funcao, ele carrega varias coisas.
*/

  //funcoes de middleware - usar antes de carregar o express abaixo
  //middlewareBodyParsers (encapsula o post dos dados enviados via submit)
  //extended eh a propriedade do urlencoded para que o bodyParser consiga entender formularios complexos
  app.use(bodyParser.urlencoded({extended:true}));
  //mais um middleware para aceitar json
  app.use(bodyParser.json());
  //mais um middleware para aceitar express-validator
  app.use(expressValidator());



/*
 Tudo que tiver dentro da pasta routes vai ser carregado automtaticamente, entao a linha q
tinha no app.js:
  var rotasProdutos = require('./app/routes/produtos')(app); => pode ser retirada

then (..) ==> depois q carrega as rotas, carrega tudo q ta pasta infra, isto tudo
esta sendo carregado dentro do objet app (express)

o cwd:'app' => //faz um scan nas pastas dentro do app, o valor app indica a pasta a partir do qual
ele deve procurar as demais pasta para serem carregadas
*/
  load('routes', {cwd:'app'})
       .then('infra')
       .into(app);

   //fazendo o nosso middleware, tratando uma rota não encontrada.
   app.use (function(req, resp, next){
     resp.status(404).render('erros/404');
     next();
   });

/**
  se tiver um erro, entao o express vai procurar um middleware com 4 argumentos
  esse quarto argumento vai ser o erro que vai ser manipulado.
  Q eh o primeiro paramentro no caso abaixo
*/
   app.use (function(error, req, resp, next){
     if (process.env.NODE_ENV == 'production') {
       resp.status(500).render('erros/500');
       //entao so vai mostrar a pagina de erro se tiver em production.. de
       //outra forma vai chamar a proxima funcao mostrando o erro

// para ver funcionando como se estivesse em producao.
       // NODE_ENV=production ./node_modules/.bin/nodemon app
       return;
     }

     next(error);
   });
  return app;
}
