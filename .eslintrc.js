'use strict';

module.exports = {
  overrides: [
    {
      files: '*.js',
      extends: 'plugin:@superdispatch/node',
    },

    {
      files: '*.ts',
      extends: 'plugin:@superdispatch/ts-node',
      parserOptions: { project: './tsconfig.json' },
      rules: {
        '@typescript-eslint/no-parameter-properties': 'off',
      },
    },

    {
      files: ['**/packages/**/*.js', '**/packages/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            peerDependencies: true,
            optionalDependencies: true,
          },
        ],
      },
    },

    {
      files: '**/packages/eslint-plugin/src/configs/*.ts',
      rules: {
        'sort-keys': ['error', 'asc', { natural: true }],
        '@typescript-eslint/no-parameter-properties': 'off',
      },
    },

    {
      files: '**/packages/eslint-plugin/src/rules/*.ts',
      extends: ['plugin:eslint-plugin/rules-recommended'],
      rules: {
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      },
    },

    {
      files: ['**/*.spec.ts', '**/__testutils__/**/*.ts'],
      extends: [
        'plugin:@superdispatch/ts-jest',
        'plugin:eslint-plugin/tests-recommended',
      ],
      rules: {
        '@typescript-eslint/no-parameter-properties': 'off',
      },
    },
  ],
};
