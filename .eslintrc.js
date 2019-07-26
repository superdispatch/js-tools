'use strict';

module.exports = {
  extends: './packages/eslint-config',

  overrides: [
    {
      files: ['**/*.spec.js', '**/__testutils__/**/*.js'],
      extends: './packages/eslint-config/jest',
      rules: {
        'node/no-extraneous-require': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
