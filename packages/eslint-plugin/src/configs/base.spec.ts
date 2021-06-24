'use strict';

import { getConfigData } from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigData('base');

  expect(meta).toMatchInlineSnapshot(`
    Object {
      "env": Object {},
      "globals": Object {},
      "parser": undefined,
      "parserOptions": Object {
        "ecmaVersion": 2020,
      },
      "plugins": Array [
        "import",
        "eslint-comments",
        "array-func",
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
  "constructor-super": Array [
    "error",
  ],
  "curly": Array [
    "error",
    "multi-line",
    "consistent",
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
  "eslint-comments/disable-enable-pair": Array [
    "error",
  ],
  "eslint-comments/no-aggregating-enable": Array [
    "error",
  ],
  "eslint-comments/no-duplicate-disable": Array [
    "error",
  ],
  "eslint-comments/no-unlimited-disable": Array [
    "error",
  ],
  "eslint-comments/no-unused-disable": Array [
    "error",
  ],
  "eslint-comments/no-unused-enable": Array [
    "error",
  ],
  "eslint-comments/no-use": Array [
    "error",
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
  "import/no-duplicates": Array [
    "off",
  ],
  "import/no-mutable-exports": Array [
    "error",
  ],
  "import/no-named-as-default": Array [
    "off",
  ],
  "import/no-named-as-default-member": Array [
    "off",
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
  "no-dupe-else-if": Array [
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
      "disallowTemplateShorthand": false,
      "number": true,
      "string": true,
    },
  ],
  "no-import-assign": Array [
    "error",
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
  "no-restricted-globals": Array [
    "error",
    Object {
      "message": "Use local parameter instead.",
      "name": "error",
    },
    Object {
      "message": "Use 'Number.isNaN' instead.",
      "name": "isNaN",
    },
    Object {
      "message": "Use 'Number.isFinite' instead.",
      "name": "isFinite",
    },
    Object {
      "message": "Use 'window.addEventListener' instead.",
      "name": "addEventListener",
    },
    Object {
      "message": "Use 'window.blur' instead.",
      "name": "blur",
    },
    Object {
      "message": "Use 'window.close' instead.",
      "name": "close",
    },
    Object {
      "message": "Use 'window.closed' instead.",
      "name": "closed",
    },
    Object {
      "message": "Use 'window.confirm' instead.",
      "name": "confirm",
    },
    Object {
      "message": "Use 'window.defaultStatus' instead.",
      "name": "defaultStatus",
    },
    Object {
      "message": "Use 'window.defaultstatus' instead.",
      "name": "defaultstatus",
    },
    Object {
      "message": "Use local parameter instead.",
      "name": "event",
    },
    Object {
      "message": "Use 'window.external' instead.",
      "name": "external",
    },
    Object {
      "message": "Use 'window.find' instead.",
      "name": "find",
    },
    Object {
      "message": "Use 'window.focus' instead.",
      "name": "focus",
    },
    Object {
      "message": "Use 'window.frameElement' instead.",
      "name": "frameElement",
    },
    Object {
      "message": "Use 'window.frames' instead.",
      "name": "frames",
    },
    Object {
      "message": "Use 'window.history' instead.",
      "name": "history",
    },
    Object {
      "message": "Use 'window.innerHeight' instead.",
      "name": "innerHeight",
    },
    Object {
      "message": "Use 'window.innerWidth' instead.",
      "name": "innerWidth",
    },
    Object {
      "message": "Use 'window.length' instead.",
      "name": "length",
    },
    Object {
      "message": "Use 'window.location' instead.",
      "name": "location",
    },
    Object {
      "message": "Use 'window.locationbar' instead.",
      "name": "locationbar",
    },
    Object {
      "message": "Use 'window.menubar' instead.",
      "name": "menubar",
    },
    Object {
      "message": "Use 'window.moveBy' instead.",
      "name": "moveBy",
    },
    Object {
      "message": "Use 'window.moveTo' instead.",
      "name": "moveTo",
    },
    Object {
      "message": "Use 'window.name' instead.",
      "name": "name",
    },
    Object {
      "message": "Use 'window.onblur' instead.",
      "name": "onblur",
    },
    Object {
      "message": "Use 'window.onerror' instead.",
      "name": "onerror",
    },
    Object {
      "message": "Use 'window.onfocus' instead.",
      "name": "onfocus",
    },
    Object {
      "message": "Use 'window.onload' instead.",
      "name": "onload",
    },
    Object {
      "message": "Use 'window.onresize' instead.",
      "name": "onresize",
    },
    Object {
      "message": "Use 'window.onunload' instead.",
      "name": "onunload",
    },
    Object {
      "message": "Use 'window.open' instead.",
      "name": "open",
    },
    Object {
      "message": "Use 'window.opener' instead.",
      "name": "opener",
    },
    Object {
      "message": "Use 'window.opera' instead.",
      "name": "opera",
    },
    Object {
      "message": "Use 'window.outerHeight' instead.",
      "name": "outerHeight",
    },
    Object {
      "message": "Use 'window.outerWidth' instead.",
      "name": "outerWidth",
    },
    Object {
      "message": "Use 'window.pageXOffset' instead.",
      "name": "pageXOffset",
    },
    Object {
      "message": "Use 'window.pageYOffset' instead.",
      "name": "pageYOffset",
    },
    Object {
      "message": "Use 'window.parent' instead.",
      "name": "parent",
    },
    Object {
      "message": "Use 'window.print' instead.",
      "name": "print",
    },
    Object {
      "message": "Use 'window.removeEventListener' instead.",
      "name": "removeEventListener",
    },
    Object {
      "message": "Use 'window.resizeBy' instead.",
      "name": "resizeBy",
    },
    Object {
      "message": "Use 'window.resizeTo' instead.",
      "name": "resizeTo",
    },
    Object {
      "message": "Use 'window.screen' instead.",
      "name": "screen",
    },
    Object {
      "message": "Use 'window.screenLeft' instead.",
      "name": "screenLeft",
    },
    Object {
      "message": "Use 'window.screenTop' instead.",
      "name": "screenTop",
    },
    Object {
      "message": "Use 'window.screenX' instead.",
      "name": "screenX",
    },
    Object {
      "message": "Use 'window.screenY' instead.",
      "name": "screenY",
    },
    Object {
      "message": "Use 'window.scroll' instead.",
      "name": "scroll",
    },
    Object {
      "message": "Use 'window.scrollbars' instead.",
      "name": "scrollbars",
    },
    Object {
      "message": "Use 'window.scrollBy' instead.",
      "name": "scrollBy",
    },
    Object {
      "message": "Use 'window.scrollTo' instead.",
      "name": "scrollTo",
    },
    Object {
      "message": "Use 'window.scrollX' instead.",
      "name": "scrollX",
    },
    Object {
      "message": "Use 'window.scrollY' instead.",
      "name": "scrollY",
    },
    Object {
      "message": "Use 'window.self' instead.",
      "name": "self",
    },
    Object {
      "message": "Use 'window.status' instead.",
      "name": "status",
    },
    Object {
      "message": "Use 'window.statusbar' instead.",
      "name": "statusbar",
    },
    Object {
      "message": "Use 'window.stop' instead.",
      "name": "stop",
    },
    Object {
      "message": "Use 'window.toolbar' instead.",
      "name": "toolbar",
    },
    Object {
      "message": "Use 'window.top' instead.",
      "name": "top",
    },
  ],
  "no-self-assign": Array [
    "error",
  ],
  "no-setter-return": Array [
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
    Object {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
    },
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
  "quote-props": Array [
    "off",
  ],
  "quotes": Array [
    0,
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
  "react/jsx-indent": Array [
    "off",
  ],
  "react/jsx-indent-props": Array [
    "off",
  ],
  "react/jsx-max-props-per-line": Array [
    "off",
  ],
  "react/jsx-newline": Array [
    "off",
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
  "react/jsx-wrap-multilines": Array [
    "off",
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
  "use-isnan": Array [
    "error",
  ],
  "valid-typeof": Array [
    "error",
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
