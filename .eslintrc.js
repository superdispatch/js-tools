'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    {
      files: '**/packages/**/*.js',
      extends: 'plugin:@superdispatch/node-pkg',
    },
    {
      files: '**/packages/**/*.ts',
      extends: 'plugin:@superdispatch/typescript',
    },
    {
      files: '**/{__tests__,__testutils__}/**/*.{js,ts}',
      extends: 'plugin:@superdispatch/jest',
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { packageDir: __dirname },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
