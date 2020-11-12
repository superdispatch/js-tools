import { Rule } from 'eslint';
import { Node } from 'estree';
import _ from 'lodash';
import path from 'path';

const ASSETS_FILE_REGEXP = /(.*?)\.(svg|png|jpg|css|sass|scss)$/;

function fileToKebabCase(filename: string): string {
  return filename.replace(
    ASSETS_FILE_REGEXP,
    (_match, name, ext: string) => `${_.kebabCase(name)}.${ext}`,
  );
}

const rule: Rule.RuleModule = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    function process(file: string, node: Node): void {
      const filename = path.basename(file);
      const kebabCasedFilename = fileToKebabCase(filename);

      if (
        // Check for relative files. Lint only local files and ignore third party modules.
        /\.\.?\//.test(file) &&
        ASSETS_FILE_REGEXP.test(filename) &&
        kebabCasedFilename !== filename
      ) {
        context.report({
          node,
          message:
            'Asset files name must be in kebab-case. Please rename "{{ invalid }}" to "{{ valid }}"',
          data: {
            invalid: filename,
            valid: kebabCasedFilename,
          },
        });
      }
    }

    return {
      CallExpression(node) {
        if (
          'name' in node.callee &&
          node.callee.name === 'require' &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          process(node.arguments[0].value, node);
        }
      },
      ImportDeclaration(node) {
        if (typeof node.source.value === 'string') {
          process(node.source.value, node);
        }
      },
    };
  },
};

export default rule;
