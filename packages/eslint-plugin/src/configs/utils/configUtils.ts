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

export function mergeConfigs(...configs: Linter.Config[]): Linter.Config {
  const base: Linter.Config = {};

  for (const {
    env,
    rules,
    plugins,
    extends: extendsConfigs,
    ...config
  } of configs) {
    Object.assign(base, config);

    if (env) {
      injectEnv(base, env);
    }

    if (rules) {
      injectRules(base, rules);
    }

    if (plugins) {
      injectPlugins(base, ...plugins);
    }

    if (extendsConfigs) {
      if (Array.isArray(extendsConfigs)) {
        injectConfigs(base, ...extendsConfigs);
      } else {
        injectConfigs(base, extendsConfigs);
      }
    }
  }

  return base;
}
