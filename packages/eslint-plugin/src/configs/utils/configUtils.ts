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

  for (const name of configs) {
    if (!config.extends.includes(name)) {
      config.extends.push(name);
    }
  }
}

export function injectPlugins(
  config: Linter.Config,
  ...plugins: string[]
): void {
  if (!config.plugins) {
    config.plugins = [];
  }

  for (const plugin of plugins) {
    if (!config.plugins.includes(plugin)) {
      config.plugins.push(plugin);
    }
  }
}

export function injectRules(
  config: Linter.Config,
  rules: Partial<Linter.RulesRecord>,
): void {
  if (!config.rules) {
    config.rules = {};
  }

  Object.assign(config.rules, rules);
}
