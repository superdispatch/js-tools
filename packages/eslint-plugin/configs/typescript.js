'use strict';

/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

const { OFF, ERROR, INCONSISTENCY } = require('./internal/error-codes');

const pluginRules = {
  import: {
    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/default.md
     */
    'import/default': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/export.md
     */
    'import/export': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/named.md
     */
    'import/named': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/namespace.md
     */
    'import/namespace': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/no-unresolved.md
     */
    'import/no-unresolved': OFF,
  },
  simpleImportSort: {
    /**
     * Easy auto-fixable import sorting.
     *
     * @see https://github.com/lydell/eslint-plugin-simple-import-sort
     */
    'simple-import-sort/sort': INCONSISTENCY,
  },
  typescript: {
    //
    // @typescript-eslint/eslint-plugin
    //

    /**
     * Requires using either `T[]` or `Array<T>` for arrays.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
     */
    '@typescript-eslint/array-type': [
      INCONSISTENCY,
      { default: 'array-simple' },
    ],

    /**
     * Ignore variable cases.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
     */
    '@typescript-eslint/camelcase': OFF,

    /**
     * Ignore object type definition (`interface` or `type`).
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    '@typescript-eslint/consistent-type-definitions': [ERROR, 'interface'],

    /**
     * Ignore explicit return types on functions and class methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': OFF,

    /**
     * Require explicit accessibility modifiers on class properties and methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    '@typescript-eslint/explicit-member-accessibility': [
      INCONSISTENCY,
      { accessibility: 'no-public' },
    ],

    /**
     * Require explicit return and argument types on exported functions' and classes' public class methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     */
    '@typescript-eslint/explicit-module-boundary-types': INCONSISTENCY,

    /**
     * Ignore interface name prefix.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/interface-name-prefix.md
     */
    '@typescript-eslint/interface-name-prefix': OFF,

    /**
     * Disallow usage of the `any` type.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
     */
    '@typescript-eslint/no-explicit-any': [
      INCONSISTENCY,
      { ignoreRestArgs: true },
    ],

    /**
     * Disallows non-null assertions using the `!` postfix operator
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
     */
    '@typescript-eslint/no-non-null-assertion': INCONSISTENCY,

    /**
     * Disallow unused expressions.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
     */
    '@typescript-eslint/no-unused-expressions': INCONSISTENCY,

    /**
     * Disable unused variable checks.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    '@typescript-eslint/no-unused-vars': OFF,

    /**
     * Disallow the use of variables before they are defined.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
     */
    '@typescript-eslint/no-use-before-define': [
      ERROR,
      { classes: true, functions: false, typedefs: false },
    ],

    /**
     * Use function types instead of interfaces with call signatures.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
     */
    '@typescript-eslint/prefer-function-type': INCONSISTENCY,

    /**
     * Using concise optional chain expressions instead of chained logical ands.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
     */
    '@typescript-eslint/prefer-optional-chain': INCONSISTENCY,
  },
};

/**
 * @type {Config}
 * */
module.exports = {
  extends: [
    require.resolve('./base.js'),
    'plugin:import/typescript',
    require.resolve('./internal/typescript-recommended.js'),
    'prettier/@typescript-eslint',
  ],

  plugins: ['simple-import-sort'],

  rules: {
    'no-unused-expressions': OFF,

    ...pluginRules.import,
    ...pluginRules.simpleImportSort,
    ...pluginRules.typescript,
  },
};
