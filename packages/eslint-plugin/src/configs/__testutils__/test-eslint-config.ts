import { Linter } from 'eslint';
import execa from 'execa';
import path from 'path';
import snapshotDiff from 'snapshot-diff';
import { isDeepStrictEqual } from 'util';

function omitEqualRules(
  a: Partial<Linter.RulesRecord>,
  b: Partial<Linter.RulesRecord>,
) {
  const result: Linter.RulesRecord = {};
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);

  allKeys.forEach(key => {
    if (!isDeepStrictEqual(a[key], b[key])) {
      result[key] = b[key]!;
    }
  });

  return result;
}

async function getConfig(name: string, dev?: boolean): Promise<Linter.Config> {
  const env = { ...process.env };
  const configPath = path.join(
    __dirname,
    '../../../dist/configs',
    `${name}.js`,
  );

  if (dev) {
    env.CI = 'false';
    env.NODE_ENV = 'development';
  }

  try {
    const { stdout } = await execa(
      'eslint',
      [
        '--no-eslintrc',
        `--config=${configPath}`,
        '--print-config=config/foo.js',
      ],
      { env },
    );

    const { parser, ...config } = JSON.parse(stdout);

    delete config.ignorePatterns;

    return {
      ...config,
      parser: parser && path.relative(process.cwd(), parser),
    };
  } catch (error) {
    if (error.stderr) {
      throw new Error(error.stderr);
    }

    throw error;
  }
}

function diff(a: any, b: any) {
  return snapshotDiff(a, b, { contextLines: 1, stablePatchmarks: true });
}

async function getConfigValues(configName: string, baseConfigName?: string) {
  const { rules, ...meta } = await getConfig(configName);

  if (!baseConfigName) {
    return [meta, rules];
  }

  const { rules: baseRules, ...baseMeta } = await getConfig(baseConfigName);

  return [diff(baseMeta, meta), diff(baseRules, rules)];
}

async function getDevConfigDiff(configName: string, baseConfigName?: string) {
  const [{ rules = {} }, { rules: devRules = {} }] = await Promise.all([
    getConfig(configName),
    getConfig(configName, true),
  ]);

  if (!baseConfigName) {
    return diff(rules, devRules);
  }

  const [
    { rules: baseRules = {} },
    { rules: baseDevRules = {} },
  ] = await Promise.all([
    getConfig(baseConfigName),
    getConfig(baseConfigName, true),
  ]);

  const rulesDiff = omitEqualRules(baseRules, rules);
  const devRulesDiff = omitEqualRules(baseDevRules, devRules);

  return diff(rulesDiff, devRulesDiff);
}

export { getConfigValues, getDevConfigDiff };
