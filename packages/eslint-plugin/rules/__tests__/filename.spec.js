'use strict';

const { RuleTester } = require('eslint');
const rule = require('../filename');

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('filename', rule, {
  valid: [
    {
      code: '',
      filename: 'src/module-file.js',
    },
  ],
  invalid: ['png', 'jpg', 'css', 'sass', 'scss'].map(ext => ({
    code: '',
    filename: `assets/AssetFile.${ext}`,
    errors: [
      `Asset files name must be in kebab-case. Please rename "AssetFile.${ext}" to "asset-file.${ext}"`,
    ],
  })),
});
