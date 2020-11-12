import { getNodeConfig } from './node';
import { injectRules } from './utils/configUtils';

export function getNodePackageConfig() {
  const config = getNodeConfig();

  injectRules(config, {
    'node/no-unpublished-require': 'error',
  });

  return config;
}
