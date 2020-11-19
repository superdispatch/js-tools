import { Linter } from 'eslint';

export function createReactConfig(): Linter.Config {
  return {
    env: { browser: true },
    extends: ['plugin:react/recommended', 'prettier/react'],
    plugins: ['react', 'react-hooks', 'jsx-a11y', '@superdispatch'],

    rules: {
      //
      // @superdispatch/eslint-plugin
      //

      '@superdispatch/jsx-no-spread-object-expression': 'error',

      //
      // eslint-plugin-jsx-a11y
      //

      /**
       * Enforces to use accessibility attributes with emoji.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md
       * */
      'jsx-a11y/accessible-emoji': 'error',

      /**
       * Enforce elements with aria-activedescendant are tabbable.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md
       * */
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

      /**
       * This will fail if it finds an aria-* property that is not listed in WAI-ARIA States and Properties spec.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
       * */
      'jsx-a11y/aria-props': 'error',

      /**
       * ARIA state and property values must be valid.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
       * */
      'jsx-a11y/aria-proptypes': 'error',

      /**
       * Elements with ARIA roles must use a valid, non-abstract ARIA role.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
       * */
      'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],

      /**
       * Enforce no accessKey prop on element.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md
       * */
      'jsx-a11y/no-access-key': 'error',

      /**
       * Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
       * */
      'jsx-a11y/no-redundant-roles': 'error',

      /**
       * Enforce that elements with ARIA roles must have all required attributes for that role.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md
       * */
      'jsx-a11y/role-has-required-aria-props': 'error',

      /**
       * Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that role.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
       * */
      'jsx-a11y/role-supports-aria-props': 'error',

      /**
       * Enforce scope prop is only used on elements.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md
       * */
      'jsx-a11y/scope': 'error',

      /**
       * Enforce tabIndex value is not greater than zero.
       *
       * @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md
       * */
      'jsx-a11y/tabindex-no-positive': 'error',

      //
      // eslint-plugin-react
      //

      /**
       * Enforce boolean attributes notation in JSX.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
       */
      'react/jsx-boolean-value': ['error', 'always'],

      /**
       * Disallow unnecessary curly braces in JSX props and children.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
       */
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'never', props: 'never' },
      ],

      /**
       * Enforce shorthand or standard form for React fragments.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
       */
      'react/jsx-fragments': ['error', 'syntax'],

      /**
       * Disallow unnecessary fragments.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
       */
      'react/jsx-no-useless-fragment': 'error',

      /**
       * Prevent problem with children and props.dangerouslySetInnerHTML.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-danger-with-children.md
       */
      'react/no-danger-with-children': 'error',

      /**
       * Disable props validation in a React component definition.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/prop-types.md
       */
      'react/prop-types': 'off',

      /**
       * Prevent extra closing tags for components without children.
       *
       * @see https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/self-closing-comp.md
       */
      'react/self-closing-comp': 'error',

      //
      // eslint-plugin-react-hooks
      //

      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  };
}
