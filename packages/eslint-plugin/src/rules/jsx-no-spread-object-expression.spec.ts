'use strict';

import { RuleTester } from 'eslint';
import rule from './jsx-no-spread-object-expression';

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: { jsx: true },
};

const expectedError = {
  message: 'Do not use object expressions in JSX spread',
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('jsx-no-spread-object-expression', rule, {
  valid: [{ code: '<App {...props} />' }],
  invalid: [
    {
      errors: [expectedError],
      code: '<App {...{ foo }} />',
      output: '<App foo={foo} />',
    },
    {
      errors: [expectedError],
      code: '<App {...{ foo: 1 }} />',
      output: '<App foo={1} />',
    },
    {
      errors: [expectedError],
      code: '<App {...{ foo: "bar" }} />',
      output: '<App foo={"bar"} />',
    },
    {
      errors: [expectedError],
      code: '<App {...{ "foo-bar": "baz" }} />',
      output: '<App foo-bar={"baz"} />',
    },
    {
      errors: [expectedError],
      code: '<App {...{ foo: `bar ${baz} quoz` }} />',
      output: '<App foo={`bar ${baz} quoz`} />',
    },
    {
      errors: [expectedError],
      code: '<App {...{ ...foo, bar, ...baz }} />',
      output: '<App {...foo} bar={bar} {...baz} />',
    },
    {
      errors: [expectedError],
      code: '<App {...{ [foo]: bar }} />',
      output: '<App {...{ [foo]: bar }} />',
    },
  ],
});
