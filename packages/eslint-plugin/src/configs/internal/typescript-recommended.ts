import { configs } from '@typescript-eslint/eslint-plugin';
import { Linter } from 'eslint';

const { base, recommended, 'eslint-recommended': eslintRecommended } = configs;

function collectAllRules(config: Linter.Config): Linter.Config['rules'] {
  const rules = {};

  if (config.rules) {
    Object.assign(rules, config.rules);
  }

  if (config.overrides) {
    config.overrides.forEach(override => {
      if (override.rules) {
        Object.assign(rules, override.rules);
      }
    });
  }

  return rules;
}

const recommendedRules: Linter.Config['rules'] = {
  ...collectAllRules(recommended),
  ...collectAllRules(eslintRecommended),
};

// Remove rules covered by `base`.
delete recommendedRules['no-var'];
delete recommendedRules['prefer-const'];
delete recommendedRules['prefer-spread'];
delete recommendedRules['prefer-rest-params'];
delete recommendedRules['prefer-object-spread'];

module.exports = { ...base, rules: recommendedRules };
