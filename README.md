# Kulør

> A lightning-fast CSS color parsing and manipulation library with a tiny footprint

[![Build Status](https://travis-ci.org/kasperisager/kuloer.svg?branch=master)](https://travis-ci.org/kasperisager/kuloer) [![Code Climate](https://codeclimate.com/github/kasperisager/kuloer/badges/gpa.svg)](https://codeclimate.com/github/kasperisager/kuloer) [![Inline docs](http://inch-ci.org/github/kasperisager/kuloer.svg?branch=master)](http://inch-ci.org/github/kasperisager/kuloer)

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
