'use strict';

const { resolveConfig } = require('prettier');

it('exposes config', () =>
  expect(resolveConfig(__filename)).resolves.toMatchInlineSnapshot(`
    Object {
      "singleQuote": true,
      "trailingComma": "all",
    }
  `));
