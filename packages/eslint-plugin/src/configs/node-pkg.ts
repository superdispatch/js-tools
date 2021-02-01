import { Linter } from 'eslint';
import { createNodeConfig } from './node';
import { injectRules } from './utils/configUtils';

export function createNodePackageConfig(): Linter.Config {
  const config = createNodeConfig();

  injectRules(config, {
    'node/no-unpublished-require': 'error',
  });

  return config;
}
