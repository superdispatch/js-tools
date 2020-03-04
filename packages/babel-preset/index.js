'use strict';

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
  const { NODE_ENV = 'production' } = process.env;
  const isTest = NODE_ENV === 'test';
  const isProduction = NODE_ENV === 'production';
  const isDevelopment = NODE_ENV === 'development';

  if (!isTest && !isProduction && !isDevelopment) {
    throw new Error(
      `Unknown "env", expected one of: "test", "production", "development" but got "${NODE_ENV}".`,
    );
  }

  if (!isTest && !isProduction && !isDevelopment) {
    throw new Error(
      'Unknown "env", expected one of: "test", "production", "development".',
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
          targets:
            targets === 'esmodules'
              ? { esmodules: true }
              : targets
              ? { browsers: targets }
              : undefined,

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

  plugins.push(
    /**
     * @see https://babeljs.io/docs/en/babel-plugin-proposal-numeric-separator
     */
    '@babel/plugin-proposal-numeric-separator',
  );

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
         * Wrap `propTypes` with `NODE_ENV` check.
         */
        mode: 'wrap',
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
        version: require('@babel/runtime/package.json').version,
      },
    ]);
  }

  return { presets, plugins };
};
