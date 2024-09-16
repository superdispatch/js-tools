'use strict';

import { Linter } from 'eslint';
import { createBaseConfig } from './base';
import { injectConfigs, injectRules } from './utils/configUtils';

export function injectTypeScriptConfig(config: Linter.Config): void {
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
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-base-to-string': [
      'error',
      { ignoredTypeNames: ['RegExp'] },
    ],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: false,
        ignoreVoidOperator: false,
      },
    ],
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { classes: true, functions: false, typedefs: false },
    ],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      { skipCompoundAssignments: true },
    ],
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  });

  //
  // eslint-config-prettier - should be last injected config
  //

  injectConfigs(config, 'prettier');
}

export function createTypeScriptConfig(): Linter.Config {
  const config = createBaseConfig();

  injectTypeScriptConfig(config);

  return config;
}
