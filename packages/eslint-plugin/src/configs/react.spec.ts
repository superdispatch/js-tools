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
  "@babel/object-curly-spacing": Array [
    "off",
  ],
  "@babel/semi": Array [
    "off",
  ],
  "@superdispatch/jsx-no-spread-object-expression": Array [
    "error",
  ],
  "@typescript-eslint/brace-style": Array [
    "off",
  ],
  "@typescript-eslint/comma-dangle": Array [
    "off",
  ],
  "@typescript-eslint/comma-spacing": Array [
    "off",
  ],
  "@typescript-eslint/func-call-spacing": Array [
    "off",
  ],
  "@typescript-eslint/indent": Array [
    "off",
  ],
  "@typescript-eslint/keyword-spacing": Array [
    "off",
  ],
  "@typescript-eslint/member-delimiter-style": Array [
    "off",
  ],
  "@typescript-eslint/no-extra-parens": Array [
    "off",
  ],
  "@typescript-eslint/no-extra-semi": Array [
    "off",
  ],
  "@typescript-eslint/object-curly-spacing": Array [
    "off",
  ],
  "@typescript-eslint/quotes": Array [
    0,
  ],
  "@typescript-eslint/semi": Array [
    "off",
  ],
  "@typescript-eslint/space-before-function-paren": Array [
    "off",
  ],
  "@typescript-eslint/space-infix-ops": Array [
    "off",
  ],
  "@typescript-eslint/type-annotation-spacing": Array [
    "off",
  ],
  "array-bracket-newline": Array [
    "off",
  ],
  "array-bracket-spacing": Array [
    "off",
  ],
  "array-element-newline": Array [
    "off",
  ],
  "arrow-parens": Array [
    "off",
  ],
  "arrow-spacing": Array [
    "off",
  ],
  "babel/object-curly-spacing": Array [
    "off",
  ],
  "babel/quotes": Array [
    0,
  ],
  "babel/semi": Array [
    "off",
  ],
  "block-spacing": Array [
    "off",
  ],
  "brace-style": Array [
    "off",
  ],
  "comma-dangle": Array [
    "off",
  ],
  "comma-spacing": Array [
    "off",
  ],
  "comma-style": Array [
    "off",
  ],
  "computed-property-spacing": Array [
    "off",
  ],
  "curly": Array [
    0,
  ],
  "dot-location": Array [
    "off",
  ],
  "eol-last": Array [
    "off",
  ],
  "flowtype/boolean-style": Array [
    "off",
  ],
  "flowtype/delimiter-dangle": Array [
    "off",
  ],
  "flowtype/generic-spacing": Array [
    "off",
  ],
  "flowtype/object-type-curly-spacing": Array [
    "off",
  ],
  "flowtype/object-type-delimiter": Array [
    "off",
  ],
  "flowtype/quotes": Array [
    "off",
  ],
  "flowtype/semi": Array [
    "off",
  ],
  "flowtype/space-after-type-colon": Array [
    "off",
  ],
  "flowtype/space-before-generic-bracket": Array [
    "off",
  ],
  "flowtype/space-before-type-colon": Array [
    "off",
  ],
  "flowtype/union-intersection-spacing": Array [
    "off",
  ],
  "func-call-spacing": Array [
    "off",
  ],
  "function-call-argument-newline": Array [
    "off",
  ],
  "function-paren-newline": Array [
    "off",
  ],
  "generator-star": Array [
    "off",
  ],
  "generator-star-spacing": Array [
    "off",
  ],
  "implicit-arrow-linebreak": Array [
    "off",
  ],
  "indent": Array [
    "off",
  ],
  "indent-legacy": Array [
    "off",
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
  "jsx-quotes": Array [
    "off",
  ],
  "key-spacing": Array [
    "off",
  ],
  "keyword-spacing": Array [
    "off",
  ],
  "linebreak-style": Array [
    "off",
  ],
  "lines-around-comment": Array [
    0,
  ],
  "max-len": Array [
    0,
  ],
  "multiline-ternary": Array [
    "off",
  ],
  "new-parens": Array [
    "off",
  ],
  "newline-per-chained-call": Array [
    "off",
  ],
  "no-arrow-condition": Array [
    "off",
  ],
  "no-comma-dangle": Array [
    "off",
  ],
  "no-confusing-arrow": Array [
    0,
  ],
  "no-extra-parens": Array [
    "off",
  ],
  "no-extra-semi": Array [
    "off",
  ],
  "no-floating-decimal": Array [
    "off",
  ],
  "no-mixed-operators": Array [
    0,
  ],
  "no-mixed-spaces-and-tabs": Array [
    "off",
  ],
  "no-multi-spaces": Array [
    "off",
  ],
  "no-multiple-empty-lines": Array [
    "off",
  ],
  "no-reserved-keys": Array [
    "off",
  ],
  "no-space-before-semi": Array [
    "off",
  ],
  "no-spaced-func": Array [
    "off",
  ],
  "no-tabs": Array [
    0,
  ],
  "no-trailing-spaces": Array [
    "off",
  ],
  "no-unexpected-multiline": Array [
    0,
  ],
  "no-whitespace-before-property": Array [
    "off",
  ],
  "no-wrap-func": Array [
    "off",
  ],
  "nonblock-statement-body-position": Array [
    "off",
  ],
  "object-curly-newline": Array [
    "off",
  ],
  "object-curly-spacing": Array [
    "off",
  ],
  "object-property-newline": Array [
    "off",
  ],
  "one-var-declaration-per-line": Array [
    "off",
  ],
  "operator-linebreak": Array [
    "off",
  ],
  "padded-blocks": Array [
    "off",
  ],
  "quote-props": Array [
    "off",
  ],
  "quotes": Array [
    0,
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
  "react/jsx-newline": Array [
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
  "rest-spread-spacing": Array [
    "off",
  ],
  "semi": Array [
    "off",
  ],
  "semi-spacing": Array [
    "off",
  ],
  "semi-style": Array [
    "off",
  ],
  "space-after-function-name": Array [
    "off",
  ],
  "space-after-keywords": Array [
    "off",
  ],
  "space-before-blocks": Array [
    "off",
  ],
  "space-before-function-paren": Array [
    "off",
  ],
  "space-before-function-parentheses": Array [
    "off",
  ],
  "space-before-keywords": Array [
    "off",
  ],
  "space-in-brackets": Array [
    "off",
  ],
  "space-in-parens": Array [
    "off",
  ],
  "space-infix-ops": Array [
    "off",
  ],
  "space-return-throw-case": Array [
    "off",
  ],
  "space-unary-ops": Array [
    "off",
  ],
  "space-unary-word-ops": Array [
    "off",
  ],
  "standard/array-bracket-even-spacing": Array [
    "off",
  ],
  "standard/computed-property-even-spacing": Array [
    "off",
  ],
  "standard/object-curly-even-spacing": Array [
    "off",
  ],
  "switch-colon-spacing": Array [
    "off",
  ],
  "template-curly-spacing": Array [
    "off",
  ],
  "template-tag-spacing": Array [
    "off",
  ],
  "unicode-bom": Array [
    "off",
  ],
  "unicorn/empty-brace-spaces": Array [
    "off",
  ],
  "unicorn/no-nested-ternary": Array [
    "off",
  ],
  "unicorn/number-literal-case": Array [
    "off",
  ],
  "vue/array-bracket-newline": Array [
    "off",
  ],
  "vue/array-bracket-spacing": Array [
    "off",
  ],
  "vue/arrow-spacing": Array [
    "off",
  ],
  "vue/block-spacing": Array [
    "off",
  ],
  "vue/block-tag-newline": Array [
    "off",
  ],
  "vue/brace-style": Array [
    "off",
  ],
  "vue/comma-dangle": Array [
    "off",
  ],
  "vue/comma-spacing": Array [
    "off",
  ],
  "vue/comma-style": Array [
    "off",
  ],
  "vue/dot-location": Array [
    "off",
  ],
  "vue/func-call-spacing": Array [
    "off",
  ],
  "vue/html-closing-bracket-newline": Array [
    "off",
  ],
  "vue/html-closing-bracket-spacing": Array [
    "off",
  ],
  "vue/html-end-tags": Array [
    "off",
  ],
  "vue/html-indent": Array [
    "off",
  ],
  "vue/html-quotes": Array [
    "off",
  ],
  "vue/html-self-closing": Array [
    0,
  ],
  "vue/key-spacing": Array [
    "off",
  ],
  "vue/keyword-spacing": Array [
    "off",
  ],
  "vue/max-attributes-per-line": Array [
    "off",
  ],
  "vue/max-len": Array [
    0,
  ],
  "vue/multiline-html-element-content-newline": Array [
    "off",
  ],
  "vue/mustache-interpolation-spacing": Array [
    "off",
  ],
  "vue/no-extra-parens": Array [
    "off",
  ],
  "vue/no-multi-spaces": Array [
    "off",
  ],
  "vue/no-spaces-around-equal-signs-in-attribute": Array [
    "off",
  ],
  "vue/object-curly-newline": Array [
    "off",
  ],
  "vue/object-curly-spacing": Array [
    "off",
  ],
  "vue/object-property-newline": Array [
    "off",
  ],
  "vue/operator-linebreak": Array [
    "off",
  ],
  "vue/script-indent": Array [
    "off",
  ],
  "vue/singleline-html-element-content-newline": Array [
    "off",
  ],
  "vue/space-in-parens": Array [
    "off",
  ],
  "vue/space-infix-ops": Array [
    "off",
  ],
  "vue/space-unary-ops": Array [
    "off",
  ],
  "vue/template-curly-spacing": Array [
    "off",
  ],
  "wrap-iife": Array [
    "off",
  ],
  "wrap-regex": Array [
    "off",
  ],
  "yield-star-spacing": Array [
    "off",
  ],
}
`);
});
