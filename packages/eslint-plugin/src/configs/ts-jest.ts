import { Linter } from 'eslint';

import { injectJestConfig } from './jest';
import { createTypeScriptConfig } from './typescript';
import { injectRules } from './utils/configUtils';

export function createTSJestConfig(): Linter.Config {
  const config = createTypeScriptConfig();

  //
  // @superdispatch/eslint-plugin
  //

  injectJestConfig(config);

  //
  // @typescript-eslint/eslint-plugin
  //

  injectRules(config, {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  });

  return config;
}
