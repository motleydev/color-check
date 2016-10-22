# color-check
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[travis-image]: https://img.shields.io/travis/motleydev/color-check.svg?style=flat
[travis-url]: https://travis-ci.org/motleydev/color-check
[npm-image]: https://img.shields.io/npm/v/color-check.svg?style=flat
[npm-url]: https://npmjs.org/package/color-check
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

## Install

```
$ npm install --save color-check
```

## Usage

```js
var colorCheck = require('color-check');

colorCheck('unicorns');
//=> unicorns & rainbows
```

## API

### colorCheck(input, [options])

#### input

- *Required*
- Type: `string`

Lorem ipsum.

#### options

##### foo

- Type: `boolean`
- Default: `false`

Lorem ipsum.

## Contributing

### Build

```js
npm run build
```

### Test

```js
npm test
```

### Watch

To watch for changes, build them and run the tests:

```js
npm run watch
```

## License

MIT © [Jesse Martin](https://jessedavidmartin.com)
