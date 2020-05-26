'use strict';

const { resolveConfig } = require('prettier');

it('exposes config', async () => {
  expect(await resolveConfig(__filename)).toMatchInlineSnapshot(`
    Object {
      "singleQuote": true,
      "trailingComma": "all",
    }
  `);
});
