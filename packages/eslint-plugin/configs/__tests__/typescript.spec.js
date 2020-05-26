'use strict';

const { getConfigValues } = require('../__testutils__/test-eslint-config');
const config = require('../typescript');
const baseConfig = require('../base');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues(config, baseConfig);

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
        "globals": Object {},
    -   "parser": null,
    +   "parser": "node_modules/@typescript-eslint/parser/dist/index.js",
        "parserOptions": Object {
          "ecmaVersion": 2018,
    +     "sourceType": "module",
        },
    @@ --- --- @@
          "import",
    +     "@typescript-eslint",
    +     "simple-import-sort",
    +   ],
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
          ],
    -   "settings": Object {},
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
        ],
    +   "@typescript-eslint/adjacent-overload-signatures": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/array-type": Array [
    +     "error",
    +     Object {
    +       "default": "array-simple",
    +     },
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
    +     "error",
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
    +     "error",
    +     Object {
    +       "ignoreRestArgs": true,
    +     },
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
    +   "@typescript-eslint/no-inferrable-types": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-misused-new": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-namespace": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-non-null-asserted-optional-chain": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-non-null-assertion": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/no-this-alias": Array [
    +     "error",
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
    +   "@typescript-eslint/quotes": Array [
    +     0,
    +   ],
    +   "@typescript-eslint/semi": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/space-before-function-paren": Array [
    +     "off",
    +   ],
    +   "@typescript-eslint/triple-slash-reference": Array [
    +     "error",
    +   ],
    +   "@typescript-eslint/type-annotation-spacing": Array [
    +     "off",
    +   ],
        "array-bracket-newline": Array [
    @@ --- --- @@
        "constructor-super": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "getter-return": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "import/default": Array [
    -     2,
    +     "off",
        ],
        "import/export": Array [
    -     2,
    +     "off",
        ],
    @@ --- --- @@
        "import/named": Array [
    -     2,
    +     "off",
        ],
        "import/namespace": Array [
    -     2,
    +     "off",
        ],
    @@ --- --- @@
        "import/no-unresolved": Array [
    -     2,
    +     "off",
        ],
    @@ --- --- @@
          "error",
    +   ],
    +   "no-array-constructor": Array [
    +     "off",
        ],
    @@ --- --- @@
        "no-const-assign": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-dupe-args": Array [
    -     "error",
    +     "off",
        ],
        "no-dupe-class-members": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-dupe-keys": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        ],
    +   "no-empty-function": Array [
    +     "off",
    +   ],
        "no-empty-pattern": Array [
    @@ --- --- @@
        "no-func-assign": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-import-assign": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-new-symbol": Array [
    -     "error",
    +     "off",
        ],
        "no-obj-calls": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-redeclare": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-setter-return": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-this-before-super": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-undef": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-unreachable": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-unsafe-negation": Array [
    -     "error",
    +     "off",
        ],
        "no-unused-expressions": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        "no-unused-vars": Array [
    -     "error",
    +     "off",
          Object {
    @@ --- --- @@
        ],
    +   "simple-import-sort/sort": Array [
    +     "error",
    +   ],
        "space-after-function-name": Array [
    @@ --- --- @@
        "valid-typeof": Array [
    -     "error",
    +     "off",
        ],
  `);
});
