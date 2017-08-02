wm.logger = (function(win) {
  "use strict";

  // Cria um novo objeto que herda o construtor de Error através do prototype.
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error
  function MeuErro(message) {
    this.name = 'MeuErro';
    this.message = message || 'Mensagem de erro padrão';
    this.stack = (new Error()).stack;
  }
  MeuErro.prototype = Object.create(MeuErro.prototype);
  MeuErro.prototype.constructor = MeuErro;

  function debug() {
    try {
      throw new MeuErro();
    } catch (e) {
      console.log(e.name);     // 'MeuErro'
      console.log(e.message);  // 'Mensagem de erro padrão'
    }

    try {
      throw new MeuErro('Mensagem customizada');
    } catch (e) {
      console.log(e.name);     // 'MeuErro'
      console.log(e.message);  // 'Mensagem customizada'
    }
  }

  return {
    debug: debug
  }

})(window);