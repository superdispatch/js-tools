'use strict';

module.exports = {
  extends: 'plugin:@superdispatch/app',

  overrides: [
    {
      files: ['**/*.spec.js', '**/__testutils__/**/*.js'],
      extends: 'plugin:@superdispatch/jest',
      rules: {
        'node/no-extraneous-require': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
