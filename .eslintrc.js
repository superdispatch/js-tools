'use strict';

module.exports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'no-import-warning',
            importNames: ['WARNING'],
            message:
              "We shouldn't use warnings in the base config, we should override errors to warnings in app configs. It's better to use INCONSISTENCY.",
          },
        ],
      },
    ],
  },
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    { files: '*.ts', extends: 'plugin:@superdispatch/typescript' },

    {
      files: '**/packages/**/*.js',
      extends: 'plugin:@superdispatch/node-pkg',
    },

    {
      files: '**/packages/eslint-plugin/configs/*.js',
      rules: { 'sort-keys': ['error', 'asc', { natural: true }] },
    },

    {
      files: '**/{__tests__,__testutils__}/**/*.js',
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
