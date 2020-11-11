/**
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * */

'use strict';

const path = require('path');
const _ = require('lodash');

/**
 * @param {string} text
 */
function isValidDirname(text) {
  return new RegExp(
    '^' +
      // Can possibly start with `__` (e.g: `__tests__`).
      '(__)?' +
      // Should start with alphanumeric symbols.
      '([a-z0-9]+)' +
      // Can be separated with only dash followed by alphanumeric symbols.
      '(-[a-z0-9]+)*' +
      // Can possibly end with `__` (e.g: `__tests__`).
      '(__)?' +
      '$',
  ).test(text);
}

/**
 * @type {RuleModule}
 * */
module.exports = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const baseDir = _.trim(
      // TODO Remove @ts-ignore
      // @ts-ignore
      path.dirname(context.getFilename()).replace(context.getCwd(), ''),
      path.sep,
    )
      .split(path.sep)
      .pop();

    return {
      Program(node) {
        if (
          baseDir &&
          // `path.dirname` gives `.` for root file
          baseDir !== '.' &&
          !isValidDirname(baseDir)
        ) {
          context.report({
            node,
            message:
              'Directory name must be in kebab-case. Please rename "{{ invalid }}" to "{{ valid }}"',
            data: {
              invalid: baseDir,
              valid: baseDir.replace(
                /^(__)?(.*?)(__)?$/,
                (_match, m1 = '', m2 = '', m3 = '') =>
                  `${m1}${_.kebabCase(m2)}${m3}`,
              ),
            },
          });
        }
      },
    };
  },
};
