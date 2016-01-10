function ProdutosDAO (connection) {
   this._connection = connection;

  //FUNCIONA TB
  //  this.lista = function(callback) {
  //       console.log('AQUIIIII MODA FOCA!!');
  //      this._connection.query('select * from livros', callback);
  //  }
   //
  //  this.salva = function(livro, callback) {
  //      //com o set ? vai inserir o json (chave:valor...)
  //      this._connection.query('insert into livros set ?', livro, callback);
  //  }
}

//funciona com prototype
ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from livros', callback);
}

ProdutosDAO.prototype.salva = function(livro, callback) {
    //com o set ? vai inserir o json (chave:valor...)
    this._connection.query('insert into livros set ?', livro, callback);
}

module.exports = function() {
    return ProdutosDAO;
}

// module.exports = function(xxx) {
// //passando a connection aqui da erro= TypeError: undefined is not a function
//     // console.log('xxx = ', xxx);
//     return function(connection) {
//       this.lista = function(callback) {
//         connection.query('select * from livros', callback);
//       }
//       return this;
//     }
// }
