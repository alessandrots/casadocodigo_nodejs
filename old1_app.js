var express = require('express');

var app = express();
app.set('view engine', 'ejs');

app.get('/produtos', function(req, resp) {
    // resp.send('<html><body><h1>Listando os produtos da loja!</h1></body></html>');
    console.log('Estamos carregando a pagina.');
    resp.render('produtos/lista.ejs');
});

// app.get('/', function(req, resp) {
//     resp.send('<html><body><h1>HOME</h1></body></html>');
// })

app.listen(3000, function() {
   console.log('Servidor rodando');
});
