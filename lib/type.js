import {NAMES} from './names';

/**
 * @type {string}
 * @private
 */
export const NAMED = 'named';

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
  if (color[0] === '#') {
    return HEX;
  }

  if (color in NAMES) {
    return NAMED;
  }

  switch (color.substring(0, 3)) {
    case 'rgb':
      return RGB;

    case 'hsl':
      return HSL;

    default:
      return UNKNOWN;
  }
}
