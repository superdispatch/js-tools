'use strict';

const path = require('path');
const _ = require('lodash');

const ASSETS_FILE_REGEXP = /(.*?)\.(svg|png|jpg|css|sass|scss)$/;

function fileToKebabCase(filename) {
  return filename.replace(
    ASSETS_FILE_REGEXP,
    (match, name, ext) => `${_.kebabCase(name)}.${ext}`,
  );
}

function process(file, node, context) {
  const filename = path.basename(file);
  const kebabCasedFilename = fileToKebabCase(filename);

  if (
    // Check for relative files. Lint only local files and ignore third party modules.
    /\.\.?\//.test(file) &&
    ASSETS_FILE_REGEXP.test(filename) &&
    kebabCasedFilename !== filename
  ) {
    context.report({
      node,
      message:
        'Asset files name must be in kebab-case. Please rename "{{ invalid }}" to "{{ valid }}"',
      data: {
        invalid: filename,
        valid: kebabCasedFilename,
      },
    });
  }
}

module.exports = {
  meta: {
    scheme: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.name === 'require' &&
          node.arguments &&
          node.arguments[0].type === 'Literal'
        ) {
          process(node.arguments[0].value, node, context);
        }
      },
      ImportDeclaration(node) {
        process(node.source.value, node, context);
      },
    };
  },
};
