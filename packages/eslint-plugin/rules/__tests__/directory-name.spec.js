'use strict';

const path = require('path');
const { RuleTester } = require('eslint');
const rule = require('../directory-name');

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('directory-name', rule, {
  valid: [
    // Test root file
    {
      code: '',
      filename: path.join(__dirname, '../../../..', 'index.js'),
    },
    { code: '', filename: 'baz.js' },
    { code: '', filename: 'foo-bar/baz.js' },
    { code: '', filename: '__tests__/baz.js' },
  ],
  invalid: [
    {
      code: '',
      filename: path.posix.join('my_project', 'src', 'File', 'index.js'),
      errors: [
        'Directory name must be in kebab-case. Please rename "File" to "file"',
      ],
    },
    {
      code: '',
      filename: 'fooBar/baz.js',
      errors: [
        'Directory name must be in kebab-case. Please rename "fooBar" to "foo-bar"',
      ],
    },
  ],
});
