import test from 'ava';
import {hexToRgb, rgbToHex, rgbToHsl, hslToRgb} from '../lib/convert';

test('hexToRgb() converts a hex value to an rgb triple', async t => {
  const fixtures = [
    [0x000000, [0, 0, 0]],
    [0x808080, [128, 128, 128]],
    [0xffffff, [255, 255, 255]],
    [0x8675b7, [134, 117, 183]],
    [0xff9289, [255, 146, 137]],
    [0x5ebeb2, [94, 190, 178]],
    [0xecd368, [236, 211, 104]]
  ];

  for (const [hex, rgb] of fixtures) {
    t.deepEqual(hexToRgb(hex), rgb);
  }
});

test('rgbToHex() converts an rgb triple to a hex value', async t => {
  const fixtures = [
    [[0, 0, 0], 0x000000],
    [[128, 128, 128], 0x808080],
    [[255, 255, 255], 0xffffff],
    [[134, 117, 183], 0x8675b7],
    [[255, 146, 137], 0xff9289],
    [[94, 190, 178], 0x5ebeb2],
    [[236, 211, 104], 0xecd368]
  ];

  for (const [rgb, hex] of fixtures) {
    t.deepEqual(rgbToHex(rgb), hex);
  }
});

test('rgbToHsl() converts an rgb triple to an hsl triple', async t => {
  const fixtures = [
    [[0, 0, 0], [NaN, 0, 0]],
    [[128, 128, 128], [NaN, 0, 0.5]],
    [[255, 255, 255], [NaN, 0, 1]],
    [[134, 117, 183], [255, 0.31, 0.59]],
    [[255, 146, 137], [5, 1, 0.77]],
    [[94, 190, 178], [173, 0.42, 0.56]],
    [[236, 212, 105], [49, 0.78, 0.67]]
  ];

  for (const [rgb, [h, s, l]] of fixtures) {
    const [hm, sm, lm] = rgbToHsl(rgb);

    if (isNaN(h)) {
      t.true(isNaN(hm));
    } else {
      t.is(h, hm);
    }

    t.is(s, sm);
    t.is(l, lm);
  }
});

test('hslToRgb() converts an hsl triple to an rgb triple', async t => {
  const fixtures = [
    [[NaN, 0, 0], [0, 0, 0]],
    [[NaN, 0, 0.5], [128, 128, 128]],
    [[NaN, 0, 1], [255, 255, 255]],
    [[255, 0.31, 0.59], [134, 118, 183]],
    [[5, 1, 0.77], [255, 147, 138]],
    [[173, 0.42, 0.56], [96, 190, 179]],
    [[49, 0.78, 0.67], [236, 212, 105]],
    [[90, 0.1, 0.6], [153, 163, 143]],
    [[330, 0.1, 0.6], [163, 143, 153]],
    [[210, 0.5, 0.33], [42, 84, 126]]
  ];

  for (const [hsl, rgb] of fixtures) {
    t.deepEqual(hslToRgb(hsl), rgb);
  }
});
