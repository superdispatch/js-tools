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

  config.rules = {
    ...config.rules,

    'no-unused-expressions': 'off',
  };

  config.rules = {
    ...config.rules,

    /**
     * Requires using either `T[]` or `Array<T>` for arrays.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
     */
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    /**
     * Ignore variable cases.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
     */
    '@typescript-eslint/camelcase': 'off',

    /**
     * Ignore object type definition (`interface` or `type`).
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    /**
     * Ignore explicit return types on functions and class methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': 'off',

    /**
     * Require explicit accessibility modifiers on class properties and methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],

    /**
     * Require explicit return and argument types on exported functions' and classes' public class methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     */
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    /**
     * Ignore interface name prefix.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/interface-name-prefix.md
     */
    '@typescript-eslint/interface-name-prefix': 'off',

    /**
     * Disallow usage of the `any` type.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
     */
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],

    /**
     * Disallows non-null assertions using the `!` postfix operator
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
     */
    '@typescript-eslint/no-non-null-assertion': 'error',

    /**
     * Disallow unused expressions.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
     */
    '@typescript-eslint/no-unused-expressions': 'error',

    /**
     * Disable unused variable checks.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    '@typescript-eslint/no-unused-vars': 'off',

    /**
     * Disallow the use of variables before they are defined.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
     */
    '@typescript-eslint/no-use-before-define': [
      'error',
      { classes: true, functions: false, typedefs: false },
    ],

    /**
     * Use function types instead of interfaces with call signatures.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
     */
    '@typescript-eslint/prefer-function-type': 'error',

    /**
     * Using concise optional chain expressions instead of chained logical ands.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
     */
    '@typescript-eslint/prefer-optional-chain': 'error',
  };
}

/** @param {Config} config */
function setupSimpleImportSortPlugin(config) {
  addPlugin(config, 'simple-import-sort');

  config.rules = {
    ...config.rules,

    /**
     * Easy auto-fixable import sorting.
     *
     * @see https://github.com/lydell/eslint-plugin-simple-import-sort
     */
    'simple-import-sort/sort': 'error',
  };
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
