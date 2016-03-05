import {hexToRgb, rgbToHex, rgbToHsl, hslToRgb} from './convert';
import {parseHex, parseRgb, parseHsl} from './parse';
import type, {HEX, RGB, HSL} from './type';

/**
 * Parse a color string to a color object.
 *
 * @constructor
 * @param {string} color The color string to parse.
 *
 * @property {number} hex The color represented as an rgb hex value.
 * @property {Array<number>} rgb The color represented as an rgb triple.
 * @property {Array<number>} hsl The color represented as an hsl triple.
 * @property {number} alpha The alpha value of the color.
 * @property {boolean} isTransparent Whether or not the color is transparent.
 *
 * @example
 * const red = Color('rgba(255,0,0,.5)');
 *
 * {
 *   hex: 0xff0000,
 *   rgb: [255, 0, 0],
 *   hsl: [0, 1, 0.5],
 *   alpha: 0.5,
 *   isTransparent: false
 * }
 */
export default function Color(color) {
  let hex;
  let rgb;
  let hsl;
  let alpha = 0;

  color = color.trim().toLowerCase();

  switch (type(color)) {
    case HEX:
      [hex, alpha] = parseHex(color);
      rgb = hexToRgb(hex);
      hsl = rgbToHsl(rgb);
      break;

    case RGB:
      [rgb, alpha] = parseRgb(color);
      hex = rgbToHex(rgb);
      hsl = rgbToHsl(rgb);
      break;

    case HSL:
      [hsl, alpha] = parseHsl(color);
      rgb = hslToRgb(hsl);
      hex = rgbToHex(rgb);
      break;

    default:
      hex = 0x0;
      rgb = hsl = [0, 0, 0];
  }

  // Public API
  return {hex, rgb, hsl, alpha, isTransparent: alpha === 0};
}

/**
 * Compute the relative luminance of a color.
 *
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 *
 * @param {Color} color The color to compute the luminance of.
 * @return {number} The relative luminance of the color.
 *
 * @example
 * luminance(Color('#7fffd4'));
 * // => 0.808
 */
export function luminance(color) {
  const {exp, log} = Math;
  const {rgb} = color;

  for (let i = 0; i < 3; i++) {
    let c = rgb[i] / 255;
    rgb[i] = c <= 0.03928 ? c / 12.92 : exp(log((c + 0.055) / 1.055) * 2.4);
  }

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

/**
 * Compute the contrast ratio between two colors.
 *
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 *
 * @param {Color} colorA The first color.
 * @param {Color} colorB The second color.
 * @return {number} The contrast ratio between the colors.
 *
 * @example
 * contrast(Color('#ffc0cb'), Color('#ff69b4'));
 * // => 1.721
 */
export function contrast(colorA, colorB) {
  const {max, min} = Math;

  const la = luminance(colorA) + 0.05;
  const lb = luminance(colorB) + 0.05;

  return max(la, lb) / min(la, lb);
}
