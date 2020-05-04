/* eslint eslint-comments/no-use: off */
/**
 * @typedef {import("estree").Node} ESTreeNode
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.Node} Node
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.Literal} Literal
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.TemplateLiteral} TemplateLiteral
 */

'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const { Color } = require('@superdispatch/ui');

/**
 *
 * @type {Map<string, string>}
 */
const colorMap = new Map(
  Object.entries(Color).map(([key, value]) => [value, key]),
);
const colorRegex = new RegExp(
  Array.from(colorMap.keys(), (x) =>
    x.replace(/\(/, '\\(').replace(/\)/, '\\)'),
  ).join('|'),
  'ig',
);

/**
 *
 * @param color {string}
 * @returns {string}
 */
function formatColor(color) {
  return `Color.${color}`;
}
/**
 * @type {RuleModule}
 * */
module.exports = {
  meta: {
    scheme: [],
    fixable: 'code',
    type: 'suggestion',
    messages: {
      noCustomColor: 'Use {{color}} from "@superdispatch/ui"',
    },
  },

  create(context) {
    let isImported = false;

    /**
     *
     * @param value {string}
     * @returns {[string, string]|[null, null]}
     */
    function parseColor(value) {
      const color = colorMap.get(value);
      if (color) {
        return [formatColor(color), formatColor(color)];
      }
      if (colorRegex.test(value)) {
        /** @type {Set<string>} */
        const colors = new Set();
        const template = value.replace(colorRegex, (match) => {
          const matchColor = formatColor(colorMap.get(match) || '');
          colors.add(matchColor);
          return `\${${matchColor}}`;
        });
        return [Array.from(colors).join(','), `\`${template}\``];
      }
      return [null, null];
    }

    /**
     *
     * @param node {Node}
     * @param value {string}
     * @param [fn] {(fixer: any, value: string) => any}
     */
    function process(node, value, fn) {
      const [color, replacement] = parseColor(value);
      const estreeNode = /** @type {ESTreeNode} */ (
        /** @type {unknown} */ node
      );

      if (color && replacement) {
        context.report({
          node: estreeNode,
          messageId: 'noCustomColor',
          data: { color },
          fix: (fixer) => {
            const fixes = [
              fn
                ? fn(fixer, replacement)
                : fixer.replaceText(estreeNode, replacement),
            ];

            if (!isImported) {
              const [program] = context.getAncestors();
              const scope = context.getScope();

              if (!scope.variables.some((v) => v.name === 'Color')) {
                fixes.push(
                  fixer.insertTextBefore(
                    program,
                    "import { Color } from '@superdispatch/ui';",
                  ),
                );
              }
              isImported = true;
            }

            return fixes;
          },
        });
      }
    }

    return {
      /**
       * @param {Literal} node
       * */
      'VariableDeclarator > Literal': function (node) {
        if (typeof node.value === 'string') {
          process(node, node.value);
        }
      },
      /**
       * @param {Literal} node
       * */
      'Property > Literal': function (node) {
        if (typeof node.value === 'string') {
          process(node, node.value);
        }
      },
      /**
       * @param {Literal} node
       * */
      'JSXAttribute > Literal': function (node) {
        if (typeof node.value === 'string') {
          process(node, node.value, (fixer, replacement) =>
            fixer.replaceText(node, `{${replacement}}`),
          );
        }
      },
      /**
       * @param {Literal} node
       * */
      'JSXExpressionContainer > Literal': function (node) {
        if (typeof node.value === 'string') {
          process(node, node.value);
        }
      },
      /**
       * @param {TemplateLiteral} node
       * */
      TemplateLiteral(node) {
        const [start, end] = node.range;
        const text = context.getSourceCode().text.slice(start + 1, end - 1);
        process(node, text);
      },
    };
  },
};
