/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

const { getJestConfig } = require('./jest');

/** @returns {Config} */
function getTSJestConfig() {
  const config = getJestConfig();

  config.rules = {
    ...config.rules,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  };

  return config;
}

module.exports = { getTSJestConfig };
