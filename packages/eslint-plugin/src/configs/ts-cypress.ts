import { Linter } from 'eslint';

import { getTSJestConfig } from './ts-jest';
import { injectConfigs, injectEnv, injectRules } from './utils/configUtils';

export function getTSCypressConfig(): Linter.Config {
  const config = getTSJestConfig();

  if (config.env) {
    delete config.env.jest;
    delete config.env['jest/globals'];
  }

  injectConfigs(config, 'plugin:cypress/recommended');
  injectEnv(config, { 'cypress/globals': true });

  injectRules(config, {
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
  });

  return config;
}
