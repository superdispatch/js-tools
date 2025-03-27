import { createBaseConfig } from './configs/base';
import { createJestConfig } from './configs/jest';
import { createNodeConfig } from './configs/node';
import { createNodePackageConfig } from './configs/node-pkg';
import { createReactConfig } from './configs/react';
import { createTSCypressConfig } from './configs/ts-cypress';
import { createTSJestConfig } from './configs/ts-jest';
import { createTSNodeConfig } from './configs/ts-node';
import { createTypeScriptConfig } from './configs/typescript';

export const configs = {
  base: createBaseConfig(),
  jest: createJestConfig(),
  'ts-jest': createTSJestConfig(),
  'ts-cypress': createTSCypressConfig(),
  node: createNodeConfig(),
  'ts-node': createTSNodeConfig(),
  'node-pkg': createNodePackageConfig(),
  react: createReactConfig(),
  typescript: createTypeScriptConfig(),
} as const;
