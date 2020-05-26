/**
 * @typedef {import("eslint").Linter.Config} Config
 * */
'use strict';

const { OFF, ERROR, INCONSISTENCY } = require('./internal/error-codes');

/**
 * @type {Config}
 * */
module.exports = {
  env: { browser: true },
  extends: ['plugin:react/recommended', 'prettier/react'],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],

  rules: {
    //
    // @superdispatch/eslint-plugin
    //

    '@superdispatch/jsx-no-spread-object-expression': INCONSISTENCY,

    //
    // eslint-plugin-jsx-a11y
    //

    /**
     * Enforces to use accessibility attributes with emoji.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md
     * */
    'jsx-a11y/accessible-emoji': INCONSISTENCY,

    /**
     * Enforce elements with aria-activedescendant are tabbable.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md
     * */
    'jsx-a11y/aria-activedescendant-has-tabindex': INCONSISTENCY,

    /**
     * This will fail if it finds an aria-* property that is not listed in WAI-ARIA States and Properties spec.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
     * */
    'jsx-a11y/aria-props': INCONSISTENCY,

    /**
     * ARIA state and property values must be valid.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
     * */
    'jsx-a11y/aria-proptypes': INCONSISTENCY,

    /**
     * Elements with ARIA roles must use a valid, non-abstract ARIA role.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
     * */
    'jsx-a11y/aria-role': [INCONSISTENCY, { ignoreNonDOM: true }],

    /**
     * Enforce no accessKey prop on element.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md
     * */
    'jsx-a11y/no-access-key': INCONSISTENCY,

    /**
     * Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
     * */
    'jsx-a11y/no-redundant-roles': INCONSISTENCY,

    /**
     * Enforce that elements with ARIA roles must have all required attributes for that role.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md
     * */
    'jsx-a11y/role-has-required-aria-props': INCONSISTENCY,

    /**
     * Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that role.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
     * */
    'jsx-a11y/role-supports-aria-props': INCONSISTENCY,

    /**
     * Enforce scope prop is only used on elements.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md
     * */
    'jsx-a11y/scope': INCONSISTENCY,

    /**
     * Enforce tabIndex value is not greater than zero.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md
     * */
    'jsx-a11y/tabindex-no-positive': INCONSISTENCY,

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
     * Disallow unnecessary curly braces in JSX props and children.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
     */
    'react/jsx-curly-brace-presence': [
      INCONSISTENCY,
      { children: 'never', props: 'never' },
    ],

    /**
     * Enforce shorthand or standard form for React fragments.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
     */
    'react/jsx-fragments': [INCONSISTENCY, 'syntax'],

    /**
     * Disallow unnecessary fragments.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
     */
    'react/jsx-no-useless-fragment': INCONSISTENCY,

    /**
     * Prevent problem with children and props.dangerouslySetInnerHTML.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-danger-with-children.md
     */
    'react/no-danger-with-children': INCONSISTENCY,

    /**
     * Disable props validation in a React component definition.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/prop-types.md
     */
    'react/prop-types': OFF,

    /**
     * Prevent extra closing tags for components without children.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/self-closing-comp.md
     */
    'react/self-closing-comp': INCONSISTENCY,

    //
    // eslint-plugin-react-hooks
    //

    'react-hooks/exhaustive-deps': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
  },
};
