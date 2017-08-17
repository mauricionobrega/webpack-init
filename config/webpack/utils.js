module.exports = (() => {
  'use strict';

  const dir = require('node-dir');

  const merge = (a, b) => {
    const merged = {}
    for (const i in a) {
      merged[i] = a[i].concat(b[i] || []);
    }
    return merged;
  };

  const listFiles = (path, filter) => {
    const all = dir.files(path, {sync:true});
    let finalFiles;

    if (filter) {
      finalFiles = all.filter((file) => {
        return filter.test(file);
      });
    } else {
      finalFiles = all;
    }

    return finalFiles;
  };

  /**
   * PUBLIC METHODS
   *
   * @public
   */
  return {
    'merge': merge,
    'listFiles': listFiles
  }

})();