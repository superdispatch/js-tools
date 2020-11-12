import { Rule } from 'eslint';
import { Node } from 'estree';

const HEX_COLOR_PATTERN = /(#\b([a-f0-9]{3}|[a-f0-9]{6})\b)/gim;

interface ColorOption {
  source: string;
  specifier: string;
}

const cache = new WeakMap<
  Record<string, ColorOption>,
  Map<string, ColorOption>
>();
function getColorsMap(
  colors?: Record<string, ColorOption>,
): Map<string, ColorOption> {
  if (!colors) {
    return new Map<string, ColorOption>();
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

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    schema: [],
  },

  create(context) {
    const colorsMap = getColorsMap(context.settings.designSystemColors);

    // Do not apply rule if there is no colors
    if (!colorsMap.size) {
      return {};
    }

    function findColors(text: string): Map<string, ColorOption> {
      const colors = new Map<string, ColorOption>();

      for (const [, match] of text.matchAll(HEX_COLOR_PATTERN)) {
        const color = match.toLowerCase();
        const value = colorsMap.get(color);

        if (value) {
          colors.set(color, value);
        }
      }

      return colors;
    }

    function process(node: Node, text: string): void {
      const usages = findColors(text);

      for (const { source, specifier } of usages.values()) {
        context.report({
          node,
          message: `Use ${specifier} from "${source}"`,
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          process(node, node.value);
        }
      },
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

export default rule;
