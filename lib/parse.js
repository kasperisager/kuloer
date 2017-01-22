import {NAMES} from './names';
import {HEX} from './hex';

/**
 * @see https://github.com/regexps/rgb-regex
 * @private
 */
const RGB_INT_REGEX = /^rgb\(\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;

/**
 * @see https://github.com/regexps/rgb-regex
 * @private
 */
const RGB_PCT_REGEX = /^rgb\(\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)%\s*\)$/;

/**
 * @see https://github.com/regexps/rgba-regex
 * @private
 */
const RGBA_INT_REGEX = /^rgba\(\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @see https://github.com/regexps/rgba-regex
 * @private
 */
const RGBA_PCT_REGEX = /^rgba\(\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @see https://github.com/regexps/hsl-regex
 * @private
 */
const HSL_REGEX = /^hsl\(\s*(-?\d+)\s*,\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)%\s*\)$/;

/**
 * @see https://github.com/regexps/hsla-regex
 * @private
 */
const HSLA_REGEX = /^hsla\(\s*(-?\d+)\s*,\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)%\s*,\s*(-?\d*(?:\.\d+)?)\s*\)$/;

/**
 * @private
 */
export function parseNamed(str) {
  return [NAMES[str], 1];
}

/**
 * @private
 */
export function parseHex(str) {
  const n = str.length;

  if (n !== 7 && n !== 4) {
    return [0x0, 0];
  }

  let v = 0;
  let r = n === 4 ? 2 : 1;

  for (let i = 1; i < n; i++) {
    const c = HEX[str.charCodeAt(i)];

    if (c) {
      return [0x0, 0];
    }

    for (let j = 0; j < r; j++) {
      v = (v * 16) + c;
    }
  }

  return [v, 1];
}

/**
 * @private
 */
export function parseRgb(str) {
  let p = str.indexOf('%') !== -1;
  let re;

  if (str[3] === 'a') {
    re = p ? RGBA_PCT_REGEX : RGBA_INT_REGEX;
  } else {
    re = p ? RGB_PCT_REGEX : RGB_INT_REGEX;
  }

  let m = re.exec(str);

  if (m === null) {
    return [[0, 0, 0], 0];
  }

  let r = +m[1];
  let g = +m[2];
  let b = +m[3];

  if (p) {
    r = Math.round(r / 1e2 * 0xff);
    g = Math.round(g / 1e2 * 0xff);
    b = Math.round(b / 1e2 * 0xff);
  }

  return [
    [
      Math.max(0, Math.min(0xff, r)),
      Math.max(0, Math.min(0xff, g)),
      Math.max(0, Math.min(0xff, b))
    ],
    m[4] ? Math.max(0, Math.min(1, Math.round(+m[4] * 1e2) / 1e2)) : 1
  ];
}

/**
 * @private
 */
export function parseHsl(str) {
  let m = (str[3] === 'a' ? HSLA_REGEX : HSL_REGEX).exec(str);

  if (m === null) {
    return [[NaN, 0, 0], 0];
  }

  let h = +m[1];
  let s = +m[2];
  let l = +m[3];

  return [
    [
      (h + 360) % 360,
      Math.max(0, Math.min(1, Math.round(s) / 1e2)),
      Math.max(0, Math.min(1, Math.round(l) / 1e2))
    ],
    m[4] ? Math.max(0, Math.min(1, Math.round(+m[4] * 1e2) / 1e2)) : 1
  ];
}
