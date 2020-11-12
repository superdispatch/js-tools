import { Linter } from 'eslint';

import { getJestConfig } from './jest';
import { injectRules } from './utils/configUtils';

export function getTSJestConfig(): Linter.Config {
  const config = getJestConfig();

  injectRules(config, {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  });

  return config;
}
