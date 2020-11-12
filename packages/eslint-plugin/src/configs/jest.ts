import { Linter } from 'eslint';

import { createBaseConfig } from './base';
import { injectConfigs, injectRules } from './utils/configUtils';

export function createJestConfig(): Linter.Config {
  const config = createBaseConfig();

  //
  // eslint
  //

  injectRules(config, {
    // Allow `expect.toMatchInlineSnapshot(`…`)`
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
  });

  //
  // eslint-plugin-jest
  //

  injectConfigs(config, 'plugin:jest/recommended', 'plugin:jest/style');
  injectRules(config, {
    'jest/expect-expect': 'error',
    'jest/no-alias-methods': 'error',
    'jest/no-commented-out-tests': 'error',
    'jest/no-disabled-tests': 'error',
    'jest/no-jasmine-globals': 'error',
  });

  //
  // eslint-plugin-testing-library
  //

  injectConfigs(
    config,
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
  );

  injectRules(config, {
    'testing-library/no-debug': 'error',
    'testing-library/no-wait-for-empty-callback': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-wait-for': 'error',
  });

  return config;
}
