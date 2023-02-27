import { getConfigData } from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigData('react');

  expect(meta).toMatchInlineSnapshot(`
    {
      "env": {
        "browser": true,
      },
      "globals": {},
      "parser": undefined,
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true,
        },
      },
      "plugins": [
        "@superdispatch",
        "jsx-a11y",
        "react-hooks",
        "react",
      ],
      "settings": {},
    }
  `);
  expect(rules).toMatchInlineSnapshot(`
{
  "@babel/object-curly-spacing": [
    "off",
  ],
  "@babel/semi": [
    "off",
  ],
  "@superdispatch/jsx-no-spread-object-expression": [
    "error",
  ],
  "@typescript-eslint/brace-style": [
    "off",
  ],
  "@typescript-eslint/comma-dangle": [
    "off",
  ],
  "@typescript-eslint/comma-spacing": [
    "off",
  ],
  "@typescript-eslint/func-call-spacing": [
    "off",
  ],
  "@typescript-eslint/indent": [
    "off",
  ],
  "@typescript-eslint/keyword-spacing": [
    "off",
  ],
  "@typescript-eslint/member-delimiter-style": [
    "off",
  ],
  "@typescript-eslint/no-extra-parens": [
    "off",
  ],
  "@typescript-eslint/no-extra-semi": [
    "off",
  ],
  "@typescript-eslint/object-curly-spacing": [
    "off",
  ],
  "@typescript-eslint/quotes": [
    0,
  ],
  "@typescript-eslint/semi": [
    "off",
  ],
  "@typescript-eslint/space-before-function-paren": [
    "off",
  ],
  "@typescript-eslint/space-infix-ops": [
    "off",
  ],
  "@typescript-eslint/type-annotation-spacing": [
    "off",
  ],
  "array-bracket-newline": [
    "off",
  ],
  "array-bracket-spacing": [
    "off",
  ],
  "array-element-newline": [
    "off",
  ],
  "arrow-parens": [
    "off",
  ],
  "arrow-spacing": [
    "off",
  ],
  "babel/object-curly-spacing": [
    "off",
  ],
  "babel/quotes": [
    0,
  ],
  "babel/semi": [
    "off",
  ],
  "block-spacing": [
    "off",
  ],
  "brace-style": [
    "off",
  ],
  "comma-dangle": [
    "off",
  ],
  "comma-spacing": [
    "off",
  ],
  "comma-style": [
    "off",
  ],
  "computed-property-spacing": [
    "off",
  ],
  "curly": [
    0,
  ],
  "dot-location": [
    "off",
  ],
  "eol-last": [
    "off",
  ],
  "flowtype/boolean-style": [
    "off",
  ],
  "flowtype/delimiter-dangle": [
    "off",
  ],
  "flowtype/generic-spacing": [
    "off",
  ],
  "flowtype/object-type-curly-spacing": [
    "off",
  ],
  "flowtype/object-type-delimiter": [
    "off",
  ],
  "flowtype/quotes": [
    "off",
  ],
  "flowtype/semi": [
    "off",
  ],
  "flowtype/space-after-type-colon": [
    "off",
  ],
  "flowtype/space-before-generic-bracket": [
    "off",
  ],
  "flowtype/space-before-type-colon": [
    "off",
  ],
  "flowtype/union-intersection-spacing": [
    "off",
  ],
  "func-call-spacing": [
    "off",
  ],
  "function-call-argument-newline": [
    "off",
  ],
  "function-paren-newline": [
    "off",
  ],
  "generator-star": [
    "off",
  ],
  "generator-star-spacing": [
    "off",
  ],
  "implicit-arrow-linebreak": [
    "off",
  ],
  "indent": [
    "off",
  ],
  "indent-legacy": [
    "off",
  ],
  "jsx-a11y/accessible-emoji": [
    "error",
  ],
  "jsx-a11y/aria-activedescendant-has-tabindex": [
    "error",
  ],
  "jsx-a11y/aria-props": [
    "error",
  ],
  "jsx-a11y/aria-proptypes": [
    "error",
  ],
  "jsx-a11y/aria-role": [
    "error",
    {
      "ignoreNonDOM": true,
    },
  ],
  "jsx-a11y/no-access-key": [
    "error",
  ],
  "jsx-a11y/no-redundant-roles": [
    "error",
  ],
  "jsx-a11y/role-has-required-aria-props": [
    "error",
  ],
  "jsx-a11y/role-supports-aria-props": [
    "error",
  ],
  "jsx-a11y/scope": [
    "error",
  ],
  "jsx-a11y/tabindex-no-positive": [
    "error",
  ],
  "jsx-quotes": [
    "off",
  ],
  "key-spacing": [
    "off",
  ],
  "keyword-spacing": [
    "off",
  ],
  "linebreak-style": [
    "off",
  ],
  "lines-around-comment": [
    0,
  ],
  "max-len": [
    0,
  ],
  "multiline-ternary": [
    "off",
  ],
  "new-parens": [
    "off",
  ],
  "newline-per-chained-call": [
    "off",
  ],
  "no-arrow-condition": [
    "off",
  ],
  "no-comma-dangle": [
    "off",
  ],
  "no-confusing-arrow": [
    0,
  ],
  "no-extra-parens": [
    "off",
  ],
  "no-extra-semi": [
    "off",
  ],
  "no-floating-decimal": [
    "off",
  ],
  "no-mixed-operators": [
    0,
  ],
  "no-mixed-spaces-and-tabs": [
    "off",
  ],
  "no-multi-spaces": [
    "off",
  ],
  "no-multiple-empty-lines": [
    "off",
  ],
  "no-reserved-keys": [
    "off",
  ],
  "no-space-before-semi": [
    "off",
  ],
  "no-spaced-func": [
    "off",
  ],
  "no-tabs": [
    0,
  ],
  "no-trailing-spaces": [
    "off",
  ],
  "no-unexpected-multiline": [
    0,
  ],
  "no-whitespace-before-property": [
    "off",
  ],
  "no-wrap-func": [
    "off",
  ],
  "nonblock-statement-body-position": [
    "off",
  ],
  "object-curly-newline": [
    "off",
  ],
  "object-curly-spacing": [
    "off",
  ],
  "object-property-newline": [
    "off",
  ],
  "one-var-declaration-per-line": [
    "off",
  ],
  "operator-linebreak": [
    "off",
  ],
  "padded-blocks": [
    "off",
  ],
  "quote-props": [
    "off",
  ],
  "quotes": [
    0,
  ],
  "react-hooks/exhaustive-deps": [
    "error",
  ],
  "react-hooks/rules-of-hooks": [
    "error",
  ],
  "react/display-name": [
    2,
  ],
  "react/jsx-boolean-value": [
    "error",
    "always",
  ],
  "react/jsx-child-element-spacing": [
    "off",
  ],
  "react/jsx-closing-bracket-location": [
    "off",
  ],
  "react/jsx-closing-tag-location": [
    "off",
  ],
  "react/jsx-curly-brace-presence": [
    "error",
    {
      "children": "never",
      "props": "never",
    },
  ],
  "react/jsx-curly-newline": [
    "off",
  ],
  "react/jsx-curly-spacing": [
    "off",
  ],
  "react/jsx-equals-spacing": [
    "off",
  ],
  "react/jsx-first-prop-new-line": [
    "off",
  ],
  "react/jsx-fragments": [
    "error",
    "syntax",
  ],
  "react/jsx-indent": [
    "off",
  ],
  "react/jsx-indent-props": [
    "off",
  ],
  "react/jsx-key": [
    2,
  ],
  "react/jsx-max-props-per-line": [
    "off",
  ],
  "react/jsx-newline": [
    "off",
  ],
  "react/jsx-no-comment-textnodes": [
    2,
  ],
  "react/jsx-no-duplicate-props": [
    2,
  ],
  "react/jsx-no-target-blank": [
    2,
  ],
  "react/jsx-no-undef": [
    2,
  ],
  "react/jsx-no-useless-fragment": [
    "error",
  ],
  "react/jsx-one-expression-per-line": [
    "off",
  ],
  "react/jsx-props-no-multi-spaces": [
    "off",
  ],
  "react/jsx-space-before-closing": [
    "off",
  ],
  "react/jsx-tag-spacing": [
    "off",
  ],
  "react/jsx-uses-react": [
    2,
  ],
  "react/jsx-uses-vars": [
    2,
  ],
  "react/jsx-wrap-multilines": [
    "off",
  ],
  "react/no-children-prop": [
    2,
  ],
  "react/no-danger-with-children": [
    "error",
  ],
  "react/no-deprecated": [
    2,
  ],
  "react/no-direct-mutation-state": [
    2,
  ],
  "react/no-find-dom-node": [
    2,
  ],
  "react/no-is-mounted": [
    2,
  ],
  "react/no-render-return-value": [
    2,
  ],
  "react/no-string-refs": [
    2,
  ],
  "react/no-unescaped-entities": [
    2,
  ],
  "react/no-unknown-property": [
    2,
  ],
  "react/no-unsafe": [
    0,
  ],
  "react/prop-types": [
    "off",
  ],
  "react/react-in-jsx-scope": [
    2,
  ],
  "react/require-render-return": [
    2,
  ],
  "react/self-closing-comp": [
    "error",
  ],
  "rest-spread-spacing": [
    "off",
  ],
  "semi": [
    "off",
  ],
  "semi-spacing": [
    "off",
  ],
  "semi-style": [
    "off",
  ],
  "space-after-function-name": [
    "off",
  ],
  "space-after-keywords": [
    "off",
  ],
  "space-before-blocks": [
    "off",
  ],
  "space-before-function-paren": [
    "off",
  ],
  "space-before-function-parentheses": [
    "off",
  ],
  "space-before-keywords": [
    "off",
  ],
  "space-in-brackets": [
    "off",
  ],
  "space-in-parens": [
    "off",
  ],
  "space-infix-ops": [
    "off",
  ],
  "space-return-throw-case": [
    "off",
  ],
  "space-unary-ops": [
    "off",
  ],
  "space-unary-word-ops": [
    "off",
  ],
  "standard/array-bracket-even-spacing": [
    "off",
  ],
  "standard/computed-property-even-spacing": [
    "off",
  ],
  "standard/object-curly-even-spacing": [
    "off",
  ],
  "switch-colon-spacing": [
    "off",
  ],
  "template-curly-spacing": [
    "off",
  ],
  "template-tag-spacing": [
    "off",
  ],
  "unicode-bom": [
    "off",
  ],
  "unicorn/empty-brace-spaces": [
    "off",
  ],
  "unicorn/no-nested-ternary": [
    "off",
  ],
  "unicorn/number-literal-case": [
    "off",
  ],
  "vue/array-bracket-newline": [
    "off",
  ],
  "vue/array-bracket-spacing": [
    "off",
  ],
  "vue/arrow-spacing": [
    "off",
  ],
  "vue/block-spacing": [
    "off",
  ],
  "vue/block-tag-newline": [
    "off",
  ],
  "vue/brace-style": [
    "off",
  ],
  "vue/comma-dangle": [
    "off",
  ],
  "vue/comma-spacing": [
    "off",
  ],
  "vue/comma-style": [
    "off",
  ],
  "vue/dot-location": [
    "off",
  ],
  "vue/func-call-spacing": [
    "off",
  ],
  "vue/html-closing-bracket-newline": [
    "off",
  ],
  "vue/html-closing-bracket-spacing": [
    "off",
  ],
  "vue/html-end-tags": [
    "off",
  ],
  "vue/html-indent": [
    "off",
  ],
  "vue/html-quotes": [
    "off",
  ],
  "vue/html-self-closing": [
    0,
  ],
  "vue/key-spacing": [
    "off",
  ],
  "vue/keyword-spacing": [
    "off",
  ],
  "vue/max-attributes-per-line": [
    "off",
  ],
  "vue/max-len": [
    0,
  ],
  "vue/multiline-html-element-content-newline": [
    "off",
  ],
  "vue/mustache-interpolation-spacing": [
    "off",
  ],
  "vue/no-extra-parens": [
    "off",
  ],
  "vue/no-multi-spaces": [
    "off",
  ],
  "vue/no-spaces-around-equal-signs-in-attribute": [
    "off",
  ],
  "vue/object-curly-newline": [
    "off",
  ],
  "vue/object-curly-spacing": [
    "off",
  ],
  "vue/object-property-newline": [
    "off",
  ],
  "vue/operator-linebreak": [
    "off",
  ],
  "vue/script-indent": [
    "off",
  ],
  "vue/singleline-html-element-content-newline": [
    "off",
  ],
  "vue/space-in-parens": [
    "off",
  ],
  "vue/space-infix-ops": [
    "off",
  ],
  "vue/space-unary-ops": [
    "off",
  ],
  "vue/template-curly-spacing": [
    "off",
  ],
  "wrap-iife": [
    "off",
  ],
  "wrap-regex": [
    "off",
  ],
  "yield-star-spacing": [
    "off",
  ],
}
`);
});
