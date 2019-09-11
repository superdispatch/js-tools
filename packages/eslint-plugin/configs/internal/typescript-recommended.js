'use strict';

const {
  configs: { base, recommended, 'eslint-recommended': eslintRecommended },
} = require('@typescript-eslint/eslint-plugin');

function collectAllRules(config) {
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

const recommendedRules = {
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
