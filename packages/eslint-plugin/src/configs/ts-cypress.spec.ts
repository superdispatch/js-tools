'use strict';

import { getConfigData } from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigData('ts-cypress');

  expect(meta).toMatchInlineSnapshot(`
    Object {
      "env": Object {
        "cypress/globals": true,
        "jest/globals": true,
      },
      "globals": Object {},
      "parser": undefined,
      "parserOptions": Object {},
      "plugins": Array [
        "jest",
        "testing-library",
        "cypress",
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
      "cypress/no-assigning-return-values": Array [
        "error",
      ],
      "cypress/no-async-tests": Array [
        "error",
      ],
      "cypress/no-unnecessary-waiting": Array [
        "error",
      ],
      "import/no-extraneous-dependencies": Array [
        "off",
      ],
      "jest/expect-expect": Array [
        "off",
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
        "off",
      ],
      "jest/valid-expect-in-promise": Array [
        "off",
      ],
      "jest/valid-title": Array [
        "error",
      ],
      "no-restricted-properties": Array [
        "error",
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByAltText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByDisplayValue",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByLabelText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByPlaceholderText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByRole",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByTestId",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryByTitle",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByAltText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByDisplayValue",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByLabelText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByPlaceholderText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByRole",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByTestId",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByText",
        },
        Object {
          "message": "Deprecated method. Throws an error instead. Fixing requires updating all query* to find* queries. see https://github.com/testing-library/cypress-testing-library/pull/130",
          "object": "cy",
          "property": "queryAllByTitle",
        },
      ],
      "quotes": Array [
        "error",
        "single",
        Object {
          "allowTemplateLiterals": true,
          "avoidEscape": true,
        },
      ],
      "testing-library/await-async-query": Array [
        "off",
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
        "off",
      ],
    }
  `);
});
