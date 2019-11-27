'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    { files: '**/packages/**/*.js', extends: 'plugin:@superdispatch/node-pkg' },
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
