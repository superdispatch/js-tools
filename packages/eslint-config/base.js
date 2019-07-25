'use strict';

module.exports = {
  root: true,
  plugins: ['eslint-plugin-import'],

  extends: [
    // Enable default recommended rules.
    'eslint:recommended',

    // Disable style rules covered by Prettier.
    require.resolve('eslint-config-prettier'),
  ],
};
