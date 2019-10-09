'use strict';

const { OFF, ERROR, INCONSISTENCY } = require('./internal/error-codes');

module.exports = {
  plugins: ['simple-import-sort'],
  extends: [
    require.resolve('./base.js'),
    'plugin:import/typescript',
    require.resolve('./internal/typescript-recommended.js'),
    'prettier/@typescript-eslint',
  ],

  rules: {
    //
    // eslint-plugin-import
    //

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/no-unresolved.md
     */
    'import/no-unresolved': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/named.md
     */
    'import/named': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/default.md
     */
    'import/default': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/namespace.md
     */
    'import/namespace': OFF,

    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/export.md
     */
    'import/export': OFF,

    //
    // @typescript-eslint/eslint-plugin
    //

    /**
     * Requires using either `T[]` or `Array<T>` for arrays.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
     */
    '@typescript-eslint/array-type': [INCONSISTENCY, { default: 'array-simple' }],

    /**
     * Enforce camelCase naming convention.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
     */
    '@typescript-eslint/camelcase': [
      INCONSISTENCY,
      { properties: 'never', ignoreDestructuring: true },
    ],

    /**
     * Ignore object type definition (`interface` or `type`).
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    '@typescript-eslint/consistent-type-definitions': OFF,

    /**
     * Ignore explicit return types on functions and class methods.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': OFF,

    /**
     * Enforce camelCase naming convention.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    '@typescript-eslint/explicit-member-accessibility': [
      INCONSISTENCY,
      { accessibility: 'no-public' },
    ],

    /**
     * Ignore interface name prefix.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/interface-name-prefix.md
     */
    '@typescript-eslint/interface-name-prefix': OFF,

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

    //
    // simple-import-sort
    //

    //
    // Style guide

    /**
     * Easy auto-fixable import sorting.
     *
     * P.S It only works for ES imports.
     *
     * @see https://github.com/lydell/eslint-plugin-simple-import-sort
     */
    'simple-import-sort/sort': INCONSISTENCY,
  },
};
