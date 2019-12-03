'use strict';

const { RuleTester } = require('eslint');
const rule = require('../camelcase');

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const error = {
  message: 'Do not use snake_case.',
};

describe('ECMAScript', () => {
  const ruleTester = new RuleTester({ parserOptions });

  ruleTester.run('camelcase', rule, {
    valid: [
      { code: 'import { a_b } from "./bar";' },
      { code: 'const { a_b } = {}' },
      { code: 'const { a_b = 1 } = {}' },
      { code: 'const { a_b: aB } = {}' },
      { code: 'const { a_b: aB = 1 } = {}' },
      { code: 'const { aB = a_b } = {}' },
      { code: 'const a = { a_b: 1 }' },
      { code: 'a.b_c' },
      { code: 'a.b_c = 1' },
      { code: 'a.b_c()' },
    ],
    invalid: [
      { errors: [error, error], code: 'let a_b, b_c' },
      { errors: [error, error], code: 'var a_b, b_c' },
      { errors: [error, error], code: 'const a_b = 1, b_c = 2' },
      { errors: [error], code: 'class a_b {}' },
      { errors: [error], code: 'class A { b_c() {} }' },
      { errors: [error], code: 'class A { static b_c() {} }' },
      { errors: [error], code: 'function a_b() {}' },
      { errors: [error], code: 'function a(b_c) {}' },
      { errors: [error], code: 'function a(b_c = 1) {}' },
      { errors: [error], code: 'const { aB: a_b } = {}' },
    ],
  });
});

describe('TypeScript', () => {
  const ruleTester = new RuleTester({
    parserOptions,
    parser: require.resolve('@typescript-eslint/parser'),
  });

  ruleTester.run('camelcase', rule, {
    valid: [{ code: 'const a = a?.b_c' }, { code: 'const a = a?.b_c?.d_e' }],
    invalid: [
      { errors: [error], code: 'class A { b_c }' },
      { errors: [error], code: 'class A { b_c = 1 }' },
      { errors: [error], code: 'class A { static b_c }' },
      { errors: [error], code: 'class A { static b_c = 1 }' },
      { errors: [error], code: 'abstract class a_b {}' },
      { errors: [error], code: 'abstract class A { abstract a_b; }' },
      { errors: [error], code: 'interface a_b {}' },
      { errors: [error], code: 'interface A { b_c }' },
      { errors: [error], code: 'interface A { b_c() }' },
      { errors: [error], code: 'type A<T_a> = {}' },
      { errors: [error], code: 'class A<T_a> {}' },
      { errors: [error], code: 'class A<T_a> {}' },
      { errors: [error], code: 'function a<T_a>() {}' },
      { errors: [error], code: 'interface A<T_a> {}' },
      { errors: [error], code: 'class A { a<T_a>() {} }' },
      { errors: [error], code: 'type A<T_a = {}> = {}' },
      { errors: [error], code: 'class A<T_a = {}> {}' },
      { errors: [error], code: 'function a<T_a = {}>() {}' },
      { errors: [error], code: 'interface A<T_a = {}> {}' },
      { errors: [error], code: 'class A { a<T_a = {}>() {} }' },
      { errors: [error], code: 'type A<T_a extends {}> = {}' },
      { errors: [error], code: 'class A<T_a extends {}> {}' },
      { errors: [error], code: 'function a<T_a extends {}>() {}' },
      { errors: [error], code: 'interface A<T_a extends {}> {}' },
      { errors: [error], code: 'class A { a<T_a extends {}>() {} }' },
    ],
  });
});
