/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

const { getNodeConfig } = require('./node');

/** @returns {Config} */
function getNodePackageConfig() {
  const config = getNodeConfig();

  config.rules = {
    ...config.rules,

    /**
     * Disallow `require()` expressions which import private modules.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-require.md
     */
    'node/no-unpublished-require': 'error',
  };

  return config;
}

module.exports = { getNodePackageConfig };
