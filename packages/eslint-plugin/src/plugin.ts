'use strict';

import { createBaseConfig } from './configs/base';
import { createJestConfig } from './configs/jest';
import { createNodeConfig } from './configs/node';
import { createNodePackageConfig } from './configs/node-pkg';
import { createReactConfig } from './configs/react';
import { createTSCypressConfig } from './configs/ts-cypress';
import { createTSJestConfig } from './configs/ts-jest';
import { createTypeScriptConfig } from './configs/typescript';
import camelcaseRule from './rules/camelcase';
import directoryNameRule from './rules/directory-name';
import filenameRule from './rules/filename';
import jsxNoSpreadObjectExpressionRule from './rules/jsx-no-spread-object-expression';
import preferDesignSystemColorsRule from './rules/prefer-design-system-colors';

export const rules = {
  filename: filenameRule,
  camelcase: camelcaseRule,
  'directory-name': directoryNameRule,
  'prefer-design-system-colors': preferDesignSystemColorsRule,
  'jsx-no-spread-object-expression': jsxNoSpreadObjectExpressionRule,
} as const;

export const configs = {
  base: createBaseConfig(),
  jest: createJestConfig(),
  'ts-jest': createTSJestConfig(),
  'ts-cypress': createTSCypressConfig(),
  node: createNodeConfig(),
  'node-pkg': createNodePackageConfig(),
  react: createReactConfig(),
  typescript: createTypeScriptConfig(),
} as const;
