'use strict';

const path = require('path');
const _ = require('lodash');

function isKebabCase(text) {
  return !!text && /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(text);
}

function isIgnored(text) {
  return !!text && /(^__.*?__$|^@)/.test(text);
}

module.exports = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const relativeDir = _.trim(
      path.dirname(context.getFilename()).replace(context.getCwd(), ''),
      path.sep,
    );
    const baseDir = relativeDir.split(path.sep).pop();

    return {
      Program(node) {
        if (!isIgnored(baseDir) && !isKebabCase(baseDir)) {
          context.report({
            node,
            message:
              'Directory name must be in kebab-case. Please rename {{ invalid }} to {{ valid }}',
            data: {
              invalid: relativeDir,
              valid: relativeDir
                .split(path.sep)
                .slice(0, -1)
                .concat(_.kebabCase(baseDir))
                .join(path.posix.sep),
            },
          });
        }
      },
    };
  },
};
