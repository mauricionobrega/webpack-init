wm.header = (function() {
  "use strict";

  function log() {
    console.log('wm.header.log');
    return this;
  }

  return {
    init: init
  }

})().init();
