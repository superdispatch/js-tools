'use strict';

const path = require('path');

function isIndexFile(filename) {
  return /^index\.(tsx?|jsx?)$/.test(filename);
}

module.exports = {
  meta: {
    scheme: [],
    type: 'suggestion',
  },

  create(context) {
    const filename = path.basename(context.getFilename());

    return {
      Program(node) {
        if (isIndexFile(filename)) {
          context.report({
            node,
            message:
              "Avoid usage of index file names for features each file should be described by it's name.",
          });
        }
      },
    };
  },
};
