'use strict';

const { OFF, DEPT, ERROR, INCONSISTENCY } = require('./internal/error-codes');

module.exports = {
  root: true,

  parserOptions: { ecmaVersion: 2018 },

  plugins: ['import', '@superdispatch/eslint-plugin'],

  extends: [
    //
    // eslint
    'eslint:recommended',

    //
    // eslint-plugin-import
    'plugin:import/errors',
    'plugin:import/warnings',

    //
    // eslint-config-prettier
    'prettier',
  ],

  rules: {
    //
    // eslint
    //

    //
    // Possible Errors

    /**
     * Allow assignment operators in conditional expressions.
     *
     * @see https://eslint.org/docs/rules/no-cond-assign
     */
    'no-cond-assign': OFF,

    /**
     * Disallow the use of `console`.
     *
     * @see https://eslint.org/docs/rules/no-console
     */
    'no-console': INCONSISTENCY,

    /**
     * Disallow empty block statements except `catch`.
     *
     * @see https://eslint.org/docs/rules/no-empty
     */
    'no-empty': [INCONSISTENCY, { allowEmptyCatch: true }],

    //
    // Best Practices

    /**
     * Enforce consistent brace style for all control statements.
     *
     * @see https://eslint.org/docs/rules/curly
     */
    curly: [INCONSISTENCY, 'all'],

    /**
     * Enforce dot notation whenever possible.
     *
     * @see https://eslint.org/docs/rules/dot-notation
     */
    'dot-notation': INCONSISTENCY,

    /**
     * Require named `function` expressions.
     *
     * @see https://eslint.org/docs/rules/func-names
     */
    'func-names': [INCONSISTENCY, 'as-needed'],

    /**
     * Disallow division operators explicitly at the beginning of regular
     * expressions.
     *
     * @see https://eslint.org/docs/rules/no-div-regex
     */
    'no-div-regex': INCONSISTENCY,

    /**
     * Require the use of `===` and `!==`.
     *
     * @see https://eslint.org/docs/rules/eqeqeq
     */
    eqeqeq: [ERROR, 'smart'],

    /**
     * Disallow the use of `alert`, `confirm`, and `prompt`.
     *
     * @see https://eslint.org/docs/rules/no-alert
     */
    'no-alert': INCONSISTENCY,

    /**
     * Disallow else blocks after return statements in if statements.
     *
     * @see https://eslint.org/docs/rules/no-else-return
     */
    'no-else-return': INCONSISTENCY,

    /**
     * Disallow leading or trailing decimal points in numeric literals.
     *
     * @see https://eslint.org/docs/rules/no-floating-decimal
     */
    'no-floating-decimal': INCONSISTENCY,

    /**
     * Disallow the type conversion with shorter notations.
     *
     * @see https://eslint.org/docs/rules/no-implicit-coercion
     */
    'no-implicit-coercion': [INCONSISTENCY, { allow: ['!!'] }],

    /**
     * Disallow redundant return statements.
     *
     * @see https://eslint.org/docs/rules/no-useless-return
     */
    'no-useless-return': INCONSISTENCY,

    /**
     * Disallow specified warning terms in comments.
     *
     * @see https://eslint.org/docs/rules/no-warning-comments
     */
    'no-warning-comments': [
      DEPT,
      {
        location: 'anywhere',
        terms: ['todo', 'fixme'],
      },
    ],

    /**
     * Disallow Unused Expressions.
     *
     * @see https://eslint.org/docs/rules/no-unused-expressions
     */
    'no-unused-expressions': INCONSISTENCY,

    /**
     * Require or disallow Yoda Conditions.
     *
     * @see https://eslint.org/docs/rules/yoda
     */
    yoda: [INCONSISTENCY, 'never', { exceptRange: true }],

    //
    // Variables

    /**
     * Disallow variable declarations from shadowing variables declared in the
     * outer scope.
     *
     * @see https://eslint.org/docs/rules/no-shadow
     */
    'no-shadow': INCONSISTENCY,

    /**
     * Disallow Initializing to `undefined`.
     *
     * @see https://eslint.org/docs/rules/no-undef-init
     */
    'no-undef-init': INCONSISTENCY,

    /**
     * Disallow the use of variables before they are defined.
     *
     * @see https://eslint.org/docs/rules/no-use-before-define
     */
    'no-use-before-define': [ERROR, { functions: false }],

    //
    // Stylistic Issues

    /**
     * Ignore variable cases.
     *
     * @see https://eslint.org/docs/rules/camelcase
     */
    camelcase: OFF,

    /**
     * Disallow `if` statements as the only statement in `else` blocks.
     *
     * @see https://eslint.org/docs/rules/no-lonely-if
     */
    'no-lonely-if': INCONSISTENCY,

    /**
     * Disallow ternary operators when simpler alternatives exist.
     *
     * @see https://eslint.org/docs/rules/no-unneeded-ternary
     */
    'no-unneeded-ternary': INCONSISTENCY,

    /**
     * Require or disallow assignment operator shorthand where possible.
     *
     * @see https://eslint.org/docs/rules/operator-assignment
     */
    'operator-assignment': INCONSISTENCY,

    /**
     * Require or disallow assignment operator shorthand where possible.
     *
     * @see https://eslint.org/docs/rules/prefer-object-spread
     */
    'prefer-object-spread': INCONSISTENCY,

    /**
     * Enforce the consistent use of single quotes and disallow usage of
     * obsolete template literals.
     *
     * @see https://eslint.org/docs/rules/quotes
     */
    quotes: [
      INCONSISTENCY,
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],

    //
    // ECMAScript 6

    /**
     * Require braces around arrow function bodies.
     *
     * @see https://eslint.org/docs/rules/arrow-body-style
     */
    'arrow-body-style': [
      INCONSISTENCY,
      'as-needed',
      { requireReturnForObjectLiteral: false },
    ],

    /**
     * Disallow unnecessary computed property keys on objects.
     *
     * @see https://eslint.org/docs/rules/no-useless-computed-key
     */
    'no-useless-computed-key': INCONSISTENCY,

    /**
     * Disallow renaming import, export, and destructured assignments to the
     * same name.
     *
     * @see https://eslint.org/docs/rules/no-useless-rename
     */
    'no-useless-rename': INCONSISTENCY,

    /**
     * Require `let` or `const` instead of `var`.
     *
     * @see https://eslint.org/docs/rules/no-var
     */
    'no-var': INCONSISTENCY,

    /**
     * Require method and property shorthand syntax for object literals.
     *
     * @see https://eslint.org/docs/rules/object-shorthand
     */
    'object-shorthand': [INCONSISTENCY, 'always', { avoidQuotes: true }],

    /**
     * Require using arrow functions for callbacks.
     *
     * @see https://eslint.org/docs/rules/prefer-arrow-callback
     */
    'prefer-arrow-callback': [
      INCONSISTENCY,
      { allowUnboundThis: true, allowNamedFunctions: false },
    ],

    /**
     * Do not enforce constants.
     *
     * @see https://eslint.org/docs/rules/prefer-const
     */
    'prefer-const': OFF,

    /**
     * Prefer destructuring from arrays and objects.
     *
     * @see https://eslint.org/docs/rules/prefer-destructuring
     */
    'prefer-destructuring': [
      INCONSISTENCY,
      {
        VariableDeclarator: { array: true, object: true },
        AssignmentExpression: { array: false, object: false },
      },
      { enforceForRenamedProperties: false },
    ],

    /**
     * Disallow parseInt() and Number.parseInt() in favor of binary, octal,
     * and hexadecimal literals.
     *
     * @see https://eslint.org/docs/rules/prefer-numeric-literals
     */
    'prefer-numeric-literals': INCONSISTENCY,

    /**
     * Require template literals instead of string concatenation.
     *
     * @see https://eslint.org/docs/rules/prefer-template
     */
    'prefer-template': INCONSISTENCY,

    //
    // @superdispatch/eslint-plugin
    //

    '@superdispatch/camelcase': INCONSISTENCY,

    //
    // eslint-plugin-import
    //

    //
    // Helpful warnings

    /**
     * Report use of exported name as identifier of default export.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
     */
    'import/no-named-as-default': INCONSISTENCY,

    /**
     * Report use of exported name as identifier of default export.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/import/no-named-as-default-member.md
     */
    'import/no-named-as-default-member': INCONSISTENCY,

    /**
     * Report imported names marked with `@deprecated` documentation tag.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
     */
    'import/no-deprecated': DEPT,

    /**
     * Forbid the use of mutable exports with `var` or `let`.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
     */
    'import/no-mutable-exports': INCONSISTENCY,

    //
    // Style guide

    /**
     * Ensure all imports appear before other statements
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
     */
    'import/first': INCONSISTENCY,

    /**
     * Report repeated import of the same module in multiple places
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
     */
    'import/no-duplicates': INCONSISTENCY,

    /**
     * Forbid anonymous values as default exports.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md
     */
    'import/no-anonymous-default-export': [
      INCONSISTENCY,
      {
        allowArray: false,
        allowObject: false,
        allowLiteral: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowCallExpression: false,
        allowAnonymousFunction: false,
      },
    ],
  },
};
