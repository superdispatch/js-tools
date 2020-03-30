/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

const { ERROR, INCONSISTENCY } = require('./internal/error-codes');

/**
 * @type {Config}
 * */
module.exports = {
  env: { jest: true },
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:testing-library/recommended',
  ],

  rules: {
    /**
     * Allow to use `dev` and `peer` dependencies in tests.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/no-extraneous-dependencies.md
     */
    'import/no-extraneous-dependencies': [
      ERROR,
      { devDependencies: true, peerDependencies: true },
    ],

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

    //
    // eslint-plugin-testing-library
    //
    /**
     * Prevents using `debug` function.
     *
     * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/master/docs/rules/no-debug.md
     * */
    'testing-library/no-debug': INCONSISTENCY,
  },
};
