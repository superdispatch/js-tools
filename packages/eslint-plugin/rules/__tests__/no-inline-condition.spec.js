'use strict';

const { RuleTester } = require('eslint');
const rule = require('../no-inline-condition');

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const error = {
  message: 'Do not use inline conditions.',
};

describe('ECMAScript', () => {
  const ruleTester = new RuleTester({ parserOptions });

  ruleTester.run('no-inline-condition', rule, {
    valid: [
      { code: 'const foo = bar && baz();' },
      { code: 'const foo = bar || baz();' },
      { code: 'const foo = bar ? 1 : 0;' },
      { code: 'function foo() {return bar && baz;}' },
      { code: 'function foo() {return bar ? 1 : 0;}' },
    ],
    invalid: [
      {
        errors: [error],
        code: 'foo && bar()',
        output: 'if (foo) bar();',
      },
      {
        errors: [error],
        code: 'baz && bar && test();',
        output: 'if (baz && bar) test();',
      },
      {
        errors: [error],
        code: 'foo || bar()',
        output: 'if (!foo) bar();',
      },
      {
        errors: [error],
        code: 'foo || baz || bar()',
        output: 'if (!(foo || baz)) bar();',
      },
      {
        errors: [error],
        code: 'foo ? bar() : baz()',
        output: 'if (foo) bar();else baz();',
      },
      {
        errors: [error],
        code: 'foo ? bar() : baz ? baz() : null',
        output: 'if (foo) bar();else baz ? baz() : null;',
      },
      {
        errors: [error],
        code: 'if (foo) bar();else baz ? baz() : null;',
        output: 'if (foo) bar();else if (baz) baz();else null;',
      },
      {
        errors: [error],
        code: 'foo() ? bar() : baz()',
        output: 'if (foo()) bar();else baz();',
      },
      {
        errors: [error],
        code: 'foo() ? true : false',
        output: 'if (foo()) true;else false;',
      },
    ],
  });
});
