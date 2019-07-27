'use strict';

module.exports = {
  extends: 'plugin:@superdispatch/app',

  overrides: [
    {
      extends: 'plugin:@superdispatch/jest',
      files: ['**/*.spec.js', '**/__testutils__/**/*.js'],
      rules: {
        'node/no-extraneous-require': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
