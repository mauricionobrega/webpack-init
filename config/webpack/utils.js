module.exports = (() => {
  'use strict';

  const merge = (a, b) => {
    const merged = {}
    for (const i in a) {
      merged[i] = a[i].concat(b[i] || []);
    }
    return merged;
  };

  /**
   * PUBLIC METHODS
   *
   * @public
   */
  return {
    'merge': merge
  }

})();