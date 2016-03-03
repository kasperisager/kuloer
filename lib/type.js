import {NAMES} from './names';

export const HEX = 'hex';

export const RGB = 'rgb';

export const HSL = 'hsl';

export const UNKNOWN = 'unknown';

/**
 * Guess the type of a color string.
 *
 * @private
 */
export default function type(color) {
  const l = color.length;

  if (color in NAMES || (color[0] === '#' && (l === 4 || l === 7))) {
    return HEX;
  }

  const model = color.substr(0, 3);

  if (model === 'rgb') {
    return RGB;
  }

  if (model === 'hsl') {
    return HSL;
  }

  return UNKNOWN;
}
