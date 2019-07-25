'use strict';

module.exports = {
  extends: './packages/eslint-config',

  overrides: [
    {
      files: '**/__testutils__/**/*.js',
      extends: './packages/eslint-config/jest',
    },
  ],
};
