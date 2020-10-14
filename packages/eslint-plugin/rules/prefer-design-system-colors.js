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

const cache = new WeakMap();

/**
 * @param {Record<string, ColorOption>} colors
 * @returns {Map<string, string>}
 */
function getColorsMap(colors) {
  if (!colors) {
    return new Map();
  }

  let colorsMap = cache.get(colors);

  if (!colorsMap) {
    colorsMap = new Map();
    cache.set(colors, colorsMap);

    for (const [color, value] of Object.entries(colors)) {
      colorsMap.set(color.toLowerCase(), value);
    }
  }

  return colorsMap;
}

/**
 * @type {RuleModule}
 * */
module.exports = {
  meta: {
    type: 'suggestion',
    scheme: [],
  },

  create(context) {
    const colorsMap = getColorsMap(context.settings.designSystemColors);

    // Do not apply rule if there is no colors
    if (!colorsMap.size) {
      return {};
    }

    /**
     * @param text {string}
     * @returns {Map<string, ColorOption>}
     */
    function findColors(text) {
      const colors = new Map();
      const HEX_COLOR_PATTERN = /(#\b([a-f0-9]{3}|[a-f0-9]{6})\b)/gim;

      for (const [, match] of text.matchAll(HEX_COLOR_PATTERN)) {
        const color = match.toLowerCase();
        const value = colorsMap.get(color);

        if (value) {
          colors.set(color, value);
        }
      }

      return colors;
    }

    /**
     * @param node {any}
     * @param text {string}
     */
    function process(node, text) {
      const usages = findColors(text);

      for (const { source, specifier } of usages.values()) {
        context.report({
          node,
          message: `Use ${specifier} from "${source}"`,
        });
      }
    }

    return {
      /**
       * @param {Literal} node
       * */
      Literal(node) {
        if (typeof node.value === 'string') {
          process(node, node.value);
        }
      },

      /**
       * @param {TemplateLiteral} node
       * */
      TemplateLiteral(node) {
        const text = node.quasis.reduce(
          (acc, { value }) => acc + value.raw,
          '',
        );

        process(node, text);
      },
    };
  },
};
