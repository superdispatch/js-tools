import { Linter } from 'eslint';
import { createTypeScriptConfig } from './typescript';
import { injectConfigs, injectRules } from './utils/configUtils';

export function createTSCypressConfig(): Linter.Config {
  const config = createTypeScriptConfig();

  //
  // eslint-plugin-testing-library
  //

  injectRules(config, {
    'testing-library/await-async-query': 'off',
    'testing-library/await-async-utils': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/prefer-wait-for': 'off',
  });

  //
  // eslint-plugin-cypress
  //

  injectConfigs(config, 'plugin:cypress/recommended');

  return config;
}
