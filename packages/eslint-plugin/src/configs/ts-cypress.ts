import { Linter } from 'eslint';
import { injectTSJestConfig } from './ts-jest';
import { createTypeScriptConfig } from './typescript';
import { injectConfigs, injectEnv, injectRules } from './utils/configUtils';

export function createTSCypressConfig(): Linter.Config {
  const config = createTypeScriptConfig();

  //
  // @superdispatch/eslint-plugin
  //

  injectTSJestConfig(config);
  // injectRules()

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

  //
  // eslint-plugin-cypress
  //

  injectConfigs(config, 'plugin:cypress/recommended');

  return config;
}
