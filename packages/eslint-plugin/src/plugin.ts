'use strict';

import { getBaseConfig } from './configs/base';
import { getJestConfig } from './configs/jest';
import { getNodeConfig } from './configs/node';
import { getNodePackageConfig } from './configs/node-pkg';
import { getReactConfig } from './configs/react';
import { getTSCypressConfig } from './configs/ts-cypress';
import { getTSJestConfig } from './configs/ts-jest';
import { getTypeScriptConfig } from './configs/typescript';
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
  base: getBaseConfig(),
  jest: getJestConfig(),
  'ts-jest': getTSJestConfig(),
  'ts-cypress': getTSCypressConfig(),
  node: getNodeConfig(),
  'node-pkg': getNodePackageConfig(),
  react: getReactConfig(),
  typescript: getTypeScriptConfig(),
} as const;
