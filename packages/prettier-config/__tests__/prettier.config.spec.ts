'use strict';

import { resolveConfig } from 'prettier';

test('config', async () => {
  expect(await resolveConfig(__filename)).toMatchInlineSnapshot(`
    Object {
      "singleQuote": true,
      "trailingComma": "all",
    }
  `);
});
