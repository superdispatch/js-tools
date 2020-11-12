import { Linter } from 'eslint';

import { createNodeConfig } from './node';
import { injectTypeScriptConfig } from './typescript';
import { injectRules } from './utils/configUtils';

export function createTSNodeConfig(): Linter.Config {
  const config = createNodeConfig();

  //
  // @superdispatch/eslint-plugin
  //

  injectTypeScriptConfig(config);

  //
  // eslint
  //

  injectRules(config, {
    strict: 'off',
  });

  //
  // eslint-plugin-node
  //

  injectRules(config, {
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
  });

  return config;
}
