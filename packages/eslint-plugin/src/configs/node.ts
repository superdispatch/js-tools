import { Linter } from 'eslint';
import { createBaseConfig } from './base';
import { injectConfigs, injectEnv, injectRules } from './utils/configUtils';

export function createNodeConfig(): Linter.Config {
  const config = createBaseConfig();

  //
  // eslint
  //

  injectEnv(config, { node: true });
  injectRules(config, {
    'no-console': 'off',
    strict: ['error', 'global'],
  });

  //
  // eslint-plugin-node
  //

  injectConfigs(config, 'plugin:node/recommended-script');
  injectRules(config, {
    'node/exports-style': 'error',
    'node/no-extraneous-import': 'off',
    'node/no-extraneous-require': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/prefer-global/buffer': 'error',
    'node/prefer-global/console': 'error',
    'node/prefer-global/process': 'error',
    'node/prefer-global/text-decoder': 'error',
    'node/prefer-global/text-encoder': 'error',
    'node/prefer-global/url': 'error',
    'node/prefer-global/url-search-params': 'error',
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
  });

  //
  // eslint-plugin-import
  //

  injectRules(config, {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  });

  return config;
}
