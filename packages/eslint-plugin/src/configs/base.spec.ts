import { getConfigData } from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigData('base');

  expect(meta).toMatchInlineSnapshot(`
    {
      "env": {},
      "globals": {},
      "parser": undefined,
      "parserOptions": {
        "ecmaVersion": 2020,
      },
      "plugins": [
        "import",
        "eslint-comments",
        "array-func",
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
      "@typescript-eslint/block-spacing": [
        "off",
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
      "@typescript-eslint/key-spacing": [
        "off",
      ],
      "@typescript-eslint/keyword-spacing": [
        "off",
      ],
      "@typescript-eslint/lines-around-comment": [
        0,
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
      "@typescript-eslint/space-before-blocks": [
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
      "array-func/avoid-reverse": [
        "error",
      ],
      "array-func/from-map": [
        "error",
      ],
      "array-func/no-unnecessary-this-arg": [
        "error",
      ],
      "array-func/prefer-array-from": [
        "error",
      ],
      "array-func/prefer-flat": [
        "error",
      ],
      "array-func/prefer-flat-map": [
        "error",
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
      "constructor-super": [
        "error",
      ],
      "curly": [
        "error",
        "multi-line",
        "consistent",
      ],
      "dot-location": [
        "off",
      ],
      "dot-notation": [
        "error",
      ],
      "eol-last": [
        "off",
      ],
      "eqeqeq": [
        "error",
        "smart",
      ],
      "eslint-comments/disable-enable-pair": [
        "error",
      ],
      "eslint-comments/no-aggregating-enable": [
        "error",
      ],
      "eslint-comments/no-duplicate-disable": [
        "error",
      ],
      "eslint-comments/no-unlimited-disable": [
        "error",
      ],
      "eslint-comments/no-unused-disable": [
        "error",
      ],
      "eslint-comments/no-unused-enable": [
        "error",
      ],
      "eslint-comments/no-use": [
        "error",
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
      "for-direction": [
        "error",
      ],
      "func-call-spacing": [
        "off",
      ],
      "func-names": [
        "error",
        "as-needed",
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
      "getter-return": [
        "error",
      ],
      "implicit-arrow-linebreak": [
        "off",
      ],
      "import/default": [
        2,
      ],
      "import/export": [
        2,
      ],
      "import/first": [
        "error",
      ],
      "import/named": [
        2,
      ],
      "import/namespace": [
        2,
      ],
      "import/no-anonymous-default-export": [
        "error",
        {
          "allowAnonymousClass": false,
          "allowAnonymousFunction": false,
          "allowArray": false,
          "allowArrowFunction": false,
          "allowCallExpression": false,
          "allowLiteral": false,
          "allowObject": false,
        },
      ],
      "import/no-duplicates": [
        "off",
      ],
      "import/no-mutable-exports": [
        "error",
      ],
      "import/no-named-as-default": [
        "off",
      ],
      "import/no-named-as-default-member": [
        "off",
      ],
      "import/no-unresolved": [
        2,
      ],
      "indent": [
        "off",
      ],
      "indent-legacy": [
        "off",
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
      "max-statements-per-line": [
        "off",
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
      "no-alert": [
        "error",
      ],
      "no-arrow-condition": [
        "off",
      ],
      "no-async-promise-executor": [
        "error",
      ],
      "no-case-declarations": [
        "error",
      ],
      "no-class-assign": [
        "error",
      ],
      "no-comma-dangle": [
        "off",
      ],
      "no-compare-neg-zero": [
        "error",
      ],
      "no-cond-assign": [
        "off",
      ],
      "no-confusing-arrow": [
        0,
      ],
      "no-console": [
        "error",
      ],
      "no-const-assign": [
        "error",
      ],
      "no-constant-condition": [
        "error",
      ],
      "no-control-regex": [
        "error",
      ],
      "no-debugger": [
        "error",
      ],
      "no-delete-var": [
        "error",
      ],
      "no-div-regex": [
        "error",
      ],
      "no-dupe-args": [
        "error",
      ],
      "no-dupe-class-members": [
        "error",
      ],
      "no-dupe-else-if": [
        "error",
      ],
      "no-dupe-keys": [
        "error",
      ],
      "no-duplicate-case": [
        "error",
      ],
      "no-else-return": [
        "error",
      ],
      "no-empty": [
        "error",
        {
          "allowEmptyCatch": true,
        },
      ],
      "no-empty-character-class": [
        "error",
      ],
      "no-empty-pattern": [
        "error",
      ],
      "no-ex-assign": [
        "error",
      ],
      "no-extra-boolean-cast": [
        "error",
      ],
      "no-extra-parens": [
        "off",
      ],
      "no-extra-semi": [
        "off",
      ],
      "no-fallthrough": [
        "error",
      ],
      "no-floating-decimal": [
        "error",
      ],
      "no-func-assign": [
        "error",
      ],
      "no-global-assign": [
        "error",
      ],
      "no-implicit-coercion": [
        "error",
        {
          "allow": [
            "!!",
          ],
          "boolean": true,
          "disallowTemplateShorthand": false,
          "number": true,
          "string": true,
        },
      ],
      "no-import-assign": [
        "error",
      ],
      "no-inner-declarations": [
        "error",
      ],
      "no-invalid-regexp": [
        "error",
      ],
      "no-irregular-whitespace": [
        "error",
      ],
      "no-lonely-if": [
        "error",
      ],
      "no-loss-of-precision": [
        "error",
      ],
      "no-misleading-character-class": [
        "error",
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
      "no-new-symbol": [
        "error",
      ],
      "no-nonoctal-decimal-escape": [
        "error",
      ],
      "no-obj-calls": [
        "error",
      ],
      "no-octal": [
        "error",
      ],
      "no-prototype-builtins": [
        "error",
      ],
      "no-redeclare": [
        "error",
      ],
      "no-regex-spaces": [
        "error",
      ],
      "no-reserved-keys": [
        "off",
      ],
      "no-restricted-globals": [
        "error",
        {
          "message": "Use local parameter instead.",
          "name": "error",
        },
        {
          "message": "Use 'Number.isNaN' instead.",
          "name": "isNaN",
        },
        {
          "message": "Use 'Number.isFinite' instead.",
          "name": "isFinite",
        },
        {
          "message": "Use 'window.addEventListener' instead.",
          "name": "addEventListener",
        },
        {
          "message": "Use 'window.blur' instead.",
          "name": "blur",
        },
        {
          "message": "Use 'window.close' instead.",
          "name": "close",
        },
        {
          "message": "Use 'window.closed' instead.",
          "name": "closed",
        },
        {
          "message": "Use 'window.confirm' instead.",
          "name": "confirm",
        },
        {
          "message": "Use 'window.defaultStatus' instead.",
          "name": "defaultStatus",
        },
        {
          "message": "Use 'window.defaultstatus' instead.",
          "name": "defaultstatus",
        },
        {
          "message": "Use local parameter instead.",
          "name": "event",
        },
        {
          "message": "Use 'window.external' instead.",
          "name": "external",
        },
        {
          "message": "Use 'window.find' instead.",
          "name": "find",
        },
        {
          "message": "Use 'window.focus' instead.",
          "name": "focus",
        },
        {
          "message": "Use 'window.frameElement' instead.",
          "name": "frameElement",
        },
        {
          "message": "Use 'window.frames' instead.",
          "name": "frames",
        },
        {
          "message": "Use 'window.history' instead.",
          "name": "history",
        },
        {
          "message": "Use 'window.innerHeight' instead.",
          "name": "innerHeight",
        },
        {
          "message": "Use 'window.innerWidth' instead.",
          "name": "innerWidth",
        },
        {
          "message": "Use 'window.length' instead.",
          "name": "length",
        },
        {
          "message": "Use 'window.location' instead.",
          "name": "location",
        },
        {
          "message": "Use 'window.locationbar' instead.",
          "name": "locationbar",
        },
        {
          "message": "Use 'window.menubar' instead.",
          "name": "menubar",
        },
        {
          "message": "Use 'window.moveBy' instead.",
          "name": "moveBy",
        },
        {
          "message": "Use 'window.moveTo' instead.",
          "name": "moveTo",
        },
        {
          "message": "Use 'window.name' instead.",
          "name": "name",
        },
        {
          "message": "Use 'window.onblur' instead.",
          "name": "onblur",
        },
        {
          "message": "Use 'window.onerror' instead.",
          "name": "onerror",
        },
        {
          "message": "Use 'window.onfocus' instead.",
          "name": "onfocus",
        },
        {
          "message": "Use 'window.onload' instead.",
          "name": "onload",
        },
        {
          "message": "Use 'window.onresize' instead.",
          "name": "onresize",
        },
        {
          "message": "Use 'window.onunload' instead.",
          "name": "onunload",
        },
        {
          "message": "Use 'window.open' instead.",
          "name": "open",
        },
        {
          "message": "Use 'window.opener' instead.",
          "name": "opener",
        },
        {
          "message": "Use 'window.opera' instead.",
          "name": "opera",
        },
        {
          "message": "Use 'window.outerHeight' instead.",
          "name": "outerHeight",
        },
        {
          "message": "Use 'window.outerWidth' instead.",
          "name": "outerWidth",
        },
        {
          "message": "Use 'window.pageXOffset' instead.",
          "name": "pageXOffset",
        },
        {
          "message": "Use 'window.pageYOffset' instead.",
          "name": "pageYOffset",
        },
        {
          "message": "Use 'window.parent' instead.",
          "name": "parent",
        },
        {
          "message": "Use 'window.print' instead.",
          "name": "print",
        },
        {
          "message": "Use 'window.removeEventListener' instead.",
          "name": "removeEventListener",
        },
        {
          "message": "Use 'window.resizeBy' instead.",
          "name": "resizeBy",
        },
        {
          "message": "Use 'window.resizeTo' instead.",
          "name": "resizeTo",
        },
        {
          "message": "Use 'window.screen' instead.",
          "name": "screen",
        },
        {
          "message": "Use 'window.screenLeft' instead.",
          "name": "screenLeft",
        },
        {
          "message": "Use 'window.screenTop' instead.",
          "name": "screenTop",
        },
        {
          "message": "Use 'window.screenX' instead.",
          "name": "screenX",
        },
        {
          "message": "Use 'window.screenY' instead.",
          "name": "screenY",
        },
        {
          "message": "Use 'window.scroll' instead.",
          "name": "scroll",
        },
        {
          "message": "Use 'window.scrollbars' instead.",
          "name": "scrollbars",
        },
        {
          "message": "Use 'window.scrollBy' instead.",
          "name": "scrollBy",
        },
        {
          "message": "Use 'window.scrollTo' instead.",
          "name": "scrollTo",
        },
        {
          "message": "Use 'window.scrollX' instead.",
          "name": "scrollX",
        },
        {
          "message": "Use 'window.scrollY' instead.",
          "name": "scrollY",
        },
        {
          "message": "Use 'window.self' instead.",
          "name": "self",
        },
        {
          "message": "Use 'window.status' instead.",
          "name": "status",
        },
        {
          "message": "Use 'window.statusbar' instead.",
          "name": "statusbar",
        },
        {
          "message": "Use 'window.stop' instead.",
          "name": "stop",
        },
        {
          "message": "Use 'window.toolbar' instead.",
          "name": "toolbar",
        },
        {
          "message": "Use 'window.top' instead.",
          "name": "top",
        },
      ],
      "no-self-assign": [
        "error",
      ],
      "no-setter-return": [
        "error",
      ],
      "no-shadow": [
        "error",
      ],
      "no-shadow-restricted-names": [
        "error",
      ],
      "no-space-before-semi": [
        "off",
      ],
      "no-spaced-func": [
        "off",
      ],
      "no-sparse-arrays": [
        "error",
      ],
      "no-tabs": [
        0,
      ],
      "no-this-before-super": [
        "error",
      ],
      "no-trailing-spaces": [
        "off",
      ],
      "no-undef": [
        "error",
      ],
      "no-undef-init": [
        "error",
      ],
      "no-unexpected-multiline": [
        0,
      ],
      "no-unneeded-ternary": [
        "error",
      ],
      "no-unreachable": [
        "error",
      ],
      "no-unsafe-finally": [
        "error",
      ],
      "no-unsafe-negation": [
        "error",
      ],
      "no-unsafe-optional-chaining": [
        "error",
      ],
      "no-unused-expressions": [
        "error",
      ],
      "no-unused-labels": [
        "error",
      ],
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
        },
      ],
      "no-use-before-define": [
        "error",
        {
          "functions": false,
        },
      ],
      "no-useless-backreference": [
        "error",
      ],
      "no-useless-catch": [
        "error",
      ],
      "no-useless-computed-key": [
        "error",
      ],
      "no-useless-escape": [
        "error",
      ],
      "no-useless-rename": [
        "error",
      ],
      "no-useless-return": [
        "error",
      ],
      "no-var": [
        "error",
      ],
      "no-warning-comments": [
        "warn",
        {
          "location": "anywhere",
          "terms": [
            "todo",
            "fixme",
          ],
        },
      ],
      "no-whitespace-before-property": [
        "off",
      ],
      "no-with": [
        "error",
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
      "object-shorthand": [
        "error",
        "always",
        {
          "avoidQuotes": true,
        },
      ],
      "one-var-declaration-per-line": [
        "off",
      ],
      "operator-assignment": [
        "error",
      ],
      "operator-linebreak": [
        "off",
      ],
      "padded-blocks": [
        "off",
      ],
      "prefer-arrow-callback": [
        "error",
        {
          "allowNamedFunctions": false,
          "allowUnboundThis": true,
        },
      ],
      "prefer-const": [
        "off",
      ],
      "prefer-destructuring": [
        "error",
        {
          "AssignmentExpression": {
            "array": false,
            "object": false,
          },
          "VariableDeclarator": {
            "array": true,
            "object": true,
          },
        },
        {
          "enforceForRenamedProperties": false,
        },
      ],
      "prefer-numeric-literals": [
        "error",
      ],
      "prefer-object-spread": [
        "error",
      ],
      "quote-props": [
        "off",
      ],
      "quotes": [
        0,
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
      "react/jsx-indent": [
        "off",
      ],
      "react/jsx-indent-props": [
        "off",
      ],
      "react/jsx-max-props-per-line": [
        "off",
      ],
      "react/jsx-newline": [
        "off",
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
      "react/jsx-wrap-multilines": [
        "off",
      ],
      "require-yield": [
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
      "use-isnan": [
        "error",
      ],
      "valid-typeof": [
        "error",
      ],
      "vue/array-bracket-newline": [
        "off",
      ],
      "vue/array-bracket-spacing": [
        "off",
      ],
      "vue/array-element-newline": [
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
      "vue/multiline-ternary": [
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
      "vue/quote-props": [
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
      "yoda": [
        "error",
        "never",
        {
          "exceptRange": true,
          "onlyEquality": false,
        },
      ],
    }
  `);
});
