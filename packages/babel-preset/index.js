'use strict';

const path = require('path');

function inlineKeys(keys) {
  return keys.map(key => JSON.stringify(key)).join(', ');
}

function createError(message) {
  return new Error(`[@superdispatch/babel-preset] ${message}`);
}

module.exports = (
  api,
  {
    targets = null,
    loose = false,
    jsx: transpileJSX = true,
    typescript: transpileTypeScript = true,
    optimize: {
      react: optimizeReact = true,
      runtime: optimizeRuntime = true,
      ...unknownOptimizations
    } = {},
    ...unknownOptions
  } = {},
) => {
  const isTest = api.env('test');
  const isProduction = api.env('production');
  const isDevelopment = api.env('development');

  if (!isTest && !isProduction && !isDevelopment) {
    throw new Error(
      'Unknown "env", expected one of: "test", "production", "development"',
    );
  }

  const unknownOptionKeys = Object.keys(unknownOptions);

  if (unknownOptionKeys.length > 0) {
    throw createError(`Unknown options: ${inlineKeys(unknownOptionKeys)}.`);
  }

  const unknownOptimizationsKeys = Object.keys(unknownOptimizations);

  if (unknownOptimizationsKeys.length > 0) {
    throw createError(
      `Unknown optimization options: ${inlineKeys(unknownOptimizationsKeys)}.`,
    );
  }

  if (targets && typeof targets !== 'string') {
    throw new Error(
      `Invalid "targets", expected "string", but got: ${JSON.stringify(
        targets,
      )}`,
    );
  }

  const presets = [];
  const plugins = [];

  presets.push([
    /**
     * @see https://babeljs.io/docs/en/babel-preset-env
     */
    '@babel/preset-env',
    isTest
      ? { targets: { node: 'current' } }
      : {
          /**
           * Describes the environments you support/target for your project.
           */
          targets: targets || undefined,

          /**
           * Enable "loose" transformations for any plugins in this preset that
           * allow them.
           * @see https://2ality.com/2015/12/babel6-loose-mode.html
           */
          loose,

          /**
           * Disable transformation of ES6 module syntax to another module type.
           */
          modules: false,

          /**
           * An array of plugins to always exclude/remove.
           */
          exclude: [
            /**
             * Disable `typeof` transformations for `Symbol` that slows runtime.
             *
             * @see https://babeljs.io/docs/en/next/babel-plugin-transform-typeof-symbol.html
             */
            'transform-typeof-symbol',
          ],

          /**
           *  Add direct references to core-js modules as bare imports.
           */
          useBuiltIns: 'entry',

          /**
           * Use latest CoreJS version.
           */
          corejs: 3,

          /**
           * Do not use `browserslist` config when `targets` are defined, which
           * includes searching for any `browserslist` files or referencing the
           * `browserslist` key inside `package.json`.
           */
          ignoreBrowserslistConfig: !!targets,
        },
  ]);

  if (isTest) {
    plugins.push(
      /**
       * @see https://github.com/airbnb/babel-plugin-dynamic-import-node
       */
      'babel-plugin-dynamic-import-node',
    );
  } else {
    plugins.push(
      /**
       * @see https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
       */
      '@babel/plugin-syntax-dynamic-import',
    );
  }

  plugins.push(
    /**
     * @see https://babeljs.io/docs/en/babel-plugin-proposal-numeric-separator
     */
    '@babel/plugin-proposal-numeric-separator',
  );

  plugins.push([
    /**
     * @see https://babeljs.io/docs/en/babel-plugin-proposal-numeric-separator
     */
    '@babel/plugin-proposal-object-rest-spread',
    {
      /**
       * Use `Object.assign`.
       */
      loose,

      /**
       * Use `Object.assign` directly instead of the Babel's extends helper.
       */
      useBuiltIns: true,
    },
  ]);

  plugins.push([
    /**
     * @see https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
     */
    '@babel/plugin-proposal-optional-chaining',
    {
      /**
       * Pretend `document.all` does not exist, and perform loose equality
       * checks with `null` instead of strict equality checks against both
       * `null` and `undefined`.
       */
      loose,
    },
  ]);

  plugins.push([
    /**
     * @see https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator
     */
    '@babel/plugin-proposal-nullish-coalescing-operator',
    {
      /**
       * Pretend `document.all` does not exist, and perform loose equality
       * checks with `null` instead of strict equality checks against both
       * `null` and `undefined`.
       */
      loose,
    },
  ]);

  if (transpileJSX) {
    presets.push([
      /**
       * @see https://babeljs.io/docs/en/babel-preset-react
       */
      '@babel/preset-react',
      {
        /**
         * Will use the native built-in instead of trying to polyfill behavior
         * for any plugins that require one.
         */
        useBuiltIns: true,

        /**
         * Toggles plugins that aid in development, such as
         * `@babel/plugin-transform-react-jsx-self` and
         * `@babel/plugin-transform-react-jsx-source`.
         */
        development: isTest || isDevelopment,
      },
    ]);
  }

  if (transpileTypeScript) {
    presets.push(
      /**
       * @see https://babeljs.io/docs/en/babel-preset-typescript
       */
      '@babel/preset-typescript',
    );

    plugins.push(
      [
        /**
         * @see https://babeljs.io/docs/en/babel-plugin-proposal-decorators
         */
        '@babel/plugin-proposal-decorators',
        {
          /**
           * Use the legacy (stage 1) decorators syntax and behavior.
           */
          legacy: true,

          /**
           * This option was added to help tc39 collect feedback from the
           * community by allowing experimentation with both possible syntaxes.
           */
          decoratorsBeforeExport: true,
        },
      ],
      [
        /**
         * @see https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
         */
        '@babel/plugin-proposal-class-properties',
        {
          /**
           * Class properties are compiled to use an assignment expression
           * instead of `Object.defineProperty`.
           */
          loose,
        },
      ],
    );
  }

  if (optimizeReact) {
    plugins.push([
      /**
       * @see https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
       */
      'babel-plugin-transform-react-remove-prop-types',
      {
        /**
         * Remove import statements.
         */
        removeImport: true,
      },
    ]);
  }

  if (optimizeRuntime) {
    plugins.push([
      /**
       * @see https://babeljs.io/docs/en/babel-plugin-transform-runtime
       */
      '@babel/plugin-transform-runtime',

      {
        /**
         * Replace inlined Babel helpers (`classCallCheck`, `extends`, etc.)
         * with calls to `moduleName`.
         */
        helpers: true,

        /**
         * Get `@babel/runtime` version from installed one.
         */
        // eslint-disable-next-line node/no-unpublished-require
        version: require('@babel/runtime/package.json').version,

        /**
         * Use absolute path to `@babel/runtime`.
         */
        absoluteRuntime: path.dirname(
          // eslint-disable-next-line node/no-unpublished-require
          require.resolve('@babel/runtime/package.json'),
        ),
      },
    ]);
  }

  return { presets, plugins };
};
