/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

const { addExtends } = require('./base');
const { getTSJestConfig } = require('./ts-jest');

/** @returns {Config} */
function getTSCypressConfig() {
  const config = getTSJestConfig();

  addExtends(config, 'plugin:cypress/recommended');

  config.env = {
    'cypress/globals': true,
  };

  config.rules = {
    ...config.rules,
    'jest/expect-expect': 'off',
    'jest/valid-expect': 'off',
    'jest/valid-expect-in-promise': 'off',
    'no-restricted-properties': [
      'error',
      ...[
        'queryByAltText',
        'queryByDisplayValue',
        'queryByLabelText',
        'queryByPlaceholderText',
        'queryByRole',
        'queryByTestId',
        'queryByText',
        'queryByTitle',
        'queryAllByAltText',
        'queryAllByDisplayValue',
        'queryAllByLabelText',
        'queryAllByPlaceholderText',
        'queryAllByRole',
        'queryAllByTestId',
        'queryAllByText',
        'queryAllByTitle',
      ].map((property) => ({
        message:
          'Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130',
        object: 'cy',
        property,
      })),
    ],
    'testing-library/await-async-query': 'off',
    'testing-library/prefer-wait-for': 'off',
  };

  return config;
}

module.exports = { getTSCypressConfig };
