'use strict';

import { getConfigData } from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigData('react');

  expect(meta).toMatchInlineSnapshot(`
    Object {
      "env": Object {
        "browser": true,
      },
      "globals": Object {},
      "parser": undefined,
      "parserOptions": Object {
        "ecmaFeatures": Object {
          "jsx": true,
        },
      },
      "plugins": Array [
        "@superdispatch",
        "jsx-a11y",
        "react-hooks",
        "react",
      ],
      "settings": Object {},
    }
  `);
  expect(rules).toMatchInlineSnapshot(`
    Object {
      "@superdispatch/jsx-no-spread-object-expression": Array [
        "error",
      ],
      "jsx-a11y/accessible-emoji": Array [
        "error",
      ],
      "jsx-a11y/aria-activedescendant-has-tabindex": Array [
        "error",
      ],
      "jsx-a11y/aria-props": Array [
        "error",
      ],
      "jsx-a11y/aria-proptypes": Array [
        "error",
      ],
      "jsx-a11y/aria-role": Array [
        "error",
        Object {
          "ignoreNonDOM": true,
        },
      ],
      "jsx-a11y/no-access-key": Array [
        "error",
      ],
      "jsx-a11y/no-redundant-roles": Array [
        "error",
      ],
      "jsx-a11y/role-has-required-aria-props": Array [
        "error",
      ],
      "jsx-a11y/role-supports-aria-props": Array [
        "error",
      ],
      "jsx-a11y/scope": Array [
        "error",
      ],
      "jsx-a11y/tabindex-no-positive": Array [
        "error",
      ],
      "react-hooks/exhaustive-deps": Array [
        "error",
      ],
      "react-hooks/rules-of-hooks": Array [
        "error",
      ],
      "react/display-name": Array [
        2,
      ],
      "react/jsx-boolean-value": Array [
        "error",
        "always",
      ],
      "react/jsx-child-element-spacing": Array [
        "off",
      ],
      "react/jsx-closing-bracket-location": Array [
        "off",
      ],
      "react/jsx-closing-tag-location": Array [
        "off",
      ],
      "react/jsx-curly-brace-presence": Array [
        "error",
        Object {
          "children": "never",
          "props": "never",
        },
      ],
      "react/jsx-curly-newline": Array [
        "off",
      ],
      "react/jsx-curly-spacing": Array [
        "off",
      ],
      "react/jsx-equals-spacing": Array [
        "off",
      ],
      "react/jsx-first-prop-new-line": Array [
        "off",
      ],
      "react/jsx-fragments": Array [
        "error",
        "syntax",
      ],
      "react/jsx-indent": Array [
        "off",
      ],
      "react/jsx-indent-props": Array [
        "off",
      ],
      "react/jsx-key": Array [
        2,
      ],
      "react/jsx-max-props-per-line": Array [
        "off",
      ],
      "react/jsx-no-comment-textnodes": Array [
        2,
      ],
      "react/jsx-no-duplicate-props": Array [
        2,
      ],
      "react/jsx-no-target-blank": Array [
        2,
      ],
      "react/jsx-no-undef": Array [
        2,
      ],
      "react/jsx-no-useless-fragment": Array [
        "error",
      ],
      "react/jsx-one-expression-per-line": Array [
        "off",
      ],
      "react/jsx-props-no-multi-spaces": Array [
        "off",
      ],
      "react/jsx-space-before-closing": Array [
        "off",
      ],
      "react/jsx-tag-spacing": Array [
        "off",
      ],
      "react/jsx-uses-react": Array [
        2,
      ],
      "react/jsx-uses-vars": Array [
        2,
      ],
      "react/jsx-wrap-multilines": Array [
        "off",
      ],
      "react/no-children-prop": Array [
        2,
      ],
      "react/no-danger-with-children": Array [
        "error",
      ],
      "react/no-deprecated": Array [
        2,
      ],
      "react/no-direct-mutation-state": Array [
        2,
      ],
      "react/no-find-dom-node": Array [
        2,
      ],
      "react/no-is-mounted": Array [
        2,
      ],
      "react/no-render-return-value": Array [
        2,
      ],
      "react/no-string-refs": Array [
        2,
      ],
      "react/no-unescaped-entities": Array [
        2,
      ],
      "react/no-unknown-property": Array [
        2,
      ],
      "react/no-unsafe": Array [
        0,
      ],
      "react/prop-types": Array [
        "off",
      ],
      "react/react-in-jsx-scope": Array [
        2,
      ],
      "react/require-render-return": Array [
        2,
      ],
      "react/self-closing-comp": Array [
        "error",
      ],
    }
  `);
});
