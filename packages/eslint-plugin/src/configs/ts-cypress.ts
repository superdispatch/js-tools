import { Linter } from 'eslint';

import { createTSJestConfig } from './ts-jest';
import { injectConfigs, injectEnv, injectRules } from './utils/configUtils';

export function createTSCypressConfig(): Linter.Config {
  const config = createTSJestConfig();

  //
  // eslint-plugin-cypress
  //

  injectConfigs(config, 'plugin:cypress/recommended');

  //
  // eslint-plugin-jest
  //

  injectEnv(config, {
    jest: false,
    'jest/globals': false,
  });
  injectRules(config, {
    'jest/expect-expect': 'off',
    'jest/valid-expect': 'off',
    'jest/valid-expect-in-promise': 'off',
  });

  //
  // eslint-plugin-testing-library
  //

  injectRules(config, {
    'testing-library/await-async-query': 'off',
    'testing-library/prefer-wait-for': 'off',
  });

  return config;
}
