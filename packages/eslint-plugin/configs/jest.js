'use strict';

const { ERROR } = require('./internal/error-codes');

module.exports = {
  env: { jest: true },
  extends: [require.resolve('./base'), 'plugin:jest/recommended', 'plugin:jest/style'],

  rules: {
    /**
     * Allow to use `dev` and `peer` dependencies in tests.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/no-extraneous-dependencies.md
     */
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true, peerDependencies: true }],

    //
    // eslint-plugin-jest
    //

    /**
     * Disallow alias methods.
     *
     * @see https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-alias-methods.md
     */
    'jest/no-alias-methods': ERROR,

    /**
     * Disallow disabled tests.
     *
     * @see https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-disabled-tests.md
     */
    'jest/no-disabled-tests': ERROR,

    /**
     * Disallow disabled tests.
     *
     * @see https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-jasmine-globals.md
     */
    'jest/no-jasmine-globals': ERROR,
  },
};
