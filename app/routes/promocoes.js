module.exports = function(app){
  app.get("/promocoes/form", function(req, resp) {
    var connection = app.infra.connectionFactory();
    // console.log('connection = ', app.infra.connectionFactory);
   //  console.log('connection = ', app.infra.ProdutosDAO);
    var produtosBanco = new app.infra.ProdutosDAO(connection);
    produtosBanco.lista(function(err, results) {
        // resp.render('produtos/lista.ejs', {lista:results});
        /*
          Tive q comentar o tratamento de erro abaixo para q o middleware colocado
          no arquivo config/express possa ser respondido, pq com esse erro aqui abaixo
          na hora q der refresh o servidor nodemon nao carrega.
        */
        // if (err){
        //    //esse parametro next eh um recurso do express que indica q o mesmo
        //    //deve executar a proxima funcao da cadeia de funcoes q ele tem pra executar
        //    return next(err);
        // }
        resp.format({
            html:function(){
              console.log('promocoes form html');
              resp.render('promocoes/form.ejs', {lista:results});
            },
            json:function(){
              console.log('retornando json');
              resp.json(results);
            }
        });
    });
    connection.end();
   });

   app.post("/promocoes", function(req, resp) {
       var connection = app.infra.connectionFactory();
       var promocao = req.body;
       console.log('promocao = ', promocao);
       app.get('io').emit('novaPromocao', promocao);
       resp.redirect('promocoes/form');
       connection.end();
    });
}
