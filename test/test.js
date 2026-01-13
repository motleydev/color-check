/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
'use strict'

import { expect } from 'chai'
import colorCheck from '../src/'

// =============================================================================
// Module Structure Tests
// =============================================================================

describe('Module Structure', function () {
  it('should export an object', function () {
    expect(colorCheck).to.be.an('object')
  })

  it('should have all required methods', function () {
    expect(colorCheck.hexToRgb).to.be.a('function')
    expect(colorCheck.colorDifference).to.be.a('function')
    expect(colorCheck.colorBrightnessDifference).to.be.a('function')
    expect(colorCheck.colorGetLuminance).to.be.a('function')
    expect(colorCheck.colorContrast).to.be.a('function')
    expect(colorCheck.colorCompliance).to.be.a('function')
    expect(colorCheck.aa).to.be.a('function')
    expect(colorCheck.aa_18).to.be.a('function')
    expect(colorCheck.aaa).to.be.a('function')
    expect(colorCheck.aaa_18).to.be.a('function')
  })

  it('should have threshold constants', function () {
    expect(colorCheck.brightnessThreshold).to.equal(125)
    expect(colorCheck.colorContrastThreshold).to.equal(500)
  })
})

// =============================================================================
// hexToRgb Tests
// =============================================================================

describe('hexToRgb', function () {
  describe('hex string parsing', function () {
    it('should parse white hex string with hash', function () {
      expect(colorCheck.hexToRgb('#ffffff')).to.deep.equal({ r: 255, g: 255, b: 255 })
    })

    it('should parse white hex string without hash', function () {
      expect(colorCheck.hexToRgb('ffffff')).to.deep.equal({ r: 255, g: 255, b: 255 })
    })

    it('should parse black hex string', function () {
      expect(colorCheck.hexToRgb('#000000')).to.deep.equal({ r: 0, g: 0, b: 0 })
    })

    it('should parse red hex string', function () {
      expect(colorCheck.hexToRgb('#ff0000')).to.deep.equal({ r: 255, g: 0, b: 0 })
    })

    it('should parse green hex string', function () {
      expect(colorCheck.hexToRgb('#00ff00')).to.deep.equal({ r: 0, g: 255, b: 0 })
    })

    it('should parse blue hex string', function () {
      expect(colorCheck.hexToRgb('#0000ff')).to.deep.equal({ r: 0, g: 0, b: 255 })
    })

    it('should parse uppercase hex string', function () {
      expect(colorCheck.hexToRgb('#ABCDEF')).to.deep.equal({ r: 171, g: 205, b: 239 })
    })

    it('should parse mixed case hex string', function () {
      expect(colorCheck.hexToRgb('#AbCdEf')).to.deep.equal({ r: 171, g: 205, b: 239 })
    })

    it('should parse gray hex string', function () {
      expect(colorCheck.hexToRgb('#808080')).to.deep.equal({ r: 128, g: 128, b: 128 })
    })
  })

  describe('RGB object passthrough', function () {
    it('should return white rgb object unchanged', function () {
      expect(colorCheck.hexToRgb({ r: 255, g: 255, b: 255 })).to.deep.equal({ r: 255, g: 255, b: 255 })
    })

    it('should return black rgb object unchanged', function () {
      expect(colorCheck.hexToRgb({ r: 0, g: 0, b: 0 })).to.deep.equal({ r: 0, g: 0, b: 0 })
    })

    it('should return arbitrary rgb object unchanged', function () {
      expect(colorCheck.hexToRgb({ r: 100, g: 150, b: 200 })).to.deep.equal({ r: 100, g: 150, b: 200 })
    })
  })
})

// =============================================================================
// colorGetLuminance Tests
// =============================================================================

