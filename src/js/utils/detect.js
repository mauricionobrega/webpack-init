wm.logger = (function(win) {
  "use strict";

  // check_webp_feature:
  //   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
  //   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
  // https://developers.google.com/speed/webp/faq#which_web_browsers_natively_support_webp
  function webp(feature, callback) {
    var kTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    }, img = new Image();
    img.onload = function () {
      var result = (img.width > 0) && (img.height > 0);
      callback(feature, result);
    };
    img.onerror = function () {
      callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  }

  return {
    webp: debug
  }

})(window);


