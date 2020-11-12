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
      },
    },

    {
      files: [
        '**/*.spec.js',
        '**/__tests__/**/*.js',
        '**/__testutils__/**/*.js',
      ],
      extends: 'plugin:@superdispatch/jest',
      rules: {
        'node/no-missing-require': 'off',
        'node/no-unpublished-require': 'off',
      },
    },

    {
      files: ['**/*.spec.ts', '**/__testutils__/**/*.ts'],
      extends: 'plugin:@superdispatch/ts-jest',
    },
  ],
};
