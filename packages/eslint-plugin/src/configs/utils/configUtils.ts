import { Linter } from 'eslint';

export function injectEnv(
  config: Linter.Config,
  env: Record<string, boolean>,
): void {
  if (!config.env) {
    config.env = {};
  }

  Object.assign(config.env, env);
}

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
