'use strict';

const path = require('path');
const _ = require('lodash');

function isValidDirname(text) {
  return new RegExp(
    '^' +
      // Can possibly start with `__` (e.g: `__tests__`).
      '(__)?' +
      // Should start with alphanumeric symbols.
      '([a-z0-9]+)' +
      // Can be separated with only on dash followed by alphanumeric symbols.
      '(-[a-z0-9]+)*' +
      // Can possibly end with `__` (e.g: `__tests__`).
      '(__)?' +
      '$',
  ).test(text);
}

module.exports = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const baseDir = _.trim(
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
                (match, m1 = '', m2 = '', m3 = '') =>
                  `${m1}${_.kebabCase(m2)}${m3}`,
              ),
            },
          });
        }
      },
    };
  },
};
