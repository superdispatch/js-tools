/**
 * @typedef {import("eslint").Linter.Config} Config
 * */

'use strict';

const { OFF, ERROR } = require('./internal/error-codes');

const pluginRules = {
  import: {
    /**
     * Forbid the use of extraneous packages.
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/HEAD/docs/rules/no-extraneous-dependencies.md
     */
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
  node: {
    /**
     * Enforce either `module.exports` or `exports`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md
     */
    'node/exports-style': ERROR,

    /**
     * Disable in favour of `import/no-extraneous-dependencies`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-extraneous-require.md
     */
    'node/no-extraneous-require': OFF,

    /**
     * Allow `require()` expressions which import private modules.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-require.md
     */
    'node/no-unpublished-require': OFF,

    /**
     * Enforce global `Buffer` instead of `require("buffer").Buffer`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md
     */
    'node/prefer-global/buffer': ERROR,

    /**
     * Enforce global `console` instead of `require("console")`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md
     */
    'node/prefer-global/console': ERROR,

    /**
     * Enforce global `process` instead of `require("process")`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md
     */
    'node/prefer-global/process': ERROR,

    /**
     * Enforce global `TextDecoder` instead of `require("util").TextDecoder`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-decoder.md
     */
    'node/prefer-global/text-decoder': ERROR,

    /**
     * Enforce global `TextEncoder` instead of `require("util").TextEncoder`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-encoder.md
     */
    'node/prefer-global/text-encoder': ERROR,

    /**
     * Enforce global `URL` instead of `require("url").URL`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md
     */
    'node/prefer-global/url': ERROR,

    /**
     * Enforce global `URLSearchParams` instead of `require("url").URLSearchParams`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url-search-params.md
     */
    'node/prefer-global/url-search-params': ERROR,

    /**
     * Enforce `require("dns").promises`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/dns.md
     */
    'node/prefer-promises/dns': ERROR,

    /**
     * Enforce `require("fs").promises`.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/fs.md
     */
    'node/prefer-promises/fs': ERROR,
  },
};

/**
 * @type {Config}
 * */
module.exports = {
  env: { node: true },

  extends: [require.resolve('./base'), 'plugin:node/recommended-script'],

  plugins: ['node'],

  rules: {
    /**
     * Disallow the use of `console`.
     *
     * @see https://eslint.org/docs/rules/no-console
     */
    'no-console': OFF,

    /**
     * Require strict mode directives.
     *
     * @see https://eslint.org/docs/rules/strict
     */
    strict: [ERROR, 'global'],

    ...pluginRules.import,
    ...pluginRules.node,
  },
};
