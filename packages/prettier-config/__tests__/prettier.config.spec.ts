'use strict';

import { resolveConfig } from 'prettier';

test('config', async () => {
  expect(await resolveConfig(__filename)).toMatchInlineSnapshot(`
    {
      "singleQuote": true,
      "trailingComma": "all",
    }
  `);
});
