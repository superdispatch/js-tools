/**
 * @typedef {import("eslint").Linter.Config} Config
 * */
'use strict';

const {
  OFF,
  ERROR,
  WARNING,
  INCONSISTENCY,
} = require('./internal/error-codes');

/**
 * @type {Config}
 * */
module.exports = {
  env: { browser: true },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: ['plugin:react/recommended', 'prettier/react'],

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
     * Disallow unnecessary curly braces in JSX props and children.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
     */
    'react/jsx-curly-brace-presence': [
      INCONSISTENCY,
      { props: 'never', children: 'never' },
    ],

    /**
     * Disallow unnecessary fragments.
     *
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
     */
    'react/jsx-no-useless-fragment': INCONSISTENCY,

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

    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,

    //
    // eslint-plugin-jsx-a11y
    //

    /**
     * Enforces to use accessibility attributes with emoji.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md
     * */
    'jsx-a11y/accessible-emoji': WARNING,

    /**
     * Enforce that all elements that require alternative text have meaningful information to relay back to the end user.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
     * */
    'jsx-a11y/alt-text': WARNING,

    /**
     * Enforce that anchors have content and that the content is accessible to screen readers.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md
     * */
    'jsx-a11y/anchor-has-content': WARNING,

    /**
     * Enforces proper use of anchor tag.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
     * */
    'jsx-a11y/anchor-is-valid': [
      WARNING,
      {
        aspects: ['noHref', 'invalidHref'],
      },
    ],

    /**
     * This will fail if it finds an aria-* property that is not listed in WAI-ARIA States and Properties spec.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
     * */
    'jsx-a11y/aria-props': WARNING,

    /**
     * ARIA state and property values must be valid.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
     * */
    'jsx-a11y/aria-proptypes': WARNING,

    /**
     * Elements with ARIA roles must use a valid, non-abstract ARIA role.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
     * */
    'jsx-a11y/aria-role': [WARNING, { ignoreNonDOM: true }],

    /**
     * This rule enforces that these DOM elements do not contain the role and/or aria-* props.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md
     * */
    'jsx-a11y/aria-unsupported-elements': WARNING,

    /**
     * Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md
     * */
    'jsx-a11y/heading-has-content': WARNING,

    /**
     * Enforce img alt attribute does not contain the word image, picture, or photo.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md
     * */
    'jsx-a11y/img-redundant-alt': WARNING,

    /**
     * Enforce no accessKey prop on element.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md
     * */
    'jsx-a11y/no-access-key': WARNING,

    /**
     * Enforces that no distracting elements are used.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md
     * */
    'jsx-a11y/no-distracting-elements': WARNING,

    /**
     * Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
     * */
    'jsx-a11y/no-redundant-roles': WARNING,

    /**
     * Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that role.
     *
     * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
     * */
    'jsx-a11y/role-supports-aria-props': WARNING,
  },
};
