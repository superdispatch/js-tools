'use strict';

import { Linter } from 'eslint';

import { createBaseConfig } from './base';
import { injectConfigs, injectPlugins, injectRules } from './utils/configUtils';

export function createTypeScriptConfig(): Linter.Config {
  const config = createBaseConfig();

  //
  // eslint
  //

  injectRules(config, {
    'no-shadow': 'off',
    'no-undef-init': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
  });

  //
  // eslint-plugin-import
  //

  injectConfigs(config, 'plugin:import/typescript');
  injectRules(config, {
    'import/default': 'off',
    'import/export': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
  });

  //
  // @typescript-eslint/eslint-plugin
  //

  injectConfigs(config, 'plugin:@typescript-eslint/recommended');
  injectConfigs(
    config,
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  );
  injectRules(config, {
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-implicit-any-catch': [
      'error',
      { allowExplicitAny: true },
    ],
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { classes: true, functions: false, typedefs: false },
    ],
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      { checkCompoundAssignments: true },
    ],
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  });

  //
  // eslint-plugin-simple-import-sort
  //

  injectPlugins(config, 'simple-import-sort');
  injectRules(config, {
    'simple-import-sort/sort': 'error',
  });

  //
  // eslint-config-prettier - should be last injected config
  //

  injectConfigs(config, 'prettier/@typescript-eslint');

  return config;
}
