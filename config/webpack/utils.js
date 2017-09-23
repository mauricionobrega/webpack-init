module.exports = (() => {
  'use strict';

  const fs = require('fs'), dir = require('node-dir');

  const requireRecursive = (folder) => {
    let requires = {};
    fs.readdirSync(folder).forEach((file) => {
      requires = spreadMerge(requires, require(`${folder}/${file}`));
    });
    return requires;
  }

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
    'requireRecursive': requireRecursive,
    'spreadMerge': spreadMerge,
    'listFiles': listFiles
  }

})();