import {NAMES} from './names';

/**
 * @type {string}
 * @private
 */
export const HEX = 'hex';

/**
 * @type {string}
 * @private
 */
export const RGB = 'rgb';

/**
 * @type {string}
 * @private
 */
export const HSL = 'hsl';

/**
 * @type {string}
 * @private
 */
export const UNKNOWN = 'unknown';

/**
 * Guess the type of a color string.
 *
 * @param {string} color The color string to guess the type of.
 * @return {string} The guessed type of the color string.
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
