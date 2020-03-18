import { RuleTester } from 'eslint';

import rule from '../no-index-file';

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('no-index-file', rule, {
  valid: [
    {
      code: '',
      filename: 'src/module-file.js',
    },
  ],
  invalid: ['ts', 'tsx', 'js', 'jsx'].map(ext => ({
    code: '',
    filename: `src/index.${ext}`,
    errors: [
      "Avoid usage of index file names for features. Each file should be described by it's name.",
    ],
  })),
});