describe('colorGetLuminance', function () {
  it('should return a number', function () {
    expect(colorCheck.colorGetLuminance([0, 0, 0])).to.be.a('number')
  })

  it('should return 0 for black', function () {
    expect(colorCheck.colorGetLuminance([0, 0, 0])).to.equal(0)
  })

  it('should return 1 for white', function () {
    expect(colorCheck.colorGetLuminance([1, 1, 1])).to.equal(1)
  })

  it('should apply sRGB linearization correctly', function () {
    // For values > 0.03928, linearization should apply
    // 0.5 linearized = ((0.5 + 0.055) / 1.055)^2.4 ≈ 0.214
    const result = colorCheck.colorGetLuminance([0.5, 0.5, 0.5])
    expect(result).to.be.closeTo(0.214, 0.001)
  })

  it('should apply linear formula for low values', function () {
    // For values <= 0.03928, linearization is val / 12.92
    // 0.03 / 12.92 ≈ 0.00232
    const result = colorCheck.colorGetLuminance([0.03, 0.03, 0.03])
    expect(result).to.be.closeTo(0.00232, 0.0001)
  })

  it('should weight RGB channels correctly', function () {
    // Pure red (1, 0, 0) should give 0.2126
    expect(colorCheck.colorGetLuminance([1, 0, 0])).to.be.closeTo(0.2126, 0.0001)
    // Pure green (0, 1, 0) should give 0.7152
    expect(colorCheck.colorGetLuminance([0, 1, 0])).to.be.closeTo(0.7152, 0.0001)
    // Pure blue (0, 0, 1) should give 0.0722
    expect(colorCheck.colorGetLuminance([0, 0, 1])).to.be.closeTo(0.0722, 0.0001)
  })
})

// =============================================================================
// colorContrast Tests
// =============================================================================

