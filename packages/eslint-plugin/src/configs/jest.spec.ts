'use strict';

import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('base'),
    await getConfigData('jest'),
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
        "parser": undefined,
        "parserOptions": Object {
          "ecmaVersion": 2020,
        },
        "plugins": Array [
          "import",
    +     "jest",
    +     "testing-library",
          "eslint-comments",
          "@superdispatch",
          "array-func",
        ],
        "settings": Object {},
  `);
  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          "off",
        ],
        "indent-legacy": Array [
          "off",
        ],
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
    +   ],
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
        ],
        "quotes": Array [
          "error",
          "single",
          Object {
    -       "allowTemplateLiterals": false,
    +       "allowTemplateLiterals": true,
            "avoidEscape": true,
          },
        ],
        "require-yield": Array [
          "error",
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
