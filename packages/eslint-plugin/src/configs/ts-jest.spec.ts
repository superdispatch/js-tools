'use strict';

import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('typescript'),
    await getConfigData('ts-jest'),
  );

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
      Object {
    -   "env": Object {},
    +   "env": Object {
    +     "jest/globals": true,
    +   },
        "globals": Object {},
        "parser": "node_modules/@typescript-eslint/parser/dist/index.js",
        "parserOptions": Object {
          "ecmaVersion": 2020,
          "sourceType": "module",
        },
        "plugins": Array [
          "import",
    +     "jest",
    +     "testing-library",
          "@typescript-eslint",
          "simple-import-sort",
          "eslint-comments",
          "@superdispatch",
          "array-func",
  `);
  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
        ],
        "@typescript-eslint/no-empty-interface": Array [
          "error",
        ],
        "@typescript-eslint/no-explicit-any": Array [
    -     "error",
    -     Object {
    -       "ignoreRestArgs": true,
    -     },
    +     "off",
        ],
        "@typescript-eslint/no-extra-non-null-assertion": Array [
          "error",
        ],
        "@typescript-eslint/no-extra-parens": Array [
    @@ --- --- @@
        ],
        "@typescript-eslint/no-non-null-asserted-optional-chain": Array [
          "error",
        ],
        "@typescript-eslint/no-non-null-assertion": Array [
    -     "error",
    +     "off",
        ],
        "@typescript-eslint/no-shadow": Array [
          "error",
        ],
        "@typescript-eslint/no-this-alias": Array [
    @@ --- --- @@
        ],
        "@typescript-eslint/no-unnecessary-type-assertion": Array [
          "error",
        ],
        "@typescript-eslint/no-unsafe-assignment": Array [
    -     "error",
    +     "off",
        ],
        "@typescript-eslint/no-unsafe-call": Array [
    -     "error",
    +     "off",
        ],
        "@typescript-eslint/no-unsafe-member-access": Array [
    -     "error",
    +     "off",
        ],
        "@typescript-eslint/no-unsafe-return": Array [
    -     "error",
    +     "off",
        ],
        "@typescript-eslint/no-unused-expressions": Array [
          "error",
        ],
        "@typescript-eslint/no-unused-vars": Array [
    @@ --- --- @@
          Object {
            "checkCompoundAssignments": true,
          },
        ],
        "@typescript-eslint/restrict-template-expressions": Array [
    -     "error",
    +     "off",
        ],
        "@typescript-eslint/return-await": Array [
          "error",
          "in-try-catch",
        ],
    @@ --- --- @@
        "indent": Array [
          "off",
        ],
        "indent-legacy": Array [
          "off",
    +   ],
    +   "jest/expect-expect": Array [
    +     "error",
    +   ],
    +   "jest/no-alias-methods": Array [
    +     "error",
    +   ],
    +   "jest/no-commented-out-tests": Array [
    +     "error",
    +   ],
    +   "jest/no-conditional-expect": Array [
    +     "error",
    +   ],
    +   "jest/no-deprecated-functions": Array [
    +     "error",
    +   ],
    +   "jest/no-disabled-tests": Array [
    +     "error",
    +   ],
    +   "jest/no-done-callback": Array [
    +     "error",
    +   ],
    +   "jest/no-export": Array [
    +     "error",
    +   ],
    +   "jest/no-focused-tests": Array [
    +     "error",
    +   ],
    +   "jest/no-identical-title": Array [
    +     "error",
    +   ],
    +   "jest/no-interpolation-in-snapshots": Array [
    +     "error",
    +   ],
    +   "jest/no-jasmine-globals": Array [
    +     "error",
    +   ],
    +   "jest/no-jest-import": Array [
    +     "error",
    +   ],
    +   "jest/no-mocks-import": Array [
    +     "error",
    +   ],
    +   "jest/no-standalone-expect": Array [
    +     "error",
    +   ],
    +   "jest/no-test-prefixes": Array [
    +     "error",
    +   ],
    +   "jest/no-try-expect": Array [
    +     "error",
    +   ],
    +   "jest/prefer-to-be-null": Array [
    +     "error",
    +   ],
    +   "jest/prefer-to-be-undefined": Array [
    +     "error",
        ],
    +   "jest/prefer-to-contain": Array [
    +     "error",
    +   ],
    +   "jest/prefer-to-have-length": Array [
    +     "error",
    +   ],
    +   "jest/valid-describe": Array [
    +     "error",
    +   ],
    +   "jest/valid-expect": Array [
    +     "error",
    +   ],
    +   "jest/valid-expect-in-promise": Array [
    +     "error",
    +   ],
    +   "jest/valid-title": Array [
    +     "error",
    +   ],
        "jsx-quotes": Array [
          "off",
        ],
        "key-spacing": Array [
          "off",
    @@ --- --- @@
        "template-curly-spacing": Array [
          "off",
        ],
        "template-tag-spacing": Array [
          "off",
    +   ],
    +   "testing-library/await-async-query": Array [
    +     "error",
    +   ],
    +   "testing-library/await-async-utils": Array [
    +     "error",
    +   ],
    +   "testing-library/no-await-sync-query": Array [
    +     "error",
    +   ],
    +   "testing-library/no-debug": Array [
    +     "error",
    +   ],
    +   "testing-library/no-dom-import": Array [
    +     "error",
    +     "react",
    +   ],
    +   "testing-library/no-wait-for-empty-callback": Array [
    +     "error",
    +   ],
    +   "testing-library/prefer-find-by": Array [
    +     "error",
    +   ],
    +   "testing-library/prefer-presence-queries": Array [
    +     "error",
    +   ],
    +   "testing-library/prefer-wait-for": Array [
    +     "error",
        ],
        "unicode-bom": Array [
          "off",
        ],
        "use-isnan": Array [
  `);
});