describe('colorContrast', function () {
  it('should return a number', function () {
    expect(colorCheck.colorContrast('#a0a0a0', '#ffffff')).to.be.a('number')
  })

  it('should return 21 for black on white', function () {
    expect(colorCheck.colorContrast('#000000', '#ffffff')).to.equal(21)
  })

  it('should return 21 for white on black', function () {
    expect(colorCheck.colorContrast('#ffffff', '#000000')).to.equal(21)
  })

  it('should return 1 for same colors', function () {
    expect(colorCheck.colorContrast('#ffffff', '#ffffff')).to.equal(1)
    expect(colorCheck.colorContrast('#000000', '#000000')).to.equal(1)
    expect(colorCheck.colorContrast('#808080', '#808080')).to.equal(1)
  })

  it('should handle RGB objects', function () {
    expect(colorCheck.colorContrast({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).to.equal(21)
  })

  it('should handle mixed input types', function () {
    expect(colorCheck.colorContrast('#000000', { r: 255, g: 255, b: 255 })).to.equal(21)
    expect(colorCheck.colorContrast({ r: 0, g: 0, b: 0 }, '#ffffff')).to.equal(21)
  })

  it('should calculate known contrast ratios correctly', function () {
    // Gray on white - known value approximately 2.14
    const result = colorCheck.colorContrast('#808080', '#ffffff')
    expect(result).to.be.closeTo(3.95, 0.1)
  })
})

// =============================================================================
// colorDifference Tests
// =============================================================================

describe('colorDifference', function () {
  it('should return true for white on black (difference = 765)', function () {
    expect(colorCheck.colorDifference('#ffffff', '#000000')).to.be.true
  })

  it('should return false for dark gray on black', function () {
    expect(colorCheck.colorDifference('#0a0a0a', '#000000')).to.be.false
  })

  it('should return true when difference equals 500', function () {
    // Difference of exactly 500: e.g., one channel differs by 500
    // 167 + 167 + 166 = 500
    expect(colorCheck.colorDifference('#a7a7a6', '#000000')).to.be.true
  })

  it('should return false when difference is 499', function () {
    // Just under threshold
    expect(colorCheck.colorDifference('#a6a6a5', '#000000')).to.be.false
  })

  it('should handle RGB objects', function () {
    expect(colorCheck.colorDifference({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })).to.be.true
  })

  it('should calculate difference correctly for single channel', function () {
    // Red channel only: 255 - 0 = 255
    expect(colorCheck.colorDifference('#ff0000', '#000000')).to.be.false
  })
})

// =============================================================================
// colorBrightnessDifference Tests
// =============================================================================

describe('colorBrightnessDifference', function () {
  it('should return true for white on black', function () {
    expect(colorCheck.colorBrightnessDifference('#ffffff', '#000000')).to.be.true
  })

  it('should return false for dark gray on black', function () {
    expect(colorCheck.colorBrightnessDifference('#0a0a0a', '#000000')).to.be.false
  })

  it('should return true when brightness difference equals 125', function () {
    // Brightness = ((R*299) + (G*587) + (B*114)) / 1000
    // Need to find color where brightness ≈ 125
    // If R=G=B=x, brightness = x*(299+587+114)/1000 = x
    // So #7d7d7d (125,125,125) should have brightness 125
    expect(colorCheck.colorBrightnessDifference('#7d7d7d', '#000000')).to.be.true
  })

  it('should return false when brightness difference is 124', function () {
    // #7c7c7c = 124,124,124 -> brightness ≈ 124
    expect(colorCheck.colorBrightnessDifference('#7c7c7c', '#000000')).to.be.false
  })

  it('should handle RGB objects', function () {
    expect(colorCheck.colorBrightnessDifference({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })).to.be.true
  })

  it('should weight green most heavily', function () {
    // Green has weight 587, red 299, blue 114
    // Pure green brightness = 255 * 587 / 1000 ≈ 150
    // Pure red brightness = 255 * 299 / 1000 ≈ 76
    // Pure blue brightness = 255 * 114 / 1000 ≈ 29
    expect(colorCheck.colorBrightnessDifference('#00ff00', '#000000')).to.be.true // 150 >= 125
    expect(colorCheck.colorBrightnessDifference('#ff0000', '#000000')).to.be.false // 76 < 125
    expect(colorCheck.colorBrightnessDifference('#0000ff', '#000000')).to.be.false // 29 < 125
  })
})

// =============================================================================
// colorCompliance Tests
// =============================================================================

describe('colorCompliance', function () {
  it('should return true when both brightness and color difference pass', function () {
    expect(colorCheck.colorCompliance('#ffffff', '#000000')).to.be.true
  })

  it('should return false when brightness fails', function () {
    expect(colorCheck.colorCompliance('#0a0a0a', '#000000')).to.be.false
  })

  it('should return false when color difference fails', function () {
    // Need colors with good brightness but poor color difference
    expect(colorCheck.colorCompliance('#808080', '#7f7f7f')).to.be.false
  })

  it('should handle RGB objects', function () {
    expect(colorCheck.colorCompliance({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })).to.be.true
  })
})

// =============================================================================
// WCAG AA (4.5:1 for normal text) Tests
// =============================================================================

describe('aa', function () {
  describe('basic cases', function () {
    it('should return false for white on white', function () {
      expect(colorCheck.aa('#ffffff', '#ffffff')).to.be.false
    })

    it('should return true for black on white', function () {
      expect(colorCheck.aa('#000000', '#ffffff')).to.be.true
    })

    it('should return true for white on black', function () {
      expect(colorCheck.aa('#ffffff', '#000000')).to.be.true
    })

    it('should return false for black on black', function () {
      expect(colorCheck.aa('#000000', '#000000')).to.be.false
    })
  })

  describe('threshold boundary (4.5:1)', function () {
    it('should return true for contrast ratio >= 4.5', function () {
      // #767676 on white gives ~4.54:1 contrast
      expect(colorCheck.aa('#767676', '#ffffff')).to.be.true
    })

    it('should return false for contrast ratio < 4.5', function () {
      // #777777 on white gives ~4.48:1 contrast
      expect(colorCheck.aa('#777777', '#ffffff')).to.be.false
    })
  })

  describe('input types', function () {
    it('should handle RGB object for foreground', function () {
      expect(colorCheck.aa({ r: 0, g: 0, b: 0 }, '#ffffff')).to.be.true
    })

    it('should handle RGB object for background', function () {
      expect(colorCheck.aa('#000000', { r: 255, g: 255, b: 255 })).to.be.true
    })

    it('should handle RGB objects for both', function () {
      expect(colorCheck.aa({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).to.be.true
    })

    it('should handle hex without hash', function () {
      expect(colorCheck.aa('000000', 'ffffff')).to.be.true
    })
  })
})

// =============================================================================
// WCAG AA Large Text (3:1 for 18pt+) Tests
// =============================================================================

describe('aa_18', function () {
  describe('basic cases', function () {
    it('should return false for white on white', function () {
      expect(colorCheck.aa_18('#ffffff', '#ffffff')).to.be.false
    })

    it('should return true for black on white', function () {
      expect(colorCheck.aa_18('#000000', '#ffffff')).to.be.true
    })
  })

  describe('threshold boundary (3:1)', function () {
    it('should return true for contrast ratio >= 3', function () {
      // #959595 on white gives ~3:1 contrast
      expect(colorCheck.aa_18('#959595', '#ffffff')).to.be.true
    })

    it('should return false for contrast ratio < 3', function () {
      // #969696 on white gives ~2.97:1 contrast
      expect(colorCheck.aa_18('#969696', '#ffffff')).to.be.false
    })
  })

  describe('should be more permissive than aa', function () {
    it('should pass colors that fail aa but meet aa_18', function () {
      // Colors that pass 3:1 but fail 4.5:1
      expect(colorCheck.aa('#888888', '#ffffff')).to.be.false
      expect(colorCheck.aa_18('#888888', '#ffffff')).to.be.true
    })
  })

  describe('input types', function () {
    it('should handle RGB objects', function () {
      expect(colorCheck.aa_18({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).to.be.true
    })

    it('should handle mixed input types', function () {
      expect(colorCheck.aa_18('#6E6E6E', { r: 0, g: 0, b: 0 })).to.be.true
    })
  })
})

// =============================================================================
// WCAG AAA (7:1 for normal text) Tests
// =============================================================================

describe('aaa', function () {
  describe('basic cases', function () {
    it('should return false for white on white', function () {
      expect(colorCheck.aaa('#ffffff', '#ffffff')).to.be.false
    })

    it('should return true for black on white', function () {
      expect(colorCheck.aaa('#000000', '#ffffff')).to.be.true
    })
  })

  describe('threshold boundary (7:1)', function () {
    it('should return true for contrast ratio >= 7', function () {
      // #595959 on white gives ~7.0:1 contrast
      expect(colorCheck.aaa('#595959', '#ffffff')).to.be.true
    })

    it('should return false for contrast ratio < 7', function () {
      // #5a5a5a on white gives ~6.89:1 contrast
      expect(colorCheck.aaa('#5a5a5a', '#ffffff')).to.be.false
    })
  })

  describe('should be stricter than aa', function () {
    it('should fail colors that pass aa but not aaa', function () {
      // #767676 passes AA (4.5:1) but fails AAA (7:1)
      expect(colorCheck.aa('#767676', '#ffffff')).to.be.true
      expect(colorCheck.aaa('#767676', '#ffffff')).to.be.false
    })
  })

  describe('input types', function () {
    it('should handle RGB objects', function () {
      expect(colorCheck.aaa({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).to.be.true
      expect(colorCheck.aaa({ r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 })).to.be.false
    })
  })
})

// =============================================================================
// WCAG AAA Large Text (4.5:1 for 18pt+) Tests
// =============================================================================

describe('aaa_18', function () {
  describe('basic cases', function () {
    it('should return false for white on white', function () {
      expect(colorCheck.aaa_18('#ffffff', '#ffffff')).to.be.false
    })

    it('should return true for black on white', function () {
      expect(colorCheck.aaa_18('#000000', '#ffffff')).to.be.true
    })
  })

  describe('threshold boundary (4.5:1)', function () {
    it('should have same threshold as aa', function () {
      // aaa_18 and aa have the same 4.5:1 threshold
      expect(colorCheck.aaa_18('#767676', '#ffffff')).to.equal(colorCheck.aa('#767676', '#ffffff'))
      expect(colorCheck.aaa_18('#777777', '#ffffff')).to.equal(colorCheck.aa('#777777', '#ffffff'))
    })
  })

  describe('should be more permissive than aaa', function () {
    it('should pass colors that fail aaa but meet aaa_18', function () {
      // #767676 passes 4.5:1 but fails 7:1
      expect(colorCheck.aaa('#767676', '#ffffff')).to.be.false
      expect(colorCheck.aaa_18('#767676', '#ffffff')).to.be.true
    })
  })

  describe('input types', function () {
    it('should handle RGB objects', function () {
      expect(colorCheck.aaa_18({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })).to.be.true
      expect(colorCheck.aaa_18({ r: 255, g: 255, b: 255 }, { r: 255, g: 255, b: 255 })).to.be.false
    })
  })
})

// =============================================================================
// Real-world Color Combination Tests
// =============================================================================

describe('Real-world color combinations', function () {
  describe('common UI colors', function () {
    it('should validate blue link on white', function () {
      // Standard link blue #0000EE
      expect(colorCheck.aa('#0000EE', '#ffffff')).to.be.true
    })

    it('should validate dark gray text on white', function () {
      expect(colorCheck.aa('#333333', '#ffffff')).to.be.true
    })

    it('should fail light gray text on white', function () {
      expect(colorCheck.aa('#cccccc', '#ffffff')).to.be.false
    })
  })

  describe('brand colors', function () {
    it('should validate common brand color contrast', function () {
      // Google blue on white (passes AA)
      expect(colorCheck.aa('#1a73e8', '#ffffff')).to.be.true
      // Facebook blue passes AA for large text (3:1) but not normal AA (4.5:1)
      expect(colorCheck.aa_18('#1877F2', '#ffffff')).to.be.true
    })
  })
})
