'use strict';

const { getConfigValues, getDevConfigDiff } = require('../__testutils__/test-eslint-config');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues('jest');

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
      ],
      "settings": Object {},
    }
  `);
  expect(rules).toMatchInlineSnapshot(`
    Object {
      "import/no-extraneous-dependencies": Array [
        "error",
        Object {
          "devDependencies": true,
          "peerDependencies": true,
        },
      ],
      "jest/expect-expect": Array [
        "warn",
      ],
      "jest/no-alias-methods": Array [
        "error",
      ],
      "jest/no-commented-out-tests": Array [
        "warn",
      ],
      "jest/no-disabled-tests": Array [
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
      "jest/no-test-callback": Array [
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
    }
  `);
});

it('not changes in dev mode', async () => {
  const rules = await getDevConfigDiff('jest');

  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);
});
