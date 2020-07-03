/**
 * @typedef {import("estree").Node} ESTreeNode
 * @typedef {import("eslint").Rule.RuleModule} RuleModule
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.Node} Node
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.Literal} Literal
 * @typedef {import("@typescript-eslint/typescript-estree").TSESTree.TemplateLiteral} TemplateLiteral
 *
 *  @typedef {{source: string, specifier: string}} ColorOption
 *  @typedef {{colors: Record<string, ColorOption> }} Option
 */

'use strict';

/**
 * @type {RuleModule}
 * */
module.exports = {
  meta: {
    fixable: 'code',
    type: 'suggestion',
    scheme: [
      {
        type: 'object',
        properties: {
          colors: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              properties: {
                type: 'object',
                properties: {
                  source: { type: 'string' },
                  specifier: { type: 'string' },
                },
              },
            },
          },
        },
      },
    ],
  },

  create(context) {
    const [option] = /** @type {Option[]} */ context.options;

    const COLORS_MAP = new Map(
      Object.entries(option.colors).map(([color, value]) => [
        color.toLowerCase(),
        value,
      ]),
    );

    const COLOR_REGEX = new RegExp(
      Array.from(COLORS_MAP, ([color]) =>
        color.replace(/\(/, '\\(').replace(/\)/, '\\)'),
      ).join('|'),
      'ig',
    );

    /**
     *
     * @param text {string}
     * @returns {ColorOption[]}
     */
    function findUsages(text) {
      let match;
      const colors = new Set();

      while ((match = COLOR_REGEX.exec(text))) {
        const [color] = match;

        colors.add(color.toLowerCase());
      }

      return Array.from(colors, (color) => COLORS_MAP.get(color));
    }

    /**
     *
     * @param node {any}
     * @param text {string}
     */
    function process(node, text) {
      const usages = findUsages(text);

      usages.forEach(({ specifier, source }) => {
        context.report({
          node,
          message: `Use ${specifier} from "${source}"`,
        });
      });
    }

    return {
      /**
       * @param {Literal} node
       * */
      'VariableDeclarator > Literal, Property > Literal, JSXAttribute > Literal, JSXExpressionContainer > Literal': function (
        node,
      ) {
        if (typeof node.value === 'string') {
          process(node, node.value);
        }
      },
      /**
       * @param {TemplateLiteral} node
       * */
      TemplateLiteral(node) {
        process(node, context.getSourceCode().text);
      },
    };
  },
};
