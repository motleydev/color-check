<a name="colorCheck"></a>

## colorCheck
Copyright (c) Jesse David Martin (@motleydev) | MIT license
Formulas stolen directly from @snookca / verified against the WCAG2 Spec
https://snook.ca/technical/colour_contrast/colour.html

**Kind**: global constant  

* [colorCheck](#colorCheck)
    * [.hexToRgb(hex)](#colorCheck.hexToRgb) ⇒ <code>object</code>
    * [.colorDifference(hex, hex)](#colorCheck.colorDifference) ⇒ <code>boolean</code>
    * [.colorBrightnessDifference(hex, hex)](#colorCheck.colorBrightnessDifference) ⇒ <code>boolean</code>
    * [.colorGetLuminance(hex)](#colorCheck.colorGetLuminance) ⇒ <code>number</code>
    * [.colorContrast(hex, hex)](#colorCheck.colorContrast) ⇒ <code>number</code>
    * [.colorCompliance(hex, hex)](#colorCheck.colorCompliance) ⇒ <code>boolean</code>
    * [.aa(hex, hex)](#colorCheck.aa) ⇒ <code>boolean</code>
    * [.aa_18(hex, hex)](#colorCheck.aa_18) ⇒ <code>boolean</code>
    * [.aaa(hex, hex)](#colorCheck.aaa) ⇒ <code>boolean</code>
    * [.aaa_18(hex, hex)](#colorCheck.aaa_18) ⇒ <code>boolean</code>

<a name="colorCheck.hexToRgb"></a>

### colorCheck.hexToRgb(hex) ⇒ <code>object</code>
Checks if a hex string or object was given and returns
the rgb color values of the former. To keep a tiny library, it's the user's
responsibility to provide valid hex/rgbObj values.

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>object</code> - returns an object of shape {r, g, b}  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.colorDifference"></a>

### colorCheck.colorDifference(hex, hex) ⇒ <code>boolean</code>
Checks if the two colors have significant color difference

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a numeric value must be 500 or greater  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.colorBrightnessDifference"></a>

### colorCheck.colorBrightnessDifference(hex, hex) ⇒ <code>boolean</code>
returns a boolean value if there is enough brightness difference

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a numeric value must be over 125  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.colorGetLuminance"></a>

### colorCheck.colorGetLuminance(hex) ⇒ <code>number</code>
returns a numeric value of the total luminance

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>number</code> - gives a numeric value  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.colorContrast"></a>

### colorCheck.colorContrast(hex, hex) ⇒ <code>number</code>
returns a numeric value for the color contrast

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>number</code> - gives a numeric value  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.colorCompliance"></a>

### colorCheck.colorCompliance(hex, hex) ⇒ <code>boolean</code>
returns a boolean if the values are both color compliant and contrast compliant

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a boolean response.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.aa"></a>

### colorCheck.aa(hex, hex) ⇒ <code>boolean</code>
returns a boolean if the value is acceptable for AA standards
for legibility of size 14pt font.

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a boolean response.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.aa_18"></a>

### colorCheck.aa_18(hex, hex) ⇒ <code>boolean</code>
returns a boolean if the value is acceptable for AA standards
for legibility of size 18pt font.

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a boolean response.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.aaa"></a>

### colorCheck.aaa(hex, hex) ⇒ <code>boolean</code>
returns a boolean if the value is acceptable for AAA standards
for legibility of size 14pt font. It's ok, this is very hard to achieve.

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a boolean response.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

<a name="colorCheck.aaa_18"></a>

### colorCheck.aaa_18(hex, hex) ⇒ <code>boolean</code>
returns a boolean if the value is acceptable for AAA standards
for legibility of size 18pt font. It's ok, this is hard to achieve.

**Kind**: static method of <code>[colorCheck](#colorCheck)</code>  
**Returns**: <code>boolean</code> - gives a boolean response.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |
| hex | <code>string</code> &#124; <code>object</code> | color string or object of shape {r, g, b} |

