import { Linter } from 'eslint';

import { createJestConfig } from './jest';
import { createTypeScriptConfig } from './typescript';
import { injectRules, mergeConfigs } from './utils/configUtils';

export function createTSJestConfig(): Linter.Config {
  const config = mergeConfigs(createJestConfig(), createTypeScriptConfig());

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
