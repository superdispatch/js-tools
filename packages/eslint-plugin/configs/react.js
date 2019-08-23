'use strict';

const { OFF, ERROR, INCONSISTENCY } = require('./internal/error-codes');

module.exports = {
  env: { browser: true },
  plugins: ['react', 'react-hooks'],
  extends: [require.resolve('./base'), 'plugin:react/recommended', 'prettier/react'],

  rules: {
    //
    // @superdispatch/eslint-plugin
    //

    '@superdispatch/jsx-no-spread-object-expression': INCONSISTENCY,

    //
    // eslint-plugin-react
    //

    /**
     * Enforce boolean attributes notation in JSX.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
     */
    'react/jsx-boolean-value': [INCONSISTENCY, 'always'],

    /**
     * Enforce shorthand or standard form for React fragments.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
     */
    'react/jsx-fragments': [INCONSISTENCY, 'syntax'],

    /**
     * Prevent problem with children and props.dangerouslySetInnerHTML.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-danger-with-children.md
     */
    'react/no-danger-with-children': ERROR,

    /**
     * Disable props validation in a React component definition.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/prop-types.md
     */
    'react/prop-types': OFF,

    //
    // eslint-plugin-react-hooks
    //

    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
  },
};
