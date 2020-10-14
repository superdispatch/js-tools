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
    },

    {
      files: '**/packages/eslint-plugin/configs/*.js',
      rules: {
        'sort-keys': ['error', 'asc', { natural: true }],
      },
    },

    {
      files: ['**/__tests__/**/*.js', '**/__testutils__/**/*.js'],
      extends: 'plugin:@superdispatch/jest',
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { packageDir: __dirname },
        ],
      },
    },
  ],
};
