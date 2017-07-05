wm.product = (function() {
  "use strict";

  function log() {
    console.log('wm.product.log');
    return this;
  }

  return {
    init: init
  }

})().init();
