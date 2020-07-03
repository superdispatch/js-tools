/**
 * @typedef {import("eslint").Linter.Config} Config
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 * */

'use strict';

const confusingBrowserGlobals = require('confusing-browser-globals');

const restrictedGlobals = new Map(
  ['error', 'isNaN', 'isFinite', ...confusingBrowserGlobals].map((key) => [
    key,
    key === 'event' || key === 'error'
      ? 'Use local parameter instead.'
      : key === 'isNaN' || key === 'isFinite'
      ? `Use 'Number.${key}' instead.`
      : `Use 'window.${key}' instead.`,
  ]),
);

/**
 * @param {Config} config
 * @param {string} path
 * */
function addExtends(config, path) {
  if (!config.extends) {
    config.extends = [];
  } else if (!Array.isArray(config.extends)) {
    config.extends = [config.extends];
  }

  config.extends.push(path);
}

/**
 * @param {Config} config
 * @param {string} plugin
 * */
function addPlugin(config, plugin) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(plugin);
}

/** @returns {Config} config */
function createBaseConfig() {
  return {
    extends: ['eslint:recommended'],
    parserOptions: { ecmaVersion: 2020 },

    root: true,
    rules: {
      /**
       * Require braces around arrow function bodies.
       *
       * @see https://eslint.org/docs/rules/arrow-body-style
       */
      'arrow-body-style': [
        'error',
        'as-needed',
        { requireReturnForObjectLiteral: false },
      ],

      /**
       * Ignore variable cases.
       *
       * @see https://eslint.org/docs/rules/camelcase
       */
      camelcase: 'off',

      /**
       * Enforce consistent brace style for all control statements.
       *
       * @see https://eslint.org/docs/rules/curly
       */
      curly: ['error', 'all'],

      /**
       * Enforce dot notation whenever possible.
       *
       * @see https://eslint.org/docs/rules/dot-notation
       */
      'dot-notation': 'error',

      /**
       * Require the use of `===` and `!==`.
       *
       * @see https://eslint.org/docs/rules/eqeqeq
       */
      eqeqeq: ['error', 'smart'],

      /**
       * Require named `function` expressions.
       *
       * @see https://eslint.org/docs/rules/func-names
       */
      'func-names': ['error', 'as-needed'],

      /**
       * Disallow the use of `alert`, `confirm`, and `prompt`.
       *
       * @see https://eslint.org/docs/rules/no-alert
       */
      'no-alert': 'error',

      /**
       * Allow assignment operators in conditional expressions.
       *
       * @see https://eslint.org/docs/rules/no-cond-assign
       */
      'no-cond-assign': 'off',

      /**
       * Disallow the use of `console`.
       *
       * @see https://eslint.org/docs/rules/no-console
       */
      'no-console': 'error',

      /**
       * Disallow division operators explicitly at the beginning of regular
       * expressions.
       *
       * @see https://eslint.org/docs/rules/no-div-regex
       */
      'no-div-regex': 'error',

      /**
       * Disallow else blocks after return statements in if statements.
       *
       * @see https://eslint.org/docs/rules/no-else-return
       */
      'no-else-return': 'error',

      /**
       * Disallow empty block statements except `catch`.
       *
       * @see https://eslint.org/docs/rules/no-empty
       */
      'no-empty': ['error', { allowEmptyCatch: true }],

      /**
       * Disallow leading or trailing decimal points in numeric literals.
       *
       * @see https://eslint.org/docs/rules/no-floating-decimal
       */
      'no-floating-decimal': 'error',

      /**
       * Disallow the type conversion with shorter notations.
       *
       * @see https://eslint.org/docs/rules/no-implicit-coercion
       */
      'no-implicit-coercion': ['error', { allow: ['!!'] }],

      /**
       * Disallow `if` statements as the only statement in `else` blocks.
       *
       * @see https://eslint.org/docs/rules/no-lonely-if
       */
      'no-lonely-if': 'error',

      /**
       * Disallowing usage of specific global variables.
       *
       * @see https://eslint.org/docs/rules/no-restricted-globals
       */
      'no-restricted-globals': [
        'error',
        ...Array.from(restrictedGlobals, ([name, message]) => ({
          message,
          name,
        })),
      ],

      /**
       * Disallow variable declarations from shadowing variables declared in the
       * outer scope.
       *
       * @see https://eslint.org/docs/rules/no-shadow
       */
      'no-shadow': 'error',

      /**
       * Disallow Initializing to `undefined`.
       *
       * @see https://eslint.org/docs/rules/no-undef-init
       */
      'no-undef-init': 'error',

      /**
       * Disallow ternary operators when simpler alternatives exist.
       *
       * @see https://eslint.org/docs/rules/no-unneeded-ternary
       */
      'no-unneeded-ternary': 'error',
      /**
       * Disallow Unused Expressions.
       *
       * @see https://eslint.org/docs/rules/no-unused-expressions
       */
      'no-unused-expressions': 'error',

      /**
       * Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.
       *
       * @see https://eslint.org/docs/rules/no-unused-vars
       * */
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /**
       * Disallow the use of variables before they are defined.
       *
       * @see https://eslint.org/docs/rules/no-use-before-define
       */
      'no-use-before-define': ['error', { functions: false }],

      /**
       * Disallow unnecessary computed property keys on objects.
       *
       * @see https://eslint.org/docs/rules/no-useless-computed-key
       */
      'no-useless-computed-key': 'error',

      /**
       * Disallow renaming import, export, and destructured assignments to the
       * same name.
       *
       * @see https://eslint.org/docs/rules/no-useless-rename
       */
      'no-useless-rename': 'error',

      /**
       * Disallow redundant return statements.
       *
       * @see https://eslint.org/docs/rules/no-useless-return
       */
      'no-useless-return': 'error',

      /**
       * Require `let` or `const` instead of `var`.
       *
       * @see https://eslint.org/docs/rules/no-var
       */
      'no-var': 'error',

      /**
       * Disallow specified warning terms in comments.
       *
       * @see https://eslint.org/docs/rules/no-warning-comments
       */
      'no-warning-comments': [
        'warn',
        { location: 'anywhere', terms: ['todo', 'fixme'] },
      ],

      /**
       * Require method and property shorthand syntax for object literals.
       *
       * @see https://eslint.org/docs/rules/object-shorthand
       */
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],

      /**
       * Require or disallow assignment operator shorthand where possible.
       *
       * @see https://eslint.org/docs/rules/operator-assignment
       */
      'operator-assignment': 'error',

      /**
       * Require using arrow functions for callbacks.
       *
       * @see https://eslint.org/docs/rules/prefer-arrow-callback
       */
      'prefer-arrow-callback': [
        'error',
        { allowNamedFunctions: false, allowUnboundThis: true },
      ],

      /**
       * Do not enforce constants.
       *
       * @see https://eslint.org/docs/rules/prefer-const
       */
      'prefer-const': 'off',

      /**
       * Prefer destructuring from arrays and objects.
       *
       * @see https://eslint.org/docs/rules/prefer-destructuring
       */
      'prefer-destructuring': [
        'error',
        {
          AssignmentExpression: { array: false, object: false },
          VariableDeclarator: { array: true, object: true },
        },
        { enforceForRenamedProperties: false },
      ],

      /**
       * Disallow parseInt() and Number.parseInt() in favor of binary, octal,
       * and hexadecimal literals.
       *
       * @see https://eslint.org/docs/rules/prefer-numeric-literals
       */
      'prefer-numeric-literals': 'error',

      /**
       * Require or disallow assignment operator shorthand where possible.
       *
       * @see https://eslint.org/docs/rules/prefer-object-spread
       */
      'prefer-object-spread': 'error',

      /**
       * Require template literals instead of string concatenation.
       *
       * @see https://eslint.org/docs/rules/prefer-template
       */
      'prefer-template': 'error',

      /**
       * Enforce the consistent use of single quotes and disallow usage of
       * obsolete template literals.
       *
       * @see https://eslint.org/docs/rules/quotes
       */
      quotes: [
        'error',
        'single',
        { allowTemplateLiterals: false, avoidEscape: true },
      ],

      /**
       * Require or disallow Yoda Conditions.
       *
       * @see https://eslint.org/docs/rules/yoda
       */
      yoda: ['error', 'never', { exceptRange: true }],
    },
  };
}

