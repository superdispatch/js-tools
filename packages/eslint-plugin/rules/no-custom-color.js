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
    type: 'suggestion',
    scheme: [],
  },

  create(context) {
    const colors = context.settings.customColors;

    if (!colors) {
      throw new Error('Please add "customColors" config to ESLint settings.');
    }

    const COLORS_MAP = new Map(
      Object.entries(colors).map(([color, value]) => [
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
      const set = new Set();

      while ((match = COLOR_REGEX.exec(text))) {
        const [color] = match;

        set.add(color.toLowerCase());
      }

      return Array.from(set, (color) => COLORS_MAP.get(color));
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
