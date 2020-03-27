'use strict';

const types = require('@babel/types');
const { default: generator } = require('@babel/generator');
const parser = require('@babel/parser');

module.exports = {
  meta: {
    schema: [],
    fixable: 'code',
    type: 'suggestion',
    messages: {
      noInlineCondition: 'Do not use inline conditions.',
    },
  },
  create(context) {
    return {
      'ExpressionStatement > ConditionalExpression': function(node) {
        context.report({
          node,
          messageId: 'noInlineCondition',
          fix(fixer) {
            const parsed = parser.parseExpression(
              context.getSourceCode().getText(node),
            );
            const ifStatement = types.ifStatement(
              parsed.test,
              types.expressionStatement(parsed.consequent),
              types.expressionStatement(parsed.alternate),
            );
            const generated = generator(ifStatement);
            return fixer.replaceText(node.parent, generated.code);
          },
        });
      },
      'ExpressionStatement > LogicalExpression': function(node) {
        if (node.operator !== '||' && node.operator !== '&&') {
          return;
        }
        context.report({
          node,
          messageId: 'noInlineCondition',
          fix(fixer) {
            const parsed = parser.parseExpression(
              context.getSourceCode().getText(node),
            );
            const ifStatement = types.ifStatement(
              node.operator === '||'
                ? types.unaryExpression('!', parsed.left)
                : parsed.left,

              types.expressionStatement(parsed.right),
            );
            const generated = generator(ifStatement);
            return fixer.replaceText(node.parent, generated.code);
          },
        });
      },
    };
  },
};