/** @param {Config} config */
function setupImportPlugin(config) {
  addExtends(config, 'plugin:import/errors');
  addExtends(config, 'plugin:import/warnings');

  config.rules = {
    ...config.rules,

    /**
     * Ensure all imports appear before other statements
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
     */
    'import/first': 'error',

    /**
     * Forbid anonymous values as default exports.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md
     */
    'import/no-anonymous-default-export': [
      'error',
      {
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowArray: false,
        allowArrowFunction: false,
        allowCallExpression: false,
        allowLiteral: false,
        allowObject: false,
      },
    ],

    /**
     * Report imported names marked with `@deprecated` documentation tag.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
     */
    'import/no-deprecated': 'warn',

    /**
     * Report repeated import of the same module in multiple places
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
     */
    'import/no-duplicates': 'error',

    /**
     * Forbid the use of mutable exports with `var` or `let`.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
     */
    'import/no-mutable-exports': 'error',

    /**
     * Report use of exported name as identifier of default export.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
     */
    'import/no-named-as-default': 'error',

    /**
     * Report use of exported name as identifier of default export.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/import/no-named-as-default-member.md
     */
    'import/no-named-as-default-member': 'error',
  };
}

/** @param {Config} config */
function setupArrayFuncPlugin(config) {
  addPlugin(config, 'array-func');

  config.rules = {
    ...config.rules,

    /**
     * Avoid reversing the array and running a method on it if there is an equivalent of the method operating on the array from the other end.
     *
     * @see https://github.com/freaktechnik/eslint-plugin-array-func#avoid-reverse
     * */
    'array-func/avoid-reverse': 'error',

    /**
     * Prefer using the mapFn callback of Array.from over an immediate .map() call on the Array.from result.
     *
     * @see https://github.com/freaktechnik/eslint-plugin-array-func#from-map
     * */
    'array-func/from-map': 'error',

    /**
     * Avoid the this parameter when providing arrow function as callback in array functions.
     *
     * @see https://github.com/freaktechnik/eslint-plugin-array-func#no-unnecessary-this-arg
     * */
    'array-func/no-unnecessary-this-arg': 'error',

    /**
     * Use Array.from instead of [...iterable] for performance benefits.
     *
     * https://github.com/freaktechnik/eslint-plugin-array-func#prefer-array-from
     * */
    'array-func/prefer-array-from': 'error',

    /**
     * Use .flat() to flatten an array of arrays. This rule currently recognizes two patterns and can replace them with a .flat() call:
     * - [].concat(...array)
     * - array.reduce((p, n) => p.concat(n), [])
     *
     * @see https://github.com/freaktechnik/eslint-plugin-array-func#prefer-flat
     * */
    'array-func/prefer-flat': 'error',

    /**
     * Use .flatMap() to flatten an array and map the values instead of using .flat().map().
     *
     * @see https://github.com/freaktechnik/eslint-plugin-array-func#prefer-flat-map
     * */
    'array-func/prefer-flat-map': 'error',
  };
}

