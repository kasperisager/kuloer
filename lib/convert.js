/**
 * Convert a hex value to an rgb triple.
 *
 * @param {number} hex
 * @return {Array<number>}
 * @private
 */
export function hexToRgb(hex) {
  return [hex >> 16, hex >> 8 & 0xff, hex & 0xff];
}

/**
 * Convert an rgb triple to a hex value.
 *
 * @param {Array<number>} rgb
 * @return {number}
 * @private
 */
export function rgbToHex([r, g, b]) {
  return r << 16 | g << 8 | b;
}

/**
 * Convert an rgb triple to an hsl triple.
 *
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param {Array<number>} rgb
 * @return {Array<number>}
 * @private
 */
export function rgbToHsl([r, g, b]) {
  const {max, min, abs, round} = Math;

  r /= 0xff;
  g /= 0xff;
  b /= 0xff;

  const M = max(r, g, b);
  const m = min(r, g, b);
  const C = M - m;
  const l = (M + m) / 2;

  if (!C) {
    return [NaN, 0, round(l * 1e2) / 1e2];
  }

  const s = C / (1 - abs(2 * l - 1));

  let h;

  switch (M) {
    case r: h = (g - b) / C % 6; break;
    case g: h = (b - r) / C + 2; break;
    default: h = (r - g) / C + 4; break;
  }

  return [round((h * 60 + 360) % 360), round(s * 1e2) / 1e2, round(l * 1e2) / 1e2];
}

/**
 * Convert an hsl triple to and rgb triple.
 *
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param {Array<number>} hsl
 * @return {Array<number>}
 * @private
 */
export function hslToRgb([h, s, l]) {
  const {abs, round} = Math;

  if (isNaN(h)) {
    const c = round(l * 0xff);
    return [c, c, c];
  }

  let r = 0;
  let g = 0;
  let b = 0;

  h /= 60;

  const C = (1 - abs(2 * l - 1)) * s;
  const X = C * (1 - abs(h % 2 - 1));

  switch (true) {
    case h < 1:
      r = C;
      g = X;
      break;

    case h < 2:
      r = X;
      g = C;
      break;

    case h < 3:
      g = C;
      b = X;
      break;

    case h < 4:
      g = X;
      b = C;
      break;

    case h < 5:
      r = X;
      b = C;
      break;

    default:
      r = C;
      b = X;
      break;
  }

  const m = l - (C / 2);

  return [round((r + m) * 0xff), round((g + m) * 0xff), round((b + m) * 0xff)];
}
