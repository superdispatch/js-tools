import { TSESTree } from '@typescript-eslint/typescript-estree';
import { Rule } from 'eslint';
import * as ESTree from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    schema: [],
    fixable: 'code',
    type: 'suggestion',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      JSXSpreadAttribute(estreeNode: ESTree.Node) {
        const node = (estreeNode as unknown) as TSESTree.JSXSpreadAttribute;
        if (node.argument.type !== 'ObjectExpression') {
          return;
        }

        context.report({
          node: (node as unknown) as ESTree.Node,
          message: 'Do not use object expressions in JSX spread',
          fix(fixer) {
            const updates = [];

            // TODO Remove ts-ignore
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            for (const property of node.argument.properties) {
              if (property.type === 'Property' && !property.computed) {
                const key =
                  property.key.type === 'Literal'
                    ? property.key.value
                    : sourceCode.getText(property.key);
                const value = sourceCode.getText(property.value);

                updates.push(`${key}={${value}}`);
              } else if (
                property.type === 'SpreadElement' ||
                property.type === 'ExperimentalSpreadProperty'
              ) {
                updates.push(`{${sourceCode.getText(property)}}`);
              } else {
                // Exit without updates when there is unsupported property type.
                return [];
              }
            }

            return [
              fixer.insertTextBefore(
                (node as unknown) as ESTree.Node,
                updates.join(' '),
              ),
              fixer.remove((node as unknown) as ESTree.Node),
            ];
          },
        });
      },
    };
  },
};

export default rule;
