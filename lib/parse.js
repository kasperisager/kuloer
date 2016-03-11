import {NAMES} from './names';

/**
 * @see https://github.com/regexps/hex-color-regex
 * @private
 */
const HEX_REGEX = /^#([a-f0-9]{6}|[a-f0-9]{3})$/;

/**
 * @see https://github.com/regexps/rgb-regex
 * @private
 */
const RGB_INT_REGEX = /^rgb\(\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)$/;

/**
 * @see https://github.com/regexps/rgb-regex
 * @private
 */
const RGB_PCT_REGEX = /^rgb\(\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*\)$/;

/**
 * @see https://github.com/regexps/rgba-regex
 * @private
 */
const RGBA_INT_REGEX = /^rgba\(\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*(\-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @see https://github.com/regexps/rgba-regex
 * @private
 */
const RGBA_PCT_REGEX = /^rgba\(\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @see https://github.com/regexps/hsl-regex
 * @private
 */
const HSL_REGEX = /^hsl\(\s*(\-?\d+)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*,\s*(\-?\d*(?:\.\d+)?%)\s*\)$/;

/**
 * @see https://github.com/regexps/hsla-regex
 * @private
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
  const {max, min, round} = Math;

  let a = str[3] === 'a';
  let p = str.indexOf('%') !== -1;
  let re;

  if (a) {
    re = p ? RGBA_PCT_REGEX : RGBA_INT_REGEX;
  } else {
    re = p ? RGB_PCT_REGEX : RGB_INT_REGEX;
  }

  let m = re.exec(str);

  if (m === null) {
    return [[0, 0, 0], 0];
  }

  let r = parseInt(m[1], 10);
  let g = parseInt(m[2], 10);
  let b = parseInt(m[3], 10);

  if (p) {
    r = round(r / 1e2 * 0xff);
    g = round(g / 1e2 * 0xff);
    b = round(b / 1e2 * 0xff);
  }

  return [
    [
      max(0, min(0xff, r)),
      max(0, min(0xff, g)),
      max(0, min(0xff, b))
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
