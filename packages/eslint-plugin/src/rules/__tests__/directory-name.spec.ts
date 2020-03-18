import { RuleTester } from 'eslint';
import path from 'path';

import rule from '../directory-name';

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
      filename: '__testDir__/baz.js',
      errors: [
        'Directory name must be in kebab-case. Please rename "__testDir__" to "__test-dir__"',
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
