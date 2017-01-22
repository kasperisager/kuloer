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
  const a = color[0];

  if (a === '#') {
    return HEX;
  }

  const b = color[1];
  const c = color[2];

  if (a === 'r' && b === 'g' && c === 'b') {
    return RGB;
  }

  if (a === 'h' && b === 's' && c === 'l') {
    return HSL;
  }

  if (color in NAMES) {
    return NAMED;
  }

  return UNKNOWN;
}
