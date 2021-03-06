import test from 'ava';
import {parseNamed, parseHex, parseRgb, parseHsl} from '../lib/parse';

test('parseNamed() parses a named color string to a hex * alpha tuple', t => {
  const fixtures = [
    ['red', [0xFF0000, 1]]
  ];

  for (const [str, parsed] of fixtures) {
    t.deepEqual(parseNamed(str), parsed, str);
  }
});

test('parseHex() parses a hex color string to a hex * alpha tuple', t => {
  const fixtures = [
    ['#000000', [0x0, 1]],
    ['#ffffff', [0xFFFFFF, 1]],
    ['#afebe3', [0xAFEBE3, 1]],
    ['#f60', [0xFF6600, 1]]
  ];

  for (const [str, parsed] of fixtures) {
    t.deepEqual(parseHex(str), parsed, str);
  }
});

test('parseHex() returns black with alpha 0 when given an invalid hex color string', t => {
  const fixtures = [
    'fff',
    'ffffff',
    '#ff00ah',
    '#ff0h00'
  ];

  for (const str of fixtures) {
    t.deepEqual(parseHex(str), [0x0, 0], str);
  }
});

test('parseRgb() parses an rgb(a) color string to an rgb * alpha tuple', t => {
  const fixtures = [
    ['rgb(0, 0, 0)', [[0, 0, 0], 1]],
    ['rgb(12, 34, 56)', [[12, 34, 56], 1]],
    ['rgb(281, -13, 45)', [[255, 0, 45], 1]],
    ['rgb(2746, 1000, -3271)', [[255, 255, 0], 1]],
    ['rgb(  281  ,  -13  ,  45  )', [[255, 0, 45], 1]],
    ['rgb(281,-13,45)', [[255, 0, 45], 1]],
    ['rgb(75%, 50%, 10%)', [[191, 128, 26], 1]],
    ['rgb(  75%  ,  50%  ,  10%  )', [[191, 128, 26], 1]],
    ['rgb(75%,50%,10%)', [[191, 128, 26], 1]],
    ['rgba(12, 34, 56, 0)', [[12, 34, 56], 0]],
    ['rgba(12, 34, 56, 1)', [[12, 34, 56], 1]],
    ['rgba(12, 34, 56, 0.8)', [[12, 34, 56], 0.8]],
    ['rgba(12, 34, 56, .8)', [[12, 34, 56], 0.8]],
    ['rgba(  12  ,  34 ,  56  ,  .8  )', [[12, 34, 56], 0.8]],
    ['rgba(12,34,56,.8)', [[12, 34, 56], 0.8]],
    ['rgba(723, -83, 0, 1.3)', [[255, 0, 0], 1]],
    ['rgba(723, -83, 0, -.3)', [[255, 0, 0], 0]],
    ['rgba(2746, 1000, -3271, .5)', [[255, 255, 0], 0.5]],
    ['rgba(75%, 50%, 10%, 0.8)', [[191, 128, 26], 0.8]],
    ['rgba(75%, 50%, 10%, .8)', [[191, 128, 26], 0.8]],
    ['rgba(  75%  ,  50%  ,  10%  ,  .8  )', [[191, 128, 26], 0.8]]
  ];

  for (const [str, [rgb, alpha]] of fixtures) {
    const [prgb, palpha] = parseRgb(str);
    t.deepEqual(prgb, rgb, str);
    t.is(palpha, alpha, str);
  }
});

test('parseRgb() returns black with alpha 0 when given an invalid rgb(a) color string', t => {
  const fixtures = [
    'rgb(255, 255, 255, 255)',
    'rgb(255, 255)',
    'rgb(255, 255, 255',
    'rgb(255 255 255)',
    'rgb(255, 100%, 255)',
    'rgba(255, 255, 255)',
    'rgba(255, 255, 0.8)',
    'rgba(255, 255, 255, 80%)',
    'rgba(255, 255, 0.8',
    'rgba(255, 100%, 255, 1)'
  ];

  for (const str of fixtures) {
    t.deepEqual(parseRgb(str), [[0, 0, 0], 0], str);
  }
});

test('parseHsl() parses an hsl(a) color string to an hsl * alpha tuple', t => {
  const fixtures = [
    ['hsl(210, 65%, 13%)', [[210, 0.65, 0.13], 1]],
    ['hsl(  210, 65%  , 13%  )', [[210, 0.65, 0.13], 1]],
    ['hsl(-10, 120%, -14%)', [[350, 1, 0], 1]],
    ['hsla(210, 65%, 13%, 0)', [[210, 0.65, 0.13], 0]],
    ['hsla(210, 65%, 13%, 1)', [[210, 0.65, 0.13], 1]],
    ['hsla(210, 65%, 13%, .8)', [[210, 0.65, 0.13], 0.8]],
    ['hsla(  210, 65% , 13%  , .8 )', [[210, 0.65, 0.13], 0.8]]
  ];

  for (const [str, parsed] of fixtures) {
    t.deepEqual(parseHsl(str), parsed, str);
  }
});

test('parseHsl() returns black with alpha 0 when given an invalid hsl(a) color string', t => {
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
