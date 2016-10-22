/**
 * Copyright (c) Jesse David Martin (@motleydev) | MIT license
 * Formulas stolen directly from @snookca / verified against the WCAG2 Spec
 * https://snook.ca/technical/colour_contrast/colour.html
 */

const colorCheck = {

  color: {r: 0, g: 0, b: 0},
  brightnessThreshold: 125,
  colorContrastThreshold: 500

}

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description Checks if a hex string or object was given and returns
 * the rgb color values of the former. To keep a tiny library, it's the user's
 * responsibility to provide valid hex/rgbObj values.
 * @return {object} returns an object of shape {r, g, b}
 */

colorCheck.hexToRgb = colorValue => {

  let color = Object.assign({}, colorCheck.color)

  // Check return if already an object.
  if (colorValue !== null &&
    typeof colorValue === 'object' &&
    colorValue.hasOwnProperty('r')) {
      return colorValue
    }

  // Get parts of Hex
  let hexPat = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

  // Parse the values and remove the full-string match
  let result = hexPat.exec(colorValue)
    .map((val, index) => {
      if (index > 0)
        return parseInt(val, 16)
    }).slice(1);

  // destructuring assignment
  [color.r, color.g, color.b] = result

  return result ? color : null

}

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description Checks if the two colors have siignificant color difference
 * @return {boolean} gives a numeric value must be 500 or greater
 */

colorCheck.colorDifference = (f, b) => {

  let fg = colorCheck.hexToRgb(f)
  let bg = colorCheck.hexToRgb(b)

  let _maxMin = (x, y, v) => Math.max(x[v], y[v]) - Math.min(x[v], y[v])

  let colorDifference = 0

  Object.keys(colorCheck.color)
    .map((val) => colorDifference += _maxMin(fg, bg, val))

  return colorDifference >= colorCheck.colorContrastThreshold

}

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a boolean value if there is enough brightness difference
 * @return {boolean} gives a numeric value must be over 125
 */

colorCheck.colorBrightnessDifference = (f, b) => {

  let fg = colorCheck.hexToRgb(f)
  let bg = colorCheck.hexToRgb(b)

  let brightness = (r, g, b) =>
    ((r * 299) + (g * 587) + (b * 114)) / 1000

  let bY = brightness(bg.r, bg.g, bg.b)
  let fY = brightness(fg.r, fg.g, fg.b)

  return Math.round(Math.abs(bY-fY)) >= colorCheck.brightnessThreshold

}

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a numeric value of the total luminance
 * @return {number} gives a numeric value
 */
colorCheck.colorGetLuminance = (rgb) => {

  rgb.map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow(((val + 0.055)/1.055), 2.4)
  })

  return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2])

}

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a numeric value for the color contrast
 * @return {number} gives a numeric value
 */

colorCheck.colorContrast = (f, b) => {

  let fg = colorCheck.hexToRgb(f)
  let bg = colorCheck.hexToRgb(b)

  let ratio = 1

  let luminance = (colorObj) => {
    return Object.keys(colorObj).map((val) => {
      return colorObj[val]/255
    })
  }

  let l1 = colorCheck.colorGetLuminance([ ...luminance(fg)])
  let l2 = colorCheck.colorGetLuminance([ ...luminance(bg)])

  ratio = l1 >= l2 ?
    (l1 + 0.05) / (l2 + 0.05) :
    (l2 + .05) / (l1 + .05)

  return Math.round(ratio * 100) / 100

}

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a boolean if the values are both color compiant and contrast compliant
 * @return {boolean} gives a boolean response.
 */

colorCheck.colorCompliance = (f, b) =>
  (colorCheck.colorBrightnessDifference(f, b)) && (colorCheck.colorDifference(f, b))

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a boolean if the value is acceptible for AA standards
 * for legibility of size 14pt font.
 * @return {boolean} gives a boolean response.
 */

colorCheck.aa = (f, b) => colorCheck.colorContrast(f, b) >= 4.5

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a boolean if the value is acceptible for AA standards
 * for legibility of size 18pt font.
 * @return {boolean} gives a boolean response.
 */

colorCheck.aa_18 = (f, b) => colorCheck.colorContrast(f, b) >= 3

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a boolean if the value is acceptible for AAA standards
 * for legibility of size 14pt font. It's ok, this is very hard to achieve.
 * @return {boolean} gives a boolean response.
 */

colorCheck.aaa = (f, b) => colorCheck.colorContrast(f, b) >= 7

/**
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @param  {(string | object)} hex color string or object of shape {r, g, b}
 * @description returns a boolean if the value is acceptible for AAA standards
 * for legibility of size 18pt font. It's ok, this is hard to achieve.
 * @return {boolean} gives a boolean response.
 */

colorCheck.aaa_18 = (f, b) => colorCheck.colorContrast(f, b) >= 4.5



module.exports = colorCheck
