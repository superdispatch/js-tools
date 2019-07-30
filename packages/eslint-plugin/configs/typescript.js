'use strict';

const { OFF, ERROR, INCONSISTENCY } = require('./internal/error-codes');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    './base.js',
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
     * @deprecated
     */
    // TODO: Remove once it would be deleted from `@typescript-eslint/eslint-plugin`.
    '@typescript-eslint/prefer-interface': OFF,
    // TODO: Remove after next `@typescript-eslint/eslint-plugin` release.
    '@typescript-eslint/no-angle-bracket-type-assertion': OFF,
    // TODO: Remove after next `@typescript-eslint/eslint-plugin` release.
    '@typescript-eslint/no-object-literal-type-assertion': OFF,

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

    // TODO: Enable after next `@typescript-eslint/eslint-plugin` release.
    // /**
    //  * Ignore consistent usage of type assertions.
    //  *
    //  * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
    //  */
    // '@typescript-eslint/consistent-type-assertions': [
    //   ERROR,
    //   {
    //     assertionStyle: 'as',
    //     objectLiteralTypeAssertions: 'allow',
    //   },
    // ],

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
    '@typescript-eslint/explicit-member-accessibility': [ERROR, { accessibility: 'no-public' }],

    /**
     * Ignore interface name prefix.
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/interface-name-prefix.md
     */
    '@typescript-eslint/interface-name-prefix': OFF,

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
