'use strict';

import { Linter } from 'eslint';

import { ERROR } from './internal/error-codes';

const config: Linter.Config = {
  extends: [require.resolve('./node')],

  rules: {
    /**
     * Disallow `require()` expressions which import private modules.
     *
     * @see https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-unpublished-require.md
     */
    'node/no-unpublished-require': ERROR,
  },
};

module.exports = config;
