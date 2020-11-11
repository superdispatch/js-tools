/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

/** @returns {Config} */
function getJestConfig() {
  return {
    env: { jest: true },
    extends: [
      'plugin:jest/recommended',
      'plugin:jest/style',
      'plugin:testing-library/recommended',
      'plugin:testing-library/react',
    ],

    rules: {
      'import/no-extraneous-dependencies': 'off',
      'jest/expect-expect': 'error',
      'jest/no-alias-methods': 'error',
      'jest/no-commented-out-tests': 'error',
      'jest/no-disabled-tests': 'error',
      'jest/no-jasmine-globals': 'error',
      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],
      'testing-library/no-debug': 'error',
      'testing-library/no-wait-for-empty-callback': 'error',
      'testing-library/prefer-presence-queries': 'error',
      'testing-library/prefer-wait-for': 'error',
    },
  };
}

module.exports = { getJestConfig };
