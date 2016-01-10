//var connFactory = require('../infra/connectionFactory');

module.exports = function(app) {
//   var listaProdutos = function(req, resp) {
//       console.log('Estamos carregando a lista dos produtos.');
//       // var mysql = require('mysql');
//       // var connection = mysql.createConnection({
//       //   host:'localhost',
//       //   user:'root',
//       //   password:'',
//       //   database:'casadocodigo_nodejs'
//       // });
//      //esta sendo carregado na variavel app (express) no arquivo express.js
//     var connection = app.infra.connectionFactory();//connFactory();
//
// // assim eh uma variavel do express-load
//     // var produtosBanco = app.infra.produtosBanco(connection);
// // com o new eh criado um novo contexto trazendo so objeto lista
//     var produtosBanco = new app.infra.ProdutosDAO(connection);
//     // console.log('produtosBanco = ', produtosBanco);
//
//     produtosBanco.lista(function(err, results) {
//        //  resp.send(results);
//        resp.render('produtos/lista.ejs', {lista:results});
//     });
//
//     //  connection.query('select * from livros', function(err, results) {
//     //     //  resp.send(results);
//     //     resp.render('produtos/lista.ejs', {lista:results});
//     //  });
//
//       connection.end();
//       //resp.render('produtos/lista.ejs');
//   };
//
//   app.get('/produtos',listaProdutos);

  app.get('/produtos', function(req, resp, next) {
        console.log('Estamos carregando a lista dos produtos. a mesma coisa da de cima. KIDDDDDDDD');
        var connection = app.infra.connectionFactory();
        // console.log('connection = ', app.infra.connectionFactory);
        // console.log('connection = ', app.infra.ProdutosDAO);
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(err, results) {
            // resp.render('produtos/lista.ejs', {lista:results});
            if (err){
               //esse parametro next eh um recurso do express que indica q o mesmo
               //deve executar a proxima funcao da cadeia de funcoes q ele tem pra executar
               return next(err);
            }
            resp.format({
                html:function(){
                  console.log('retornando html');
                  resp.render('produtos/lista.ejs', {lista:results});
                },
                json:function(){
                  console.log('retornando json');
                  resp.json(results);
                }
            });
        });
        connection.end();
    });

  app.get('/produtos2', function(req, resp) {
        console.log('Estamos carregando a lista dos produtos. a mesma coisa da de cima KIDDD.');
        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(err, results) {
            // resp.render('produtos/lista.ejs', {lista:results});
            resp.format({
                html:function(){
                  resp.render('produtos/lista.ejs', {lista:results});
                },
                json:function(){
                  resp.json(results);
                }
            });
        });
        connection.end();
    });

//uma forma de mostrar o json, mas tem duplicacao de codigo
  app.get('/produtos/json', function(req, resp) {
      console.log('Estamos carregando a lista dos produtos.');
    var connection = app.infra.connectionFactory();//connFactory();

    var produtosBanco = new app.infra.ProdutosDAO(connection);

    produtosBanco.lista(function(err, results) {
       resp.json(results);
    });
      connection.end();
  });

  app.get('/produtos/detalhe', function(req, resp) {
      var connection = app.infra.connectionFactory();
      var produtosBanco = app.infra.produtosBanco(connection);
      var produto = produtosBanco.carrega(id, callback);
      if (produto){
         produtosBanco.remove(produto, callback);
      }
  });

  app.get('/produtos/form', function(req, resp) {
    //  console.log('FORM');
     resp.render('produtos/form.ejs', {errosValidacao: {}, produto:{}});
  });

  // app.post('/produtos/salva', function(req, resp) {
  app.post('/produtos', function(req, resp) {
     var produto = req.body;
    console.log('SALVA -> PRODUTO = ', produto);

    //express-validator
    // var validatorTitulo = req.assert('titulo', 'Titulo obrigatorio');
    // validatorTitulo.notEmpty();//nao pode ser vazio
    req.assert('titulo', 'Titulo obrigatorio').notEmpty();
    req.assert('preco', 'Formato invalido').isFloat();

    var errors = req.validationErrors();
    if (errors){
      resp.format({
          html:function(){
            resp.status(400).render('produtos/form', {errosValidacao:errors, produto:produto});
          },
          json:function(){
            resp.status(400).json(errors);
          }
      });

      return;
    }

     var connection = app.infra.connectionFactory();//connFactory();
     var produtosDAO = new app.infra.ProdutosDAO(connection);

     produtosDAO.salva(produto, function(erros, resultados) {
          // resp.render('produtos/lista', {lista:resultados});
          //chama a lista de produtos na variavel criada acima
          //aqui o problema eh que a url de salva fica exposta, tipo se der F5 vai atualizar
          // listaProdutos(req,resp);
        //  console.log('SALVA -> erros = ', erros);
         resp.redirect('/produtos');
     })
  });

}
