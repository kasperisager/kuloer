import test from 'ava';
import Color, {luminance, contrast, composite} from '../lib/color';

test('Color() can be constructed from hex, rgb(a), and hsl(a) strings', async t => {
  const fixtures = [
    ['red', [0xff0000, [255, 0, 0], [0, 1, 0.5], 1]],
    ['transparent', [0x0, [0, 0, 0], [0, 0, 0], 0]],
    ['#0000ff', [0x0000ff, [0, 0, 255], [240, 1, 0.5], 1]],
    ['rgb(255, 0, 0)', [0xff0000, [255, 0, 0], [0, 1, 0.5], 1]],
    ['rgba(255, 0, 0, .5)', [0xff0000, [255, 0, 0], [0, 1, 0.5], 0.5]],
    ['hsl(240, 100%, 50%)', [0x0000ff, [0, 0, 255], [240, 1, 0.5], 1]],
    ['hsla(240, 100%, 50%, 0.5)', [0x0000ff, [0, 0, 255], [240, 1, 0.5], 0.5]]
  ];

  for (const [str, [hex, rgb, hsl, alpha]] of fixtures) {
    const color = Color(str);

    t.is(color.hex, hex, str);
    t.same(color.rgb, rgb, str);
    t.is(color.alpha, alpha, str);
    t.is(color.hsl[1], hsl[1], str);
    t.is(color.hsl[2], hsl[2], str);

    if (isNaN(hsl[0])) {
      t.true(isNaN(color.hsl[0]), str);
    } else {
      t.is(color.hsl[0], hsl[0], str);
    }
  }
});

test('luminance() returns the relative luminance of a color', async t => {
  const {abs} = Math;

  const fixtures = [
    ['#ffffff', 1],
    ['#000000', 0],
    ['#7fffd4', 0.808],
    ['#ff69b4', 0.347],
    ['#483d8b', 0.066]
  ];

  for (const [c, l] of fixtures) {
    t.true(abs(luminance(Color(c)) - l) < 1e-3);
  }
});

test('contrast() returns the contrast ratio between two colors', async t => {
  const {abs} = Math;

  const fixtures = [
    ['#ffffff', '#000000', 21],
    ['#ffc0cb', '#ff69b4', 1.721],
    ['#ffc0cb', '#800080', 6.124]
  ];

  for (const [a, b, c] of fixtures) {
    t.true(abs(contrast(Color(a), Color(b)) - c) < 1e-3);
  }
});

test('contrast() is order-independant', async t => {
  const fixtures = [
    ['#ffffff', '#000000'],
    ['#ffc0cb', '#ff69b4']
  ];

  for (const [a, b] of fixtures) {
    t.is(contrast(Color(a), Color(b)), contrast(Color(b), Color(a)));
  }
});

test('composite() returns the composite of several colors', async t => {
  const fixtures = [
    [
      ['rgba(0,0,0,0)', 'rgb(255,0,0)'],
      [0xff0000, [255, 0, 0], [0, 1, 0.5], 1]
    ], [
      ['rgb(255,0,0)', 'rgb(0,0,255)'],
      [0x0000ff, [0, 0, 255], [240, 1, 0.5], 1]
    ], [
      ['rgb(255,0,0)', 'rgba(0,0,255,.5)'],
      [0x800080, [128, 0, 128], [300, 1, 0.25], 1]
    ], [
      ['rgba(255,0,0,.5)', 'rgba(0,0,255,.5)'],
      [0x5500aa, [85, 0, 170], [270, 1, 0.33], 0.75]
    ], [
      ['rgb(145,74,19)', 'rgba(28,164,49,.7)'],
      [0x3f8928, [63, 137, 40], [106, 0.55, 0.35], 1]
    ], [
      ['rgb(145,74,19)', 'rgba(28,164,49,.7)', 'rgba(45,21,134,.2)'],
      [0x3b723b, [59, 114, 59], [120, 0.32, 0.34], 1]
    ]
  ];

  for (const [colors, [hex, rgb, hsl, alpha]] of fixtures) {
    const color = composite(colors.map(Color));

    t.is(color.hex, hex, colors);
    t.same(color.rgb, rgb, colors);
    t.is(color.alpha, alpha, colors);
    t.is(color.hsl[1], hsl[1], colors);
    t.is(color.hsl[2], hsl[2], colors);

    if (isNaN(hsl[0])) {
      t.true(isNaN(color.hsl[0]), colors);
    } else {
      t.is(color.hsl[0], hsl[0], colors);
    }
  }
});
