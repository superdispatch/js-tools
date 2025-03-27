import { Rule } from 'eslint';
import { Node } from 'estree';
import { TSESTree } from '@typescript-eslint/typescript-estree';

const rule: Rule.RuleModule = {
  meta: {
    schema: [],
    fixable: 'code',
    type: 'suggestion',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      JSXSpreadAttribute(estreeNode: Node) {
        const node = estreeNode as unknown as TSESTree.JSXSpreadAttribute;
        const { argument } = node;

        if (argument.type !== 'ObjectExpression') {
          return;
        }

        context.report({
          node: estreeNode as Node,
          message: 'Do not use object expressions in JSX spread',
          fix(fixer) {
            const updates = [];

            for (const property of argument.properties) {
              if (property.type === 'Property' && !property.computed) {
                const key =
                  property.key.type === 'Literal'
                    ? property.key.value
                    : sourceCode.getText(property.key);

                const value = sourceCode.getText(property.value as Node);

                updates.push(`${key}={${value}}`);
              } else if (property.type === 'SpreadElement') {
                updates.push(`{${sourceCode.getText(property as Node)}}`);
              } else {
                // Exit without updates when there is unsupported property type.
                return [];
              }
            }

            return [
              fixer.insertTextBefore(estreeNode as Node, updates.join(' ')),
              fixer.remove(estreeNode as Node),
            ];
          },
        });
      },
    };
  },
};

export default rule;
