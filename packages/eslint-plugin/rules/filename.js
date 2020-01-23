'use strict';

const path = require('path');
const _ = require('lodash');

const ASSETS_FILE_REGEXP = /(.*?)\.(png|jpg|css|sass|scss)$/;

function isKebabCase(text) {
  return new RegExp(
    '^' +
      // Should start with alphanumeric symbols.
      '([a-z0-9]+)' +
      // Can be separated with only dash followed by alphanumeric symbols.
      '(-[a-z0-9]+)*' +
      '$',
  ).test(text);
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
        if (ASSETS_FILE_REGEXP.test(filename) && !isKebabCase(filename)) {
          context.report({
            node,
            message:
              'Asset files name must be in kebab-case. Please rename "{{ invalid }}" to "{{ valid }}"',
            data: {
              invalid: filename,
              valid: filename.replace(
                ASSETS_FILE_REGEXP,
                (match, name, ext) => `${_.kebabCase(name)}.${ext}`,
              ),
            },
          });
        }
      },
    };
  },
};
