import { ESLint, Linter } from 'eslint';
import snapshotDiff from 'snapshot-diff';

import { configs } from '../../plugin';

async function getFullConfig(
  name: keyof typeof configs,
  fileName = 'some/file.js',
  parserOptions: Linter.ParserOptions = {},
): Promise<Linter.Config> {
  const cli = new ESLint({
    useEslintrc: false,
    baseConfig: configs[name] as Linter.Config,
    overrideConfig: { parserOptions },
  });

  const { parser, ...config } = (await cli.calculateConfigForFile(
    fileName,
  )) as Linter.Config;

  delete config.ignorePatterns;
  delete config.noInlineConfig;
  delete config.reportUnusedDisableDirectives;

  return {
    ...config,
    parser: parser?.slice(parser.indexOf('node_modules')),
  };
}

function diff(a: unknown, b: unknown) {
  return snapshotDiff(a, b, {
    colors: false,
    contextLines: 1,
    stablePatchmarks: true,
  });
}

export type ConfigValues = [
  meta: Omit<Linter.Config, 'rules'>,
  rules: Partial<Linter.RulesRecord>,
];

export async function getConfigValues(
  name: keyof typeof configs,
  fileName?: string,
  parserOptions?: Linter.ParserOptions,
): Promise<ConfigValues> {
  const { rules = {}, ...meta } = await getFullConfig(
    name,
    fileName,
    parserOptions,
  );

  return [meta, rules];
}

export function getConfigsDiff(
  [baseMeta, baseRules]: ConfigValues,
  [meta, rules]: ConfigValues,
): [metaDiff: string, rulesDiff: string] {
  return [diff(baseMeta, meta), diff(baseRules, rules)];
}
