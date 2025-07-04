import { PluginItem } from '@babel/core';
import { readFileSync } from 'fs';
import { format } from 'util';

function getBabelRuntimeVersion(): string {
  const json = readFileSync(
    require.resolve('@babel/runtime/package.json'),
    'utf-8',
  );
  const { version } = JSON.parse(json) as { version: string };

  return version;
}

export interface PresetOptions {
  loose?: boolean;
  typescript?: boolean;
  jsx?: boolean | string;
  targets?: null | string;
  optimize?: {
    react?: boolean;
    runtime?: boolean;
    pureCalls?: boolean;
    devExpressions?: boolean;
  };
}

export default function preset(
  _: unknown,
  {
    loose = false,
    targets = null,
    jsx: transpileJSX = true,
    typescript: transpileTypeScript = true,
    optimize: {
      react: optimizeReact = true,
      runtime: optimizeRuntime = true,
      pureCalls: optimizePureCalls = false,
      devExpressions: optimizeDevExpressions = false,
      ...unknownOptimizations
    } = {},
    ...unknownOptions
  }: PresetOptions = {},
) {
  const { NODE_ENV = 'production' } = process.env;
  const isTest = NODE_ENV === 'test';
  const isProduction = NODE_ENV === 'production';
  const isDevelopment = NODE_ENV === 'development';

  if (!isTest && !isProduction && !isDevelopment) {
    throw new Error(
      format(
        'Unknown "env", expected one of: "test", "production", "development" but got %j.',
        NODE_ENV,
      ),
    );
  }

  const unknownOptionKeys = Object.keys(unknownOptions);

  if (unknownOptionKeys.length > 0) {
    throw new Error(format('Unknown options: %j', unknownOptionKeys));
  }

  const unknownOptimizationsKeys = Object.keys(unknownOptimizations);

  if (unknownOptimizationsKeys.length > 0) {
    throw new Error(
      format('Unknown optimization options: %j', unknownOptimizationsKeys),
    );
  }

  if (targets && typeof targets !== 'string') {
    throw new Error(
      format(
        'Invalid "targets" option, expected "string", but got: %j',
        targets,
      ),
    );
  }

  if (typeof transpileJSX !== 'boolean' && transpileJSX !== 'runtime') {
    throw new Error(
      format(
        'Invalid "jsx" option, expected "boolean" or "runtime", but got: %j',
        transpileJSX,
      ),
    );
  }

  const presets: PluginItem[] = [];
  const plugins: PluginItem[] = [];

  /**
   * @link https://babeljs.io/docs/en/babel-preset-env
   */
  if (isTest) {
    presets.push(['@babel/preset-env', { targets: { node: 'current' } }]);
  } else {
    presets.push([
      '@babel/preset-env',
      {
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
         *
         * @link https://2ality.com/2015/12/babel6-loose-mode.html
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
           * @link https://babeljs.io/docs/en/next/babel-plugin-transform-typeof-symbol.html
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
  }

  /**
   * @link https://babeljs.io/docs/en/babel-plugin-transform-numeric-separator
   */
  plugins.push('@babel/plugin-transform-numeric-separator');

  if (transpileJSX) {
    /**
     * @link https://babeljs.io/docs/en/babel-preset-react
     */
    presets.push([
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

        /**
         * `"automatic"` auto imports the functions that JSX transpiles to.
         * `"classic"` does not automatic import anything.
         */
        runtime: transpileJSX === 'runtime' ? 'automatic' : 'classic',
      },
    ]);
  }

  if (transpileTypeScript) {
    /**
     * @link https://babeljs.io/docs/en/babel-preset-typescript
     */
    presets.push('@babel/preset-typescript');

    /**
     * @link https://babeljs.io/docs/en/babel-plugin-proposal-decorators
     */
    plugins.push([
      '@babel/plugin-proposal-decorators',
      {
        /**
         * Use the legacy (stage 1) decorators syntax and behavior.
         */
        legacy: true,
      },
    ]);

    /**
     * @link https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
     */
    plugins.push([
      '@babel/plugin-transform-class-properties',
      {
        /**
         * Class properties are compiled to use an assignment expression
         * instead of `Object.defineProperty`.
         */
        loose,
      },
    ]);
  }

  if (optimizeReact) {
    /**
     * @link https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
     */
    plugins.push([
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
    /**
     * @link https://babeljs.io/docs/en/babel-plugin-transform-runtime
     */
    plugins.push([
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
        version: getBabelRuntimeVersion(),
      },
    ]);
  }

  if (optimizePureCalls) {
    /**
     * @see https://github.com/Andarist/babel-plugin-annotate-pure-calls
     */
    plugins.push('babel-plugin-annotate-pure-calls');
  }

  if (isProduction && optimizeDevExpressions) {
    /**
     * @see https://github.com/4Catalyzer/babel-plugin-dev-expression
     */
    plugins.push('babel-plugin-dev-expression');
  }

  return { presets, plugins };
}