/** @param {Config} config */
function setupSuperDispatchPlugin(config) {
  addPlugin(config, '@superdispatch/eslint-plugin');

  config.rules = {
    ...config.rules,
    '@superdispatch/camelcase': 'error',
    '@superdispatch/directory-name': 'error',
    '@superdispatch/filename': 'error',
    '@superdispatch/no-index-file': 'off',
  };
}

/** @param {Config} config */
function setupESLintCommentsPlugin(config) {
  addPlugin(config, 'eslint-comments');

  config.rules = {
    ...config.rules,

    /**
     * Require a eslint-enable comment for every eslint-disable comment
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html
     * */
    'eslint-comments/disable-enable-pair': 'error',

    /**
     * Disallow a eslint-enable comment for multiple eslint-disable comments
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-aggregating-enable.html
     * */
    'eslint-comments/no-aggregating-enable': 'error',

    /**
     * Disallow duplicate eslint-disable comments
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-duplicate-disable.html
     * */
    'eslint-comments/no-duplicate-disable': 'error',

    /**
     * Disallow eslint-disable comments without rule names
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unlimited-disable.html
     * */
    'eslint-comments/no-unlimited-disable': 'error',

    /**
     * Disallow unused eslint-disable comments
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html
     * */
    'eslint-comments/no-unused-disable': 'error',

    /**
     * Disallow unused eslint-enable comments
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-enable.html
     * */
    'eslint-comments/no-unused-enable': 'error',

    /**
     * Abuse of directive-comments may cause to overlook bugs or upset of coding style. This rule disallows a use of directive-comments.
     *
     * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-use.html
     */
    'eslint-comments/no-use': 'error',
  };
}

/** @param {Config} config */
function setupPrettierConfig(config) {
  addExtends(config, 'prettier');
}

/**
 * @returns {Config}
 * */
function getBaseConfig() {
  const config = createBaseConfig();

  setupImportPlugin(config);
  setupArrayFuncPlugin(config);
  setupSuperDispatchPlugin(config);
  setupESLintCommentsPlugin(config);

  // We want to override all previous values.
  setupPrettierConfig(config);

  return config;
}

module.exports = { addExtends, addPlugin, getBaseConfig };
