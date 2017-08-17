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
    let merged = {
      files: []
    }
    for (const i in args) {
      const target = args[i];
      let a;
      if (Array.isArray(target)) {
        a = target.length;
        while (a--) {
          const file = target[a];
          if (merged.files.indexOf(file) < 0) {
            merged.files.push(file);
          }
        }
      } else {
        Object.assign(merged, args[i]);
      }
    }
    return merged;
  }

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
    'spreadMerge': spreadMerge,
    'listFiles': listFiles
  }

})();