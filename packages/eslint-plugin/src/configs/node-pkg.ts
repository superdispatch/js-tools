import { Linter } from 'eslint';

import { getNodeConfig } from './node';
import { injectRules } from './utils/configUtils';

export function getNodePackageConfig(): Linter.Config {
  const config = getNodeConfig();

  injectRules(config, {
    'node/no-unpublished-require': 'error',
  });

  return config;
}
