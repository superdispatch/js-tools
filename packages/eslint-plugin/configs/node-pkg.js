/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

/**
 * @type {Config}
 * */
module.exports = {
  extends: [require.resolve('./node')],

  rules: {
    /**
     * Disallow `require()` expressions which import private modules.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-require.md
     */
    'node/no-unpublished-require': 'error',
  },
};
