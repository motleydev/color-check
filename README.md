# Color Check
![travis](https://img.shields.io/travis/motleydev/color-check.svg)
![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)
![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)
![codecov](https://img.shields.io/codecov/c/github/motleydev/color-check.svg)

Color Check is a very tiny library for checking your foreground and backgorunds colors against the WCAG2 color compliance standard. There are a range of methods which can be found in the [docs](/docs/api.md) including returning the actual values used in calculating the AA, AA 18, AAA and AAA 18 standards as well as color contrast and color difference checks.

There are other libraries such as the excelent [color](https://www.npmjs.com/package/color) package which will parse any valid css color syntax and provide methods for checking the values needed. This library is smaller and returns boolean values where possible. Being smaller, it requires *you* to provide the valid hex string or rgb color object. Errors will simply fail.

## Getting Started

`npm install color-check`

## Usage

``` javascript
var colorCheck = require('color-check');
colorCheck.aa('#000000', {r:0, g:0, b: 0}) // returns true
```

For other methods, see the [docs](/docs/api.md)

Good accessibility means good UX for everyone!

Enjoy!

---

MIT License
