import { Linter } from 'eslint';

export function injectConfigs(
  config: Linter.Config,
  ...configs: string[]
): void {
  if (!config.extends) {
    config.extends = [];
  } else if (!Array.isArray(config.extends)) {
    config.extends = [config.extends];
  }

  config.extends.push(...configs);
}

export function injectPlugins(
  config: Linter.Config,
  ...configs: string[]
): void {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(...configs);
}

export function injectRules(
  config: Linter.Config,
  rules: Linter.RulesRecord,
): void {
  if (!config.rules) {
    config.rules = {};
  }

  Object.assign(config.rules, rules);
}
