/* eslint-env mocha */
'use strict'

import { expect } from 'chai'
import colorCheck from '../'

// hexToRgb

describe('hexToRgb function', function () {
  // Pass in String
  it('should return white rgb obj from a white hex string', function () {
    expect(colorCheck.hexToRgb('#ffffff')).to.deep.equal({ r: 255, g: 255, b: 255 })
  })

  // Pass in Obj
  it('should return white rgb obj from a white rgb obj', function () {
    expect(colorCheck.hexToRgb({r: 255, g: 255, b: 255})).to.deep.equal({ r: 255, g: 255, b: 255 })
  })
})

// colorDifference

describe('color-difference-function', function () {
  // White on Black
  it('white hex string should have enough color contrast over black', function () {
    expect(colorCheck.colorDifference('#ffffff', '#000000')).to.be.true
  })

  // Dark Gray on Black
  it('dark gray hex string should not have enough color contrast over black', function () {
    expect(colorCheck.colorDifference('#0a0a0a', '#000000')).to.be.false
  })
})

// colorBrightnessDifference

describe('brightness-difference-function', function () {
  // White on Black
  it('white hex string should have enough brightness contrast over black', function () {
    expect(colorCheck.colorBrightnessDifference('#ffffff', '#000000')).to.be.true
  })

  // Dark Gray on Black
  it('dark gray hex string should not have enough brightness contrast over black', function () {
    expect(colorCheck.colorBrightnessDifference('#0a0a0a', '#000000')).to.be.false
  })
})

// colorContrast

describe('color-contrast-function', function () {
  it('should return a numerical value from a hex string', function () {
    expect(colorCheck.colorContrast('#a0a0a0', '#ffffff')).to.be.a('number')
  })
})

// colorCompliance

describe('color-compliance-function', function () {
  // Black on White
  it('should return true for black on white', function () {
    expect(colorCheck.colorCompliance('#ffffff', '#000000')).to.be.true
  })

  // Dark on black
  it('should return true for black on white', function () {
    expect(colorCheck.colorCompliance('#0a0a0a', '#000000')).to.be.false
  })
})

// colorGetLuminance

describe('color-luminance-function', function () {
  it('should return a numerical value from a hex string', function () {
    expect(colorCheck.colorGetLuminance([0, 0, 0])).to.be.a('number')
  })
})

// AA

describe('aa-check-function', function () {
  // White on White Hex
  it('white on white hex-string should return false', function () {
    expect(colorCheck.aa('#ffffff', '#ffffff')).to.be.false
  })

  // Black on White Hex
  it('black on white hex-string should return true', function () {
    expect(colorCheck.aa('#000000', '#ffffff')).to.be.true
  })

  // White on White Obj
  it('white on white object input should return false', function () {
    expect(colorCheck.aa({r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255})).to.be.false
  })

  // Black on White Obj
  it('black on white object should return true', function () {
    expect(colorCheck.aa({r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255})).to.be.true
  })

  // Passing 18, Failing 14
  it('dark on black should be false for 14 aa', function () {
    expect(colorCheck.aa_18('#6E6E6E', {r: 255, g: 255, b: 255})).to.be.false
  })
})

// AA_18

describe('aa_18-check-function', function () {
  // White on White Hex
  it('white on white hex-string should return false', function () {
    expect(colorCheck.aa_18('#ffffff', '#ffffff')).to.be.false
  })

  // Black on White Hex
  it('black on white hex-string should return true', function () {
    expect(colorCheck.aa_18('#000000', '#ffffff')).to.be.true
  })

  // White on White Obj
  it('white on white object input should return false', function () {
    expect(colorCheck.aa_18({r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255})).to.be.false
  })

  // Black on White Obj
  it('black on white object should return true', function () {
    expect(colorCheck.aa_18({r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255})).to.be.true
  })

  // Passing 18, Failing 14
  it('dark on black should be true for 18 aa', function () {
    expect(colorCheck.aa_18('#6E6E6E', {r: 0, g: 0, b: 0})).to.be.true
  })
})

// AAA

describe('aaa-check-function', function () {
  // White on White Hex
  it('white on white hex-string should return false', function () {
    expect(colorCheck.aaa('#ffffff', '#ffffff')).to.be.false
  })

  // Black on White Hex
  it('black on white hex-string should return true', function () {
    expect(colorCheck.aaa('#000000', '#ffffff')).to.be.true
  })

  // White on White Obj
  it('white on white object input should return false', function () {
    expect(colorCheck.aaa({r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255})).to.be.false
  })

  // Black on White Obj
  it('black on white object should return true', function () {
    expect(colorCheck.aaa({r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255})).to.be.true
  })
})

// AAA_18

describe('aaa_18-check-function', function () {
  // White on White Hex
  it('white on white hex-string should return false', function () {
    expect(colorCheck.aaa_18('#ffffff', '#ffffff')).to.be.false
  })

  // Black on White Hex
  it('black on white hex-string should return true', function () {
    expect(colorCheck.aaa_18('#000000', '#ffffff')).to.be.true
  })

  // White on White Obj
  it('white on white object input should return false', function () {
    expect(colorCheck.aaa_18({r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255})).to.be.false
  })

  // Black on White Obj
  it('black on white object should return true', function () {
    expect(colorCheck.aaa_18({r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255})).to.be.true
  })
})
