'use strict';

const { getConfigValues } = require('../__testutils__/test-eslint-config');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues('ts-jest');

  expect(meta).toMatchInlineSnapshot(`
    Object {
      "env": Object {
        "jest": true,
        "jest/globals": true,
      },
      "globals": Object {},
      "parser": null,
      "parserOptions": Object {},
      "plugins": Array [
        "jest",
        "testing-library",
      ],
      "settings": Object {},
    }
  `);
  expect(rules).toMatchInlineSnapshot(`
    Object {
      "@typescript-eslint/no-explicit-any": Array [
        "off",
      ],
      "@typescript-eslint/no-non-null-assertion": Array [
        "off",
      ],
      "@typescript-eslint/no-unsafe-assignment": Array [
        "off",
      ],
      "@typescript-eslint/no-unsafe-call": Array [
        "off",
      ],
      "import/no-extraneous-dependencies": Array [
        "error",
        Object {
          "devDependencies": true,
          "peerDependencies": true,
        },
      ],
      "jest/expect-expect": Array [
        "error",
      ],
      "jest/no-alias-methods": Array [
        "error",
      ],
      "jest/no-commented-out-tests": Array [
        "error",
      ],
      "jest/no-conditional-expect": Array [
        "error",
      ],
      "jest/no-deprecated-functions": Array [
        "error",
      ],
      "jest/no-disabled-tests": Array [
        "error",
      ],
      "jest/no-done-callback": Array [
        "error",
      ],
      "jest/no-export": Array [
        "error",
      ],
      "jest/no-focused-tests": Array [
        "error",
      ],
      "jest/no-identical-title": Array [
        "error",
      ],
      "jest/no-interpolation-in-snapshots": Array [
        "error",
      ],
      "jest/no-jasmine-globals": Array [
        "error",
      ],
      "jest/no-jest-import": Array [
        "error",
      ],
      "jest/no-mocks-import": Array [
        "error",
      ],
      "jest/no-standalone-expect": Array [
        "error",
      ],
      "jest/no-test-prefixes": Array [
        "error",
      ],
      "jest/no-try-expect": Array [
        "error",
      ],
      "jest/prefer-to-be-null": Array [
        "error",
      ],
      "jest/prefer-to-be-undefined": Array [
        "error",
      ],
      "jest/prefer-to-contain": Array [
        "error",
      ],
      "jest/prefer-to-have-length": Array [
        "error",
      ],
      "jest/valid-describe": Array [
        "error",
      ],
      "jest/valid-expect": Array [
        "error",
      ],
      "jest/valid-expect-in-promise": Array [
        "error",
      ],
      "jest/valid-title": Array [
        "error",
      ],
      "testing-library/await-async-query": Array [
        "error",
      ],
      "testing-library/await-async-utils": Array [
        "error",
      ],
      "testing-library/no-await-sync-query": Array [
        "error",
      ],
      "testing-library/no-debug": Array [
        "error",
      ],
      "testing-library/no-dom-import": Array [
        "error",
        "react",
      ],
      "testing-library/no-wait-for-empty-callback": Array [
        "error",
      ],
      "testing-library/prefer-find-by": Array [
        "error",
      ],
      "testing-library/prefer-presence-queries": Array [
        "error",
      ],
      "testing-library/prefer-wait-for": Array [
        "error",
      ],
    }
  `);
});
