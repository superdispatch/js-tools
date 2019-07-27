'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    {
      files: ['jest.config.js', '**/__tests__/**/*.js', '**/__testutils__/**/*.js'],
      extends: 'plugin:@superdispatch/jest',
      rules: {
        'node/no-unpublished-require': 'off',
        'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
      },
    },
  ],
};
