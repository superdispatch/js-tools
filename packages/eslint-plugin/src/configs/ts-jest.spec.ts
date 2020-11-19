'use strict';

import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

test('diff with jest', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('jest'),
    await getConfigData('ts-jest'),
  );

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          "root": "readonly",
          "setImmediate": "readonly",
          "setInterval": "readonly",
          "setTimeout": "readonly",
        },
    -   "parser": undefined,
    +   "parser": "node_modules/@typescript-eslint/parser/dist/index.js",
        "parserOptions": Object {
          "ecmaFeatures": Object {
            "globalReturn": true,
          },
          "ecmaVersion": 2020,
    -     "sourceType": "script",
    +     "sourceType": "module",
        },
        "plugins": Array [
          "import",
          "node",
    +     "@typescript-eslint",
          "jest",
          "testing-library",
    +     "simple-import-sort",
          "eslint-comments",
          "array-func",
        ],
    -   "settings": Object {},
    +   "settings": Object {
    +     "import/extensions": Array [
    +       ".ts",
    +       ".tsx",
    +       ".d.ts",
    +       ".js",
    +       ".jsx",
    +     ],
    +     "import/external-module-folders": Array [
    +       "node_modules",
    +       "node_modules/@types",
    +     ],
    +     "import/parsers": Object {
    +       "@typescript-eslint/parser": Array [
    +         ".ts",
    +         ".tsx",
    +         ".d.ts",
    +       ],
    +     },
    +     "import/resolver": Object {
    +       "node": Object {
    +         "extensions": Array [
    +           ".ts",
    +           ".tsx",
    +           ".d.ts",
    +           ".js",
    +           ".jsx",
    +         ],
    +       },
    +     },
    +   },
      }
  `);
  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
      Object {
    +   "@typescript-eslint/adjacent-overload-signatures": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/array-type": Array [
    +     "error",
    +     Object {
    +       "default": "array-simple",
    +     },
    +   ],
    +   "@typescript-eslint/await-thenable": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/ban-ts-comment": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/ban-types": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/brace-style": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/camelcase": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/comma-dangle": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/comma-spacing": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/consistent-type-definitions": Array [
    +     "error",
    +     "interface",
    +   ],
    +   "@typescript-eslint/explicit-function-return-type": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/explicit-member-accessibility": Array [
    +     "error",
    +     Object {
    +       "accessibility": "no-public",
    +     },
    +   ],
    +   "@typescript-eslint/explicit-module-boundary-types": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/func-call-spacing": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/indent": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/interface-name-prefix": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/keyword-spacing": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/member-delimiter-style": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-array-constructor": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-empty-function": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-empty-interface": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-explicit-any": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-extra-non-null-assertion": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-extra-parens": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-extra-semi": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-floating-promises": Array [
    +     "error",
    +     Object {
    +       "ignoreVoid": true,
    +     },
    +   ],
    +   "@typescript-eslint/no-for-in-array": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-implicit-any-catch": Array [
    +     "error",
    +     Object {
    +       "allowExplicitAny": true,
    +     },
    +   ],
    +   "@typescript-eslint/no-implied-eval": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-inferrable-types": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-misused-new": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-misused-promises": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-namespace": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-non-null-asserted-optional-chain": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-non-null-assertion": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-shadow": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-this-alias": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-throw-literal": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unnecessary-boolean-literal-compare": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unnecessary-condition": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unnecessary-qualifier": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unnecessary-type-arguments": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unnecessary-type-assertion": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unsafe-assignment": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-unsafe-call": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-unsafe-member-access": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-unsafe-return": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-unused-expressions": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-unused-vars": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/no-use-before-define": Array [
    +     "error",
    +     Object {
    +       "classes": true,
    +       "functions": false,
    +       "typedefs": false,
    +     },
    +   ],
    +   "@typescript-eslint/no-var-requires": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/prefer-as-const": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/prefer-function-type": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/prefer-namespace-keyword": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/prefer-optional-chain": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/prefer-reduce-type-parameter": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/prefer-regexp-exec": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/quotes": Array [
    +     0,
    +   ],
    +   "@typescript-eslint/require-array-sort-compare": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/require-await": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/restrict-plus-operands": Array [
    +     "error",
    +     Object {
    +       "checkCompoundAssignments": true,
    +     },
    +   ],
    +   "@typescript-eslint/restrict-template-expressions": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/return-await": Array [
    +     "error",
    +     "in-try-catch",
    +   ],
    +   "@typescript-eslint/semi": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/space-before-function-paren": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/space-infix-ops": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/triple-slash-reference": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/type-annotation-spacing": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/unbound-method": Array [
    +     "error",
    +   ],
        "array-bracket-newline": Array [
          "off",
        ],
        "array-bracket-spacing": Array [
          "off",
    @@ --- --- @@
        ],
        "implicit-arrow-linebreak": Array [
          "off",
        ],
        "import/default": Array [
    -     2,
    +     "off",
        ],
        "import/export": Array [
    -     2,
    +     "off",
        ],
        "import/first": Array [
          "error",
        ],
        "import/named": Array [
    -     2,
    +     "off",
        ],
        "import/namespace": Array [
    -     2,
    +     "off",
        ],
        "import/no-anonymous-default-export": Array [
          "error",
          Object {
            "allowAnonymousClass": false,
    @@ --- --- @@
        ],
        "import/no-named-as-default-member": Array [
          "error",
        ],
        "import/no-unresolved": Array [
    -     2,
    +     "off",
        ],
        "indent": Array [
          "off",
        ],
        "indent-legacy": Array [
    @@ --- --- @@
          "off",
        ],
        "no-alert": Array [
          "error",
        ],
    +   "no-array-constructor": Array [
    +     "off",
    +   ],
        "no-arrow-condition": Array [
          "off",
        ],
        "no-async-promise-executor": Array [
          "error",
    @@ --- --- @@
            "allowEmptyCatch": true,
          },
        ],
        "no-empty-character-class": Array [
          "error",
    +   ],
    +   "no-empty-function": Array [
    +     "off",
        ],
        "no-empty-pattern": Array [
          "error",
        ],
        "no-ex-assign": Array [
    @@ --- --- @@
            "boolean": true,
            "number": true,
            "string": true,
          },
        ],
    +   "no-implied-eval": Array [
    +     "off",
    +   ],
        "no-import-assign": Array [
          "error",
        ],
        "no-inner-declarations": Array [
          "error",
    @@ --- --- @@
        ],
        "no-setter-return": Array [
          "error",
        ],
        "no-shadow": Array [
    -     "error",
    +     "off",
        ],
        "no-shadow-restricted-names": Array [
          "error",
        ],
        "no-space-before-semi": Array [
    @@ --- --- @@
        ],
        "no-undef": Array [
          "error",
        ],
        "no-undef-init": Array [
    -     "error",
    +     "off",
        ],
        "no-unexpected-multiline": Array [
          0,
        ],
        "no-unneeded-ternary": Array [
    @@ --- --- @@
        ],
        "no-unsafe-negation": Array [
          "error",
        ],
        "no-unused-expressions": Array [
    -     "error",
    +     "off",
        ],
        "no-unused-labels": Array [
          "error",
        ],
        "no-unused-vars": Array [
    -     "error",
    -     Object {
    -       "argsIgnorePattern": "^_",
    -       "varsIgnorePattern": "^_",
    -     },
    +     "off",
        ],
        "no-use-before-define": Array [
    -     "error",
    -     Object {
    -       "functions": false,
    -     },
    +     "off",
        ],
        "no-useless-catch": Array [
          "error",
        ],
        "no-useless-computed-key": Array [
    @@ --- --- @@
        ],
        "node/no-extraneous-require": Array [
          "off",
        ],
        "node/no-missing-import": Array [
    -     "error",
    +     "off",
        ],
        "node/no-missing-require": Array [
          "error",
        ],
        "node/no-unpublished-bin": Array [
    @@ --- --- @@
        ],
        "node/no-unsupported-features/es-builtins": Array [
          "error",
        ],
        "node/no-unsupported-features/es-syntax": Array [
    -     "error",
    +     "off",
          Object {
            "ignores": Array [],
          },
        ],
        "node/no-unsupported-features/node-builtins": Array [
    @@ --- --- @@
          "single",
          Object {
            "allowTemplateLiterals": true,
            "avoidEscape": true,
          },
    +   ],
    +   "require-await": Array [
    +     "off",
        ],
        "require-yield": Array [
          "error",
        ],
        "rest-spread-spacing": Array [
    @@ --- --- @@
          "off",
        ],
        "semi-style": Array [
          "off",
        ],
    +   "simple-import-sort/sort": Array [
    +     "error",
    +   ],
        "space-after-function-name": Array [
          "off",
        ],
        "space-after-keywords": Array [
          "off",
    @@ --- --- @@
        ],
        "space-unary-word-ops": Array [
          "off",
        ],
        "strict": Array [
    -     "error",
    -     "global",
    +     "off",
        ],
        "switch-colon-spacing": Array [
          "off",
        ],
        "template-curly-spacing": Array [
  `);
});
