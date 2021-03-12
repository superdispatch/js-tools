import confusingBrowserGlobals from 'confusing-browser-globals';
import { Linter } from 'eslint';
import { injectConfigs, injectPlugins, injectRules } from './utils/configUtils';

const restrictedGlobals = [
  'error',
  'isNaN',
  'isFinite',
  ...confusingBrowserGlobals,
].map((name) => {
  switch (name) {
    case 'event':
    case 'error':
      return { message: 'Use local parameter instead.', name };

    case 'isNaN':
    case 'isFinite':
      return { message: `Use 'Number.${name}' instead.`, name };

    default:
      return { message: `Use 'window.${name}' instead.`, name };
  }
});

export function createBaseConfig() {
  const config: Linter.Config = {
    parserOptions: { ecmaVersion: 2020 },
    root: true,
  };

  //
  // eslint
  //

  injectConfigs(config, 'eslint:recommended');
  injectRules(config, {
    curly: ['error', 'multi-line', 'consistent'],
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'func-names': ['error', 'as-needed'],
    'no-alert': 'error',
    'no-cond-assign': 'off',
    'no-console': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-floating-decimal': 'error',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'no-lonely-if': 'error',
    'no-restricted-globals': ['error', ...restrictedGlobals],
    'no-shadow': 'error',
    'no-undef-init': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'no-use-before-define': ['error', { functions: false }],
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-warning-comments': [
      'warn',
      { location: 'anywhere', terms: ['todo', 'fixme'] },
    ],
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'operator-assignment': 'error',
    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: false, allowUnboundThis: true },
    ],
    'prefer-const': 'off',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: { array: false, object: false },
        VariableDeclarator: { array: true, object: true },
      },
      { enforceForRenamedProperties: false },
    ],
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: false, avoidEscape: true },
    ],
    yoda: ['error', 'never', { exceptRange: true }],
  });

  //
  // eslint-plugin-import
  //

  injectConfigs(config, 'plugin:import/errors', 'plugin:import/warnings');
  injectRules(config, {
    'import/first': 'error',
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
    'import/no-duplicates': 'off',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  });

  //
  // eslint-plugin-array-func
  //

  injectPlugins(config, 'array-func');
  injectRules(config, {
    'array-func/avoid-reverse': 'error',
    'array-func/from-map': 'error',
    'array-func/no-unnecessary-this-arg': 'error',
    'array-func/prefer-array-from': 'error',
    'array-func/prefer-flat': 'error',
    'array-func/prefer-flat-map': 'error',
  });

  //
  // eslint-plugin-eslint-comments
  //

  injectPlugins(config, 'eslint-comments');
  injectRules(config, {
    'eslint-comments/disable-enable-pair': 'error',
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',
    'eslint-comments/no-use': 'error',
  });

  //
  // eslint-config-prettier - it should be last extended config.
  //
  injectConfigs(config, 'prettier');

  return config;
}
