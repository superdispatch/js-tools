'use strict';

module.exports = {
  meta: {
    schema: [],
    fixable: 'code',
    type: 'suggestion',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      JSXSpreadAttribute(node) {
        if (node.argument.type !== 'ObjectExpression') {
          return;
        }

        context.report({
          node,
          message: 'Do not use object expressions in JSX spread',
          fix(fixer) {
            const updates = [];

            for (const property of node.argument.properties) {
              switch (property.type) {
                case 'Property': {
                  const key =
                    property.key.type === 'Literal'
                      ? property.key.value
                      : sourceCode.getText(property.key);
                  const value = sourceCode.getText(property.value);

                  updates.push(`${key}={${value}}`);

                  break;
                }

                case 'SpreadElement':
                case 'ExperimentalSpreadProperty': {
                  updates.push(`{${sourceCode.getText(property)}}`);

                  break;
                }

                default:
                  // Skip updates when there is unsupported property type.
                  return [];
              }
            }

            return [fixer.insertTextBefore(node, updates.join(' ')), fixer.remove(node)];
          },
        });
      },
    };
  },
};
