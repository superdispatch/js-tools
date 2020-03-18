import { Rule } from 'eslint';
import path from 'path';

function isIndexFile(filename: string) {
  return /^index\.(tsx?|jsx?)$/.test(filename);
}

const rule: Rule.RuleModule = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const filename = path.basename(context.getFilename());

    return {
      Program(node) {
        if (isIndexFile(filename)) {
          context.report({
            node,
            message:
              "Avoid usage of index file names for features. Each file should be described by it's name.",
          });
        }
      },
    };
  },
};

export default rule;
