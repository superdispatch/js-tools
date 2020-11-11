'use strict';

module.exports = {
  overrides: [
    {
      files: '*.js',
      extends: 'plugin:@superdispatch/node',
    },

    {
      files: '*.ts',
      extends: 'plugin:@superdispatch/typescript',
      parserOptions: { project: './tsconfig.json' },
    },

    {
      files: '**/packages/**/*.js',
      extends: 'plugin:@superdispatch/node-pkg',
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            peerDependencies: true,
            optionalDependencies: true,
          },
        ],
      },
    },

    {
      files: '**/packages/eslint-plugin/configs/*.js',
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
      files: ['**/*.spec.ts'],
      extends: 'plugin:@superdispatch/ts-jest',
    },
  ],
};
