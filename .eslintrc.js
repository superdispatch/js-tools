'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    {
      files: '**/{__tests__,__testutils__}/**/*.js',
      extends: 'plugin:@superdispatch/jest',
      rules: {
        'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
      },
    },
  ],
};
