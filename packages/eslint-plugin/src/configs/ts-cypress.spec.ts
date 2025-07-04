import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('typescript'),
    await getConfigData('ts-cypress'),
  );

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
      Object {
    -   "env": Object {},
    +   "env": Object {
    +     "cypress/globals": true,
    +   },
        "globals": Object {},
        "parser": "node_modules/@typescript-eslint/parser/dist/index.js",
        "parserOptions": Object {
          "ecmaVersion": 2020,
          "sourceType": "module",
        },
        "plugins": Array [
          "import",
          "@typescript-eslint",
    +     "cypress",
          "eslint-comments",
          "array-func",
        ],
        "settings": Object {
          "import/extensions": Array [
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
    +   "cypress/unsafe-to-chain-command": Array [
    +     "error",
    +   ],
        "dot-location": Array [
          "off",
        ],
        "dot-notation": Array [
          "error",
    @@ --- --- @@
        ],
        "template-curly-spacing": Array [
          "off",
        ],
        "template-tag-spacing": Array [
    +     "off",
    +   ],
    +   "testing-library/await-async-query": Array [
    +     "off",
    +   ],
    +   "testing-library/await-async-utils": Array [
    +     "off",
    +   ],
    +   "testing-library/prefer-screen-queries": Array [
    +     "off",
    +   ],
    +   "testing-library/prefer-wait-for": Array [
          "off",
        ],
        "unicode-bom": Array [
          "off",
        ],
  `);
});
