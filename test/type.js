import test from 'ava';
import type, {NAMED, HEX, RGB, HSL, UNKNOWN} from '../lib/type';

test('type() guesses the type of a (potentially) valid color string', async t => {
  const fixtures = [
    ['red', NAMED],
    ['#ff6600', HEX],
    ['#f60', HEX],
    ['rgb(173, 18, 45)', RGB],
    ['rgba(64, 18, 128, .8)', RGB],
    ['hsl(175, 1%, 40%)', HSL],
    ['hsl(191, 72%, 80%)', HSL]
  ];

  for (const [str, res] of fixtures) {
    t.is(type(str), res);
  }
});

test('type() returns UNKNOWN when given a color string it cannot guess', async t => {
  const fixtures = [
    'foo',
    'ffff',
    'rgc(173, 28, 111)',
    'hsb(13, 50%, 12%)'
  ];

  for (const str of fixtures) {
    t.is(type(str), UNKNOWN);
  }
});
