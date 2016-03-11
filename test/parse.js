import test from 'ava';
import {parseHex, parseRgb, parseHsl} from '../lib/parse';

test('parseHex() parses a hex color string to a hex * alpha tuple', async t => {
  const fixtures = [
    ['red', [0xff0000, 1]],
    ['#000000', [0x0, 1]],
    ['#ffffff', [0xffffff, 1]],
    ['#afebe3', [0xafebe3, 1]],
    ['#f60', [0xff6600, 1]]
  ];

  for (const [str, parsed] of fixtures) {
    t.same(parseHex(str), parsed, str);
  }
});

test('parseHex() returns black with alpha 0 when given an invalid hex color string', async t => {
  const fixtures = [
    'fff',
    'ffffff',
    '#ff00ah'
  ];

  for (const str of fixtures) {
    t.same(parseHex(str), [0x0, 0], str);
  }
});

test('parseRgb() parses an rgb(a) color string to an rgb * alpha tuple', async t => {
  const fixtures = [
    ['rgb(0, 0, 0)', [[0, 0, 0], 1]],
    ['rgb(12, 34, 56)', [[12, 34, 56], 1]],
    ['rgb(281, -13, 45)', [[255, 0, 45], 1]],
    ['rgb(2746, 1000, -3271)', [[255, 255, 0], 1]],
    ['rgb(  281 , -13  , 45   )', [[255, 0, 45], 1]],
    ['rgba(12, 34, 56, .8)', [[12, 34, 56], 0.8]],
    ['rgba(  12, 34 , 56  , .8)', [[12, 34, 56], 0.8]],
    ['rgba(723, -83, 0, 1.3)', [[255, 0, 0], 1]],
    ['rgba(723, -83, 0, -.3)', [[255, 0, 0], 0]],
    ['rgb(2746, 1000, -3271, .5)', [[255, 255, 0], 0.5]]
  ];

  for (const [str, parsed] of fixtures) {
    t.same(parseRgb(str), parsed, str);
  }
});

test('parseRgb() returns black with alpha 0 when given an invalid rgb(a) color string', async t => {
  const fixtures = [
    'rgb(255, 255, 255, 255)',
    'rgb(255, 255)',
    'rgb(255, 255, 255',
    'rgb(255 255 255)',
    'rgba(255, 255, 255)',
    'rgba(255, 255, 0.8)',
    'rgba(255, 255, 0.8'
  ];

  for (const str of fixtures) {
    t.same(parseRgb(str), [[0, 0, 0], 0], str);
  }
});

test('parseHsl() parses an hsl(a) color string to an hsl * alpha tuple', async t => {
  const fixtures = [
    ['hsl(210, 65%, 13%)', [[210, 0.65, 0.13], 1]],
    ['hsl(  210, 65%  , 13%  )', [[210, 0.65, 0.13], 1]],
    ['hsl(-10, 120%, -14%)', [[350, 1, 0], 1]],
    ['hsla(210, 65%, 13%, .8)', [[210, 0.65, 0.13], 0.8]],
    ['hsla(  210, 65% , 13%  , .8 )', [[210, 0.65, 0.13], 0.8]]
  ];

  for (const [str, parsed] of fixtures) {
    t.same(parseHsl(str), parsed, str);
  }
});

test('parseHsl() returns black with alpha 0 when given an invalid hsl(a) color string', async t => {
  const fixtures = [
    'hsl(153,15%,74%,16%)',
    'hsl(14, 97%)',
    'hsl(133, 15%, 65%',
    'hsl(143, 13, 67)',
    'hsla(54, 15%, 43%)',
    'hsla(54, 15%, 0.8)',
    'hsla(13, 15, 80, 0.8)',
    'hsla(13, 15%, 80%, 0.8'
  ];

  for (const str of fixtures) {
    const [[h, s, l], alpha] = parseHsl(str);

    t.true(isNaN(h));
    t.is(s, 0);
    t.is(l, 0);
    t.is(alpha, 0);
  }
});
