import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Rule } from 'eslint';
import * as ESTree from 'estree';
import _ from 'lodash';
import path from 'path';

const ASSETS_FILE_REGEXP = /(.*?)\.(svg|png|jpg|css|sass|scss)$/;

function fileToKebabCase(filename: string) {
  return filename.replace(
    ASSETS_FILE_REGEXP,
    (_match, name, ext) => `${_.kebabCase(name)}.${ext}`,
  );
}

function process(file: string, node: TSESTree.Node, context: Rule.RuleContext) {
  const filename = path.basename(file);
  const kebabCasedFilename = fileToKebabCase(filename);

  if (
    // Check for relative files. Lint only local files and ignore third party modules.
    /\.\.?\//.test(file) &&
    ASSETS_FILE_REGEXP.test(filename) &&
    kebabCasedFilename !== filename
  ) {
    context.report({
      node: node as ESTree.Node,
      message:
        'Asset files name must be in kebab-case. Please rename "{{ invalid }}" to "{{ valid }}"',
      data: {
        invalid: filename,
        valid: kebabCasedFilename,
      },
    });
  }
}

const rule: Rule.RuleModule = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      CallExpression(estreeNode) {
        const node = estreeNode as TSESTree.CallExpression;
        if (
          'name' in node.callee &&
          node.callee.name === 'require' &&
          node.arguments &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          process(node.arguments[0].value, node, context);
        }
      },
      ImportDeclaration(estreeNode) {
        const node = estreeNode as TSESTree.ImportDeclaration;
        if (typeof node.source.value === 'string') {
          process(node.source.value, node, context);
        }
      },
    };
  },
};

export default rule;
