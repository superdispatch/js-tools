'use strict';

const { OFF, ERROR, INCONSISTENCY } = require('./internal/error-codes');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    require.resolve('./base.js'),
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],

  rules: {
    /**
     * Disable in favour of TypeScript checks.
     *
     * @see https://eslint.org/docs/rules/no-undef
     */
    'no-undef': OFF,

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
    '@typescript-eslint/array-type': [INCONSISTENCY, 'array-simple'],

    /**
     * Enforce camelCase naming convention.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/camelcase.md
     */
    '@typescript-eslint/camelcase': [ERROR, { properties: 'never', ignoreDestructuring: true }],

    /**
     * Enforce camelCase naming convention.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    '@typescript-eslint/consistent-type-definitions': [INCONSISTENCY, 'type'],

    /**
     * Enforce camelCase naming convention.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    '@typescript-eslint/explicit-member-accessibility': [ERROR, { accessibility: 'no-public' }],

    /**
     * Disallow unused variables.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    '@typescript-eslint/no-unused-vars': [
      INCONSISTENCY,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],

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
  },
};
