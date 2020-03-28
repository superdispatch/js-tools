/**
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.CallExpression} CallExpression
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.ImportDeclaration} ImportDeclaration
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * */

'use strict';

const path = require('path');
const _ = require('lodash');

const ASSETS_FILE_REGEXP = /(.*?)\.(svg|png|jpg|css|sass|scss)$/;

/**
 * @param {string} filename
 */
function fileToKebabCase(filename) {
  return filename.replace(
    ASSETS_FILE_REGEXP,
    (_match, name, ext) => `${_.kebabCase(name)}.${ext}`,
  );
}

/**
 * @param {string} file
 * @param {any} node
 * @param {RuleContext} context
 */
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

/**
 * @type {RuleModule}
 * */
module.exports = {
  meta: {
    scheme: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      CallExpression(estreeNode) {
        const node = /** @type {CallExpression} */ (estreeNode);
        if (
          'name' in node.callee &&
          node.callee.name === 'require' &&
          node.arguments &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          process(node.arguments[0].value, node, context);
        }
      },
      ImportDeclaration(estreeNode) {
        const node = /** @type {ImportDeclaration} */ (estreeNode);
        if (typeof node.source.value === 'string') {
          process(node.source.value, node, context);
        }
      },
    };
  },
};
