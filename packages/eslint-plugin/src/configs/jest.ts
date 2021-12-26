import { Linter } from 'eslint';
import { createNodeConfig } from './node';
import { injectConfigs, injectRules } from './utils/configUtils';

export function injectJestConfig(config: Linter.Config): void {
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
  // eslint-plugin-import
  //

  injectRules(config, {
    'import/no-extraneous-dependencies': 'off',
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
    'plugin:testing-library/dom',
    'plugin:testing-library/react',
  );

  injectRules(config, {
    'testing-library/no-debugging-utils': 'error',
    'testing-library/no-wait-for-empty-callback': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-wait-for': 'error',
  });
}

export function createJestConfig(): Linter.Config {
  const config = createNodeConfig();

  injectJestConfig(config);

  return config;
}
