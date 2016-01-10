function require(path){
    var codigoDoSeuModulo = carregado(path);
    var funcaoDeCarregamento = function(){
      //eval => vc passa o texto e ele consegue executar como js
      eval(codigoDoSeuModulo);
    }
    var module = {
      exports: {};
    }

    funcaoDeCarregamento(module, module.exports);
    return;
}
