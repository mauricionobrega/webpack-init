wm.home = (function() {
  "use strict";

  function log() {
    console.log('wm.home.log');
    return this;
  }

  return {
    init: init
  }

})().init();
