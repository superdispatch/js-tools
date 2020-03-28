/**
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.JSXSpreadAttribute} JSXSpreadAttribute
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * @typedef {import("estree").Node} Node
 * */

'use strict';

/**
 * @type {RuleModule}
 * */
module.exports = {
  meta: {
    schema: [],
    fixable: 'code',
    type: 'suggestion',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      /**
       * @param {Node} estreeNode
       * */
      JSXSpreadAttribute(estreeNode) {
        const node = /** @type {JSXSpreadAttribute} */ (
          /** @type {unknown} */ (estreeNode)
        );
        if (node.argument.type !== 'ObjectExpression') {
          return;
        }

        context.report({
          node: estreeNode,
          message: 'Do not use object expressions in JSX spread',
          fix(fixer) {
            const updates = [];

            // TODO Remove @ts-ignore
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
              fixer.insertTextBefore(estreeNode, updates.join(' ')),
              fixer.remove(estreeNode),
            ];
          },
        });
      },
    };
  },
};
