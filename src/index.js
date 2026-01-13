/**
 * Copyright (c) Jesse David Martin (@motleydev) | MIT license
 * Formulas stolen directly from @snookca / verified against the WCAG2 Spec
 * https://snook.ca/technical/colour_contrast/colour.html
 */

const colorCheck = {
  brightnessThreshold: 125,
  colorContrastThreshold: 500
}

/**
 * @param  {(string|object)} colorValue - Hex color string or object of shape {r, g, b}
 * @return {object} Returns an object of shape {r, g, b}
 */
colorCheck.hexToRgb = colorValue => {
  if (colorValue && typeof colorValue === 'object' && 'r' in colorValue) {
    return colorValue
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorValue)
  return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
}

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if color difference >= 500
 */
colorCheck.colorDifference = (f, b) => {
  const fg = colorCheck.hexToRgb(f)
  const bg = colorCheck.hexToRgb(b)
  return Math.abs(fg.r - bg.r) + Math.abs(fg.g - bg.g) + Math.abs(fg.b - bg.b) >= colorCheck.colorContrastThreshold
}

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if brightness difference >= 125
 */
colorCheck.colorBrightnessDifference = (f, b) => {
  const fg = colorCheck.hexToRgb(f)
  const bg = colorCheck.hexToRgb(b)
  const brightness = c => (c.r * 299 + c.g * 587 + c.b * 114) / 1000
  return Math.abs(brightness(fg) - brightness(bg)) >= colorCheck.brightnessThreshold
}

/**
 * @param  {array} rgb - Array of three numbers within 0-1 (normalized)
 * @return {number} Luminance value
 */
colorCheck.colorGetLuminance = rgb => {
  const lin = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
}

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {number} Contrast ratio
 */
colorCheck.colorContrast = (f, b) => {
  const fg = colorCheck.hexToRgb(f)
  const bg = colorCheck.hexToRgb(b)
  const lum = c => colorCheck.colorGetLuminance([c.r / 255, c.g / 255, c.b / 255])
  const l1 = lum(fg)
  const l2 = lum(bg)
  const ratio = l1 >= l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05)
  return Math.round(ratio * 100) / 100
}

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if both brightness and color difference pass
 */
colorCheck.colorCompliance = (f, b) =>
  colorCheck.colorBrightnessDifference(f, b) && colorCheck.colorDifference(f, b)

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if passes AA standard (4.5:1) for 14pt text
 */
colorCheck.aa = (f, b) => colorCheck.colorContrast(f, b) >= 4.5

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if passes AA standard (3:1) for 18pt text
 */
colorCheck.aa_18 = (f, b) => colorCheck.colorContrast(f, b) >= 3

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if passes AAA standard (7:1) for 14pt text
 */
colorCheck.aaa = (f, b) => colorCheck.colorContrast(f, b) >= 7

/**
 * @param  {(string|object)} f - Foreground color
 * @param  {(string|object)} b - Background color
 * @return {boolean} True if passes AAA standard (4.5:1) for 18pt text
 */
colorCheck.aaa_18 = (f, b) => colorCheck.colorContrast(f, b) >= 4.5

module.exports = colorCheck
