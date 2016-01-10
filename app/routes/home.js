module.exports = function (app){
   app.get("/", function(req, resp) {
     var connection = app.infra.connectionFactory();
     // console.log('connection = ', app.infra.connectionFactory);
    //  console.log('connection = ', app.infra.ProdutosDAO);
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
               console.log('index html');
               resp.render('home/index.ejs', {livros:results});
             },
             json:function(){
               console.log('retornando json');
               resp.json(results);
             }
         });
     });
     connection.end();
   })
}
