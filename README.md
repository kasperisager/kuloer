# Kulør

> A lightning-fast CSS color parsing and manipulation library with a tiny footprint

[![Build Status](https://travis-ci.org/kasperisager/kuloer.svg?branch=master)](https://travis-ci.org/kasperisager/kuloer) [![Coverage Status](https://coveralls.io/repos/github/kasperisager/kuloer/badge.svg?branch=master)](https://coveralls.io/github/kasperisager/kuloer?branch=master) [![Code Climate](https://codeclimate.com/github/kasperisager/kuloer/badges/gpa.svg)](https://codeclimate.com/github/kasperisager/kuloer) [![Inline docs](http://inch-ci.org/github/kasperisager/kuloer.svg?branch=master)](http://inch-ci.org/github/kasperisager/kuloer)

Kulør is a library for working with color units from the [CSS3 Color Module](https://www.w3.org/TR/css3-color) using a JavaScript API. The library is tweaked to provide excellent performance whilst keeping its footprint as small as possible. The primary use case of the library is checking color contrasts in accordance with the [Web Content Accessibility Guidelines](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef).

## Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
-   [License](#license)

## Installation

```sh
$ npm install --save kuloer
```

## Usage

```js
import Color, {contrast} from 'kuloer';

const pink = Color('pink');
const blue = Color('#00f');

contrast(pink, blue);
```

## API

### Color

Parse a color string to a color object.

**Parameters**

-   `color` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The color string to parse.

**Properties**

-   `hex` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The color represented as an rgb hex value.
-   `rgb` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The color represented as an rgb triple.
-   `hsl` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** The color represented as an hsl triple.
-   `alpha` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The alpha value of the color.

**Examples**

```javascript
const red = Color('rgba(255,0,0,.5)');

{
  hex: 0xff0000,
  rgb: [255, 0, 0],
  hsl: [0, 1, 0.5],
  alpha: 0.5
}
```

### contrast

Compute the contrast ratio between two colors.

**Parameters**

-   `colorA` **Color** The first color.
-   `colorB` **Color** The second color.

**Examples**

```javascript
contrast(Color('#ffc0cb'), Color('#ff69b4'));
// => 1.721
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The contrast ratio between the colors.

### luminance

Compute the relative luminance of a color.

**Parameters**

-   `color` **Color** The color to compute the luminance of.

**Examples**

```javascript
luminance(Color('#7fffd4'));
// => 0.808
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The relative luminance of the color.

## License

Copyright © 2016 [Kasper Kronborg Isager](https://github.com/kasperisager). Licensed under the terms of the [MIT license](LICENSE.md).
