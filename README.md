# Kulør

> A lightning-fast CSS color parsing and manipulation library with a tiny footprint

[![Build Status](https://travis-ci.org/kasperisager/kuloer.svg?branch=master)](https://travis-ci.org/kasperisager/kuloer) [![Coverage Status](https://coveralls.io/repos/github/kasperisager/kuloer/badge.svg?branch=master)](https://coveralls.io/github/kasperisager/kuloer?branch=master) [![Code Climate](https://codeclimate.com/github/kasperisager/kuloer/badges/gpa.svg)](https://codeclimate.com/github/kasperisager/kuloer) [![Inline docs](http://inch-ci.org/github/kasperisager/kuloer.svg?branch=master)](http://inch-ci.org/github/kasperisager/kuloer)

Kulør is a library for working with color units from the [CSS3 Color Module](https://www.w3.org/TR/css3-color) using a JavaScript API. The library is tweaked to provide excellent performance whilst keeping its footprint as small as possible. The primary use case of the library is checking color contrasts in accordance with the [Web Content Accessibility Guidelines](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef).

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

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

## License

Copyright &copy; 2016 [Kasper Kronborg Isager](https://github.com/kasperisager). Licensed under the terms of the [MIT license](LICENSE.md).
