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
export function rgbToHex(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];

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
export function rgbToHsl(rgb) {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];

  r /= 0xff;
  g /= 0xff;
  b /= 0xff;

  const M = Math.max(r, g, b);
  const m = Math.min(r, g, b);
  const C = M - m;
  const l = (M + m) / 2;

  if (!C) {
    return [NaN, 0, Math.round(l * 1e2) / 1e2];
  }

  const s = C / (1 - Math.abs(2 * l - 1));

  let h;

  switch (M) {
    case r: h = (g - b) / C % 6; break;
    case g: h = (b - r) / C + 2; break;
    default: h = (r - g) / C + 4; break;
  }

  return [
    Math.round((h * 60 + 360) % 360),
    Math.round(s * 1e2) / 1e2,
    Math.round(l * 1e2) / 1e2
  ];
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
export function hslToRgb(hsl) {
  let h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];

  if (h !== h) {
    const c = Math.round(l * 0xff);
    return [c, c, c];
  }

  let r = 0;
  let g = 0;
  let b = 0;

  h /= 60;

  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(h % 2 - 1));

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

  return [
    Math.round((r + m) * 0xff),
    Math.round((g + m) * 0xff),
    Math.round((b + m) * 0xff)
  ];
}
