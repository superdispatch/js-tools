'use strict';

const path = require('path');
const { RuleTester } = require('eslint');
const rule = require('../directory-name');

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('directory-name', rule, {
  valid: [
    { code: '', filename: 'foo-bar/baz.js' },
    { code: '', filename: 'baz.js' },
  ],
  invalid: [
    {
      code: '',
      filename: path.posix.join('my_project', 'src', 'File', 'index.js'),
      errors: [
        'Directory name must be in kebab-case. Please rename my_project/src/File to my_project/src/file',
      ],
    },
    {
      code: '',
      filename: 'fooBar/baz.js',
      errors: [
        'Directory name must be in kebab-case. Please rename fooBar to foo-bar',
      ],
    },
  ],
});
