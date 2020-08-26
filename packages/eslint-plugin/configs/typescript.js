'use strict';

/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

const { getBaseConfig, addPlugin, addExtends } = require('./base');

/** @param {Config} config */
function setupImportPlugin(config) {
  addExtends(config, 'plugin:import/typescript');

  config.rules = {
    ...config.rules,
    'import/default': 'off',
    'import/export': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
  };
}

/** @param {Config} config */
function setupTypeScriptPlugin(config) {
  addExtends(config, 'plugin:@typescript-eslint/recommended');
  addExtends(
    config,
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  );

  config.rules = {
    ...config.rules,
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
  };

  config.rules = {
    ...config.rules,
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-implicit-any-catch': [
      'error',
      { allowExplicitAny: true },
    ],
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { classes: true, functions: false, typedefs: false },
    ],
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      { checkCompoundAssignments: true },
    ],
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  };
}

/** @param {Config} config */
function setupSimpleImportSortPlugin(config) {
  addPlugin(config, 'simple-import-sort');

  config.rules = { ...config.rules, 'simple-import-sort/sort': 'error' };
}

/** @param {Config} config */
function setupPrettierConfig(config) {
  addExtends(config, 'prettier/@typescript-eslint');
}

/** @returns {Config}  */
function getTypeScriptConfig() {
  const config = getBaseConfig();

  setupImportPlugin(config);
  setupTypeScriptPlugin(config);
  setupSimpleImportSortPlugin(config);

  // Should be last.
  setupPrettierConfig(config);

  return config;
}

module.exports = { getTypeScriptConfig };
