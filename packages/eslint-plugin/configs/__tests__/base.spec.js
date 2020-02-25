'use strict';

const {
  getConfigValues,
  getDevConfigDiff,
} = require('../__testutils__/test-eslint-config');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues('base');

  expect(meta).toMatchInlineSnapshot(`
    Object {
      "env": Object {},
      "globals": Object {},
      "ignorePatterns": Array [
        "coverage/",
        "node_modules/",
      ],
      "parser": null,
      "parserOptions": Object {
        "ecmaVersion": 2018,
      },
      "plugins": Array [
        "array-func",
        "@superdispatch",
        "import",
      ],
      "settings": Object {},
    }
  `);
  expect(rules).toMatchInlineSnapshot(`
    Object {
      "@superdispatch/camelcase": Array [
        "error",
      ],
      "@superdispatch/directory-name": Array [
        "error",
      ],
      "@superdispatch/filename": Array [
        "error",
      ],
      "@superdispatch/no-index-file": Array [
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
      "array-func/avoid-reverse": Array [
        "error",
      ],
      "array-func/from-map": Array [
        "error",
      ],
      "array-func/no-unnecessary-this-arg": Array [
        "error",
      ],
      "array-func/prefer-array-from": Array [
        "error",
      ],
      "array-func/prefer-flat": Array [
        "error",
      ],
      "array-func/prefer-flat-map": Array [
        "error",
      ],
      "arrow-body-style": Array [
        "error",
        "as-needed",
        Object {
          "requireReturnForObjectLiteral": false,
        },
      ],
      "arrow-parens": Array [
        "off",
      ],
      "arrow-spacing": Array [
        "off",
      ],
      "block-spacing": Array [
        "off",
      ],
      "brace-style": Array [
        "off",
      ],
      "camelcase": Array [
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
      "constructor-super": Array [
        "error",
      ],
      "curly": Array [
        "error",
        "all",
      ],
      "dot-location": Array [
        "off",
      ],
      "dot-notation": Array [
        "error",
      ],
      "eol-last": Array [
        "off",
      ],
      "eqeqeq": Array [
        "error",
        "smart",
      ],
      "for-direction": Array [
        "error",
      ],
      "func-call-spacing": Array [
        "off",
      ],
      "func-names": Array [
        "error",
        "as-needed",
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
      "getter-return": Array [
        "error",
      ],
      "implicit-arrow-linebreak": Array [
        "off",
      ],
      "import/default": Array [
        2,
      ],
      "import/export": Array [
        2,
      ],
      "import/first": Array [
        "error",
      ],
      "import/named": Array [
        2,
      ],
      "import/namespace": Array [
        2,
      ],
      "import/no-anonymous-default-export": Array [
        "error",
        Object {
          "allowAnonymousClass": false,
          "allowAnonymousFunction": false,
          "allowArray": false,
          "allowArrowFunction": false,
          "allowCallExpression": false,
          "allowLiteral": false,
          "allowObject": false,
        },
      ],
      "import/no-deprecated": Array [
        "warn",
      ],
      "import/no-duplicates": Array [
        "error",
      ],
      "import/no-mutable-exports": Array [
        "error",
      ],
      "import/no-named-as-default": Array [
        "error",
      ],
      "import/no-named-as-default-member": Array [
        "error",
      ],
      "import/no-unresolved": Array [
        2,
      ],
      "indent": Array [
        "off",
      ],
      "indent-legacy": Array [
        "off",
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
      "no-alert": Array [
        "error",
      ],
      "no-arrow-condition": Array [
        "off",
      ],
      "no-async-promise-executor": Array [
        "error",
      ],
      "no-case-declarations": Array [
        "error",
      ],
      "no-class-assign": Array [
        "error",
      ],
      "no-comma-dangle": Array [
        "off",
      ],
      "no-compare-neg-zero": Array [
        "error",
      ],
      "no-cond-assign": Array [
        "off",
      ],
      "no-confusing-arrow": Array [
        0,
      ],
      "no-console": Array [
        "error",
      ],
      "no-const-assign": Array [
        "error",
      ],
      "no-constant-condition": Array [
        "error",
      ],
      "no-control-regex": Array [
        "error",
      ],
      "no-debugger": Array [
        "error",
      ],
      "no-delete-var": Array [
        "error",
      ],
      "no-div-regex": Array [
        "error",
      ],
      "no-dupe-args": Array [
        "error",
      ],
      "no-dupe-class-members": Array [
        "error",
      ],
      "no-dupe-keys": Array [
        "error",
      ],
      "no-duplicate-case": Array [
        "error",
      ],
      "no-else-return": Array [
        "error",
      ],
      "no-empty": Array [
        "error",
        Object {
          "allowEmptyCatch": true,
        },
      ],
      "no-empty-character-class": Array [
        "error",
      ],
      "no-empty-pattern": Array [
        "error",
      ],
      "no-ex-assign": Array [
        "error",
      ],
      "no-extra-boolean-cast": Array [
        "error",
      ],
      "no-extra-parens": Array [
        "off",
      ],
      "no-extra-semi": Array [
        "off",
      ],
      "no-fallthrough": Array [
        "error",
      ],
      "no-floating-decimal": Array [
        "error",
      ],
      "no-func-assign": Array [
        "error",
      ],
      "no-global-assign": Array [
        "error",
      ],
      "no-implicit-coercion": Array [
        "error",
        Object {
          "allow": Array [
            "!!",
          ],
          "boolean": true,
          "number": true,
          "string": true,
        },
      ],
      "no-inner-declarations": Array [
        "error",
      ],
      "no-invalid-regexp": Array [
        "error",
      ],
      "no-irregular-whitespace": Array [
        "error",
      ],
      "no-lonely-if": Array [
        "error",
      ],
      "no-misleading-character-class": Array [
        "error",
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
      "no-new-symbol": Array [
        "error",
      ],
      "no-obj-calls": Array [
        "error",
      ],
      "no-octal": Array [
        "error",
      ],
      "no-prototype-builtins": Array [
        "error",
      ],
      "no-redeclare": Array [
        "error",
      ],
      "no-regex-spaces": Array [
        "error",
      ],
      "no-reserved-keys": Array [
        "off",
      ],
      "no-self-assign": Array [
        "error",
      ],
      "no-shadow": Array [
        "error",
      ],
      "no-shadow-restricted-names": Array [
        "error",
      ],
      "no-space-before-semi": Array [
        "off",
      ],
      "no-spaced-func": Array [
        "off",
      ],
      "no-sparse-arrays": Array [
        "error",
      ],
      "no-tabs": Array [
        0,
      ],
      "no-this-before-super": Array [
        "error",
      ],
      "no-trailing-spaces": Array [
        "off",
      ],
      "no-undef": Array [
        "error",
      ],
      "no-undef-init": Array [
        "error",
      ],
      "no-unexpected-multiline": Array [
        0,
      ],
      "no-unneeded-ternary": Array [
        "error",
      ],
      "no-unreachable": Array [
        "error",
      ],
      "no-unsafe-finally": Array [
        "error",
      ],
      "no-unsafe-negation": Array [
        "error",
      ],
      "no-unused-expressions": Array [
        "error",
      ],
      "no-unused-labels": Array [
        "error",
      ],
      "no-unused-vars": Array [
        "error",
      ],
      "no-use-before-define": Array [
        "error",
        Object {
          "functions": false,
        },
      ],
      "no-useless-catch": Array [
        "error",
      ],
      "no-useless-computed-key": Array [
        "error",
      ],
      "no-useless-escape": Array [
        "error",
      ],
      "no-useless-rename": Array [
        "error",
      ],
      "no-useless-return": Array [
        "error",
      ],
      "no-var": Array [
        "error",
      ],
      "no-warning-comments": Array [
        "warn",
        Object {
          "location": "anywhere",
          "terms": Array [
            "todo",
            "fixme",
          ],
        },
      ],
      "no-whitespace-before-property": Array [
        "off",
      ],
      "no-with": Array [
        "error",
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
      "object-shorthand": Array [
        "error",
        "always",
        Object {
          "avoidQuotes": true,
        },
      ],
      "one-var-declaration-per-line": Array [
        "off",
      ],
      "operator-assignment": Array [
        "error",
      ],
      "operator-linebreak": Array [
        "off",
      ],
      "padded-blocks": Array [
        "off",
      ],
      "prefer-arrow-callback": Array [
        "error",
        Object {
          "allowNamedFunctions": false,
          "allowUnboundThis": true,
        },
      ],
      "prefer-const": Array [
        "off",
      ],
      "prefer-destructuring": Array [
        "error",
        Object {
          "AssignmentExpression": Object {
            "array": false,
            "object": false,
          },
          "VariableDeclarator": Object {
            "array": true,
            "object": true,
          },
        },
        Object {
          "enforceForRenamedProperties": false,
        },
      ],
      "prefer-numeric-literals": Array [
        "error",
      ],
      "prefer-object-spread": Array [
        "error",
      ],
      "prefer-template": Array [
        "error",
      ],
      "quote-props": Array [
        "off",
      ],
      "quotes": Array [
        "error",
        "single",
        Object {
          "allowTemplateLiterals": false,
          "avoidEscape": true,
        },
      ],
      "require-yield": Array [
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
      "use-isnan": Array [
        "error",
      ],
      "valid-typeof": Array [
        "error",
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
      "yoda": Array [
        "error",
        "never",
        Object {
          "exceptRange": true,
          "onlyEquality": false,
        },
      ],
    }
  `);
});

