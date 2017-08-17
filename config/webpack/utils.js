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

  const spreadMerge = (...args) => {
    return Object.assign({}, ...args);
  }

  const listFiles = (path, filter) => {
    const all = dir.files(path, {sync:true});
    let finalFiles, i;

    if (filter) {
      finalFiles = all.filter((file) => {
        return filter.test(file);
      });
    } else {
      finalFiles = all;
    }

    i = finalFiles.length;
    while (i--) {
      finalFiles[i] = './' + finalFiles[i];
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
    'spreadMerge': spreadMerge,
    'listFiles': listFiles
  }

})();