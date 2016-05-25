import {trim, toLower} from 'bundstreg';
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
 *
 * @example
 * const red = Color('rgba(255,0,0,.5)');
 *
 * {
 *   hex: 0xff0000,
 *   rgb: [255, 0, 0],
 *   hsl: [0, 1, 0.5],
 *   alpha: 0.5
 * }
 */
export default function Color(color) {
  let hex;
  let rgb;
  let hsl;
  let alpha = 0;
  let parsed;

  color = toLower(trim(color));

  switch (type(color)) {
    case HEX:
      parsed = parseHex(color);
      hex = parsed[0];
      rgb = hexToRgb(hex);
      hsl = rgbToHsl(rgb);
      alpha = parsed[1];
      break;

    case RGB:
      parsed = parseRgb(color);
      rgb = parsed[0];
      hex = rgbToHex(rgb);
      hsl = rgbToHsl(rgb);
      alpha = parsed[1];
      break;

    case HSL:
      parsed = parseHsl(color);
      hsl = parsed[0];
      rgb = hslToRgb(hsl);
      hex = rgbToHex(rgb);
      alpha = parsed[1];
      break;

    default:
      hex = 0x0;
      rgb = hsl = [0, 0, 0];
  }

  // Public API
  return {hex, rgb, hsl, alpha};
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
  const {rgb} = color;

  for (let i = 0; i < 3; i++) {
    let c = rgb[i] / 255;
    rgb[i] = c <= 0.03928 ? c / 12.92 : Math.exp(Math.log((c + 0.055) / 1.055) * 2.4);
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
  const la = luminance(colorA) + 0.05;
  const lb = luminance(colorB) + 0.05;

  return Math.max(la, lb) / Math.min(la, lb);
}

/**
 * Compute the composite of several colors according to alpha compositing.
 *
 * @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
 *
 * @param {Array<Color>} colors The colors to compute the composite of.
 * @return {Color} The composite color.
 *
 * @example
 * composite([Color('red'), Color('rgba(0,0,255,.5)')]);
 *
 * {
 *   hex: 0x800080,
 *   rgb: [128, 0, 128],
 *   hsl: [300, 1, 0.25],
 *   alpha: 1
 * }
 */
export function composite(colors) {
  let {rgb: crgb, alpha: ca} = colors[0];

  let cr = crgb[0];
  let cg = crgb[1];
  let cb = crgb[2];

  for (let i = 1, n = colors.length; i < n; i++) {
    const {rgb: ergb, alpha: ea} = colors[i];
    const er = ergb[0];
    const eg = ergb[1];
    const eb = ergb[2];
    const da = ca * (1 - ea);

    ca = ea + da;
    cr = (er * ea + cr * da) / ca;
    cg = (eg * ea + cg * da) / ca;
    cb = (eb * ea + cb * da) / ca;
  }

  const rgb = [Math.round(cr), Math.round(cg), Math.round(cb)];
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);

  return {hex, rgb, hsl, alpha: Math.round(ca * 1e2) / 1e2};
}