it('changes in dev mode', async () => {
  const rules = await getDevConfigDiff('base');

  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
        "@superdispatch/camelcase": Array [
    -     "error",
    +     "warn",
        ],
        "@superdispatch/directory-name": Array [
    -     "error",
    +     "warn",
        ],
        "@superdispatch/filename": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "arrow-body-style": Array [
    -     "error",
    +     "warn",
          "as-needed",
    @@ --- --- @@
        "curly": Array [
    -     "error",
    +     "warn",
          "all",
    @@ --- --- @@
        "dot-notation": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "func-names": Array [
    -     "error",
    +     "warn",
          "as-needed",
    @@ --- --- @@
        "import/first": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "import/no-anonymous-default-export": Array [
    -     "error",
    +     "warn",
          Object {
    @@ --- --- @@
        "import/no-deprecated": Array [
    -     "warn",
    +     "off",
        ],
        "import/no-duplicates": Array [
    -     "error",
    +     "warn",
        ],
        "import/no-mutable-exports": Array [
    -     "error",
    +     "warn",
        ],
        "import/no-named-as-default": Array [
    -     "error",
    +     "warn",
        ],
        "import/no-named-as-default-member": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-alert": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-console": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-div-regex": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-else-return": Array [
    -     "error",
    +     "warn",
        ],
        "no-empty": Array [
    -     "error",
    +     "warn",
          Object {
    @@ --- --- @@
        "no-floating-decimal": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-implicit-coercion": Array [
    -     "error",
    +     "warn",
          Object {
    @@ --- --- @@
        "no-lonely-if": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-shadow": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-undef-init": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-unneeded-ternary": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-unused-expressions": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-useless-computed-key": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "no-useless-rename": Array [
    -     "error",
    +     "warn",
        ],
        "no-useless-return": Array [
    -     "error",
    +     "warn",
        ],
        "no-var": Array [
    -     "error",
    +     "warn",
        ],
        "no-warning-comments": Array [
    -     "warn",
    +     "off",
          Object {
    @@ --- --- @@
        "object-shorthand": Array [
    -     "error",
    +     "warn",
          "always",
    @@ --- --- @@
        "operator-assignment": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "prefer-arrow-callback": Array [
    -     "error",
    +     "warn",
          Object {
    @@ --- --- @@
        "prefer-destructuring": Array [
    -     "error",
    +     "warn",
          Object {
    @@ --- --- @@
        "prefer-numeric-literals": Array [
    -     "error",
    +     "warn",
        ],
        "prefer-object-spread": Array [
    -     "error",
    +     "warn",
        ],
        "prefer-template": Array [
    -     "error",
    +     "warn",
        ],
    @@ --- --- @@
        "quotes": Array [
    -     "error",
    +     "warn",
          "single",
    @@ --- --- @@
        "yoda": Array [
    -     "error",
    +     "warn",
          "never",
  `);
});
