'use strict';

import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('ts-jest'),
    await getConfigData('ts-cypress'),
  );

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
      Object {
        "env": Object {
    -     "jest/globals": true,
    +     "cypress/globals": true,
    +     "jest": false,
    +     "jest/globals": false,
        },
        "globals": Object {},
        "parser": "node_modules/@typescript-eslint/parser/dist/index.js",
        "parserOptions": Object {
          "ecmaVersion": 2020,
    @@ --- --- @@
        "plugins": Array [
          "import",
          "jest",
          "testing-library",
          "@typescript-eslint",
    +     "cypress",
          "simple-import-sort",
          "eslint-comments",
          "@superdispatch",
          "array-func",
        ],
  `);
  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
        "curly": Array [
          "error",
          "multi-line",
          "consistent",
        ],
    +   "cypress/no-assigning-return-values": Array [
    +     "error",
    +   ],
    +   "cypress/no-async-tests": Array [
    +     "error",
    +   ],
    +   "cypress/no-unnecessary-waiting": Array [
    +     "error",
    +   ],
        "dot-location": Array [
          "off",
        ],
        "dot-notation": Array [
          "error",
    @@ --- --- @@
        ],
        "indent-legacy": Array [
          "off",
        ],
        "jest/expect-expect": Array [
    -     "error",
    +     "off",
        ],
        "jest/no-alias-methods": Array [
          "error",
        ],
        "jest/no-commented-out-tests": Array [
    @@ --- --- @@
        ],
        "jest/valid-describe": Array [
          "error",
        ],
        "jest/valid-expect": Array [
    -     "error",
    +     "off",
        ],
        "jest/valid-expect-in-promise": Array [
    -     "error",
    +     "off",
        ],
        "jest/valid-title": Array [
          "error",
        ],
        "jsx-quotes": Array [
    @@ --- --- @@
        ],
        "template-tag-spacing": Array [
          "off",
        ],
        "testing-library/await-async-query": Array [
    -     "error",
    +     "off",
        ],
        "testing-library/await-async-utils": Array [
          "error",
        ],
        "testing-library/no-await-sync-query": Array [
    @@ --- --- @@
        ],
        "testing-library/prefer-presence-queries": Array [
          "error",
        ],
        "testing-library/prefer-wait-for": Array [
    -     "error",
    +     "off",
        ],
        "unicode-bom": Array [
          "off",
        ],
        "use-isnan": Array [
  `);
});
