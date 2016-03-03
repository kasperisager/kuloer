import {NAMES} from './names';

/**
 * @see https://github.com/regexps/hex-color-regex
 */
const HEX_REGEX = /^#([a-f0-9]{6}|[a-f0-9]{3})$/;

/**
 * @see https://github.com/regexps/rgb-regex
 */
const RGB_REGEX = /^rgb\(\s*(\-?\d{1,3})\s*,\s*(\-?\d{1,3})\s*,\s*(\-?\d{1,3})\s*\)$/;

/**
 * @see https://github.com/regexps/rgba-regex
 */
const RGBA_REGEX = /^rgba\(\s*(\-?\d{1,3})\s*,\s*(\-?\d{1,3})\s*,\s*(\-?\d{1,3})\s*,\s*(\-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @see https://github.com/regexps/hsl-regex
 */
const HSL_REGEX = /^hsl\(\s*(\-?\d+)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*\)$/;

/**
 * @see https://github.com/regexps/hsla-regex
 */
const HSLA_REGEX = /^hsla\(\s*(\-?\d+)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @private
 */
export function parseHex(str) {
  if (str in NAMES) {
    return [NAMES[str], 1];
  }

  let m = HEX_REGEX.exec(str);

  if (m === null) {
    return [0x0, 0];
  }

  let hex = m[1];

  if (hex.length === 3) {
    const r = hex[0];
    const g = hex[1];
    const b = hex[2];

    hex = r + r + g + g + b + b;
  }

  return [parseInt(hex, 16), 1];
}

/**
 * @private
 */
export function parseRgb(str) {
  const {max, min} = Math;

  let m = (str[3] === 'a' ? RGBA_REGEX : RGB_REGEX).exec(str);

  if (m === null) {
    return [[0, 0, 0], 0];
  }

  return [
    [
      max(0, min(255, parseInt(m[1], 10))),
      max(0, min(255, parseInt(m[2], 10))),
      max(0, min(255, parseInt(m[3], 10)))
    ],
    m[4] ? max(0, min(1, parseFloat(m[4]))) : 1
  ];
}

/**
 * @private
 */
export function parseHsl(str) {
  const {max, min, round} = Math;

  let m = (str[3] === 'a' ? HSLA_REGEX : HSL_REGEX).exec(str);

  if (m === null) {
    return [[NaN, 0, 0], 0];
  }

  return [
    [
      (parseInt(m[1], 10) + 360) % 360,
      max(0, min(1, round(parseFloat(m[2])) / 1e2)),
      max(0, min(1, round(parseFloat(m[3])) / 1e2))
    ],
    m[4] ? max(0, min(1, parseFloat(m[4]))) : 1
  ];
}
