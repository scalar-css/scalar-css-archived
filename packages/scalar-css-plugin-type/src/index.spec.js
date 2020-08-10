import {
  getFontSizePx,
  getLineHeightPx,
  getPaddingTopPx,
  getMarginBottomPx,
  getFontScaleStep,
  createBaseStyleRule,
  generateTypeClassRule,
  default as type
} from './'
import setup from '../../scalar-css/src/core/setup'
import modularScales from '../../scalar-css/src/defaults/fontScales'

describe('@scalar-css/scalar-css-plugin-type', () => {
  it('should calculate the right font size in pixels', () => {
    let scale = 1.313
    let expected = 47.55310580737599
    let actual = getFontSizePx(16, scale, 4)
    expect(actual).toBe(expected)

    scale = modularScales.majorThird
    expected = 31.25
    actual = getFontSizePx(16, scale, 3)
    expect(actual).toBe(expected)

    scale = modularScales.perfectFourth
    expected = 9.004501688062676
    actual = getFontSizePx(16, scale, -2)
    expect(actual).toBe(expected)

    scale = modularScales.perfectFourth
    expected = 84.17453825843785
    actual = getFontSizePx(20, scale, 5)
    expect(actual).toBe(expected)
  })

  it('should calculate the right line height in pixels', () => {
    let expected = 72
    let actual = getLineHeightPx(47.55310580737599, 1.5, 1.4, 12)
    expect(actual).toBe(expected)

    expected = 60
    actual = getLineHeightPx(31.25, 1.5, 2, 12)
    expect(actual).toBe(expected)

    expected = 12
    actual = getLineHeightPx(9.004501688062676, 1.5, undefined, 12)
    expect(actual).toBe(expected)

    expected = 96
    actual = getLineHeightPx(84.17453825843785, 1.5, 1.1, 12)
    expect(actual).toBe(expected)

    expected = 72
    actual = getLineHeightPx(36, 1.5, 2, 12)
    expect(actual).toBe(expected)
  })

  it('should calculate the right padding-top in pixels', () => {
    let expected = 18.880881909344644
    let actual = getPaddingTopPx(47.55310580737599, 72, 0.72)
    expect(actual).toBe(expected)

    expected = 18.75
    actual = getPaddingTopPx(31.25, 60, 0.72)
    expect(actual).toBe(expected)

    expected = 2.7583793922974364
    actual = getPaddingTopPx(9.004501688062676, 12, 0.72)
    expect(actual).toBe(expected)

    expected = 17.697166226962377
    actual = getPaddingTopPx(84.17453825843785, 96, 0.72)
    expect(actual).toBe(expected)
  })

  it('should calculate the right margin-bottom in pixels', () => {
    let expected = 5.1191180906553555
    let actual = getMarginBottomPx(12, '2vr', 18.880881909344644)
    expect(actual).toBe(expected)

    expected = 5.25
    actual = getMarginBottomPx(12, '2vr', 18.75)
    expect(actual).toBe(expected)

    expected = 21.241620607702565
    actual = getMarginBottomPx(12, '2vr', 2.7583793922974364)
    expect(actual).toBe(expected)

    expected = 54.30283377303762
    actual = getMarginBottomPx(12, '6vr', 17.697166226962377)
    expect(actual).toBe(expected)
  })

  it('should get the right font scale step', () => {
    let expected = -3
    let actual = getFontScaleStep('bloop', -3)
    expect(actual).toBe(expected)

    expected = 2
    actual = getFontScaleStep('2')
    expect(actual).toBe(expected)

    expect(() => {
      getFontScaleStep('invalid')
    }).toThrowError(
      `'invalid' is not a valid font scale step for your typography settings. Make sure your 'scaleStep' property is a number and not a string.`
    )
  })

  it('should generate base style rule', () => {
    let actual = createBaseStyleRule()
    expect(actual.selector).toBe('[class*="type-"]')
    expect(actual.nodes.length).toBe(4)
  })

  it('should generate a type class rule', () => {
    const screen = {
      baseFontSizePx: 18,
      baseLineHeight: 1.5,
      verticalRhythmPx: 9,
      fontScale: 1.313
    }
    const settings = {
      fontId: 'sans',
      scaleStep: '3',
      lineHeight: 2,
      marginBottom: '4vr'
    }
    const fonts = {
      sans: {
        fontFamily:
          'system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
        elements: 'body',
        capHeight: 0.7
      }
    }

    const actual = generateTypeClassRule('3', settings, screen, fonts)
    expect(actual.selector).toBe('.type-3')
    expect(actual.nodes.length).toBe(4)
    expect(actual.nodes[0].value).toBe('2.264rem')
    expect(actual.nodes[1].value).toBe('1.988008951149022')
    expect(actual.nodes[2].value).toBe('1.458rem')
    expect(actual.nodes[3].value).toBe('0.542rem')
  })

  it('should scaffold out our type classes for the right screens', () => {
    const ctx = setup({})
    type(ctx)

    ctx.theme.screens.forEach(screen => {
      if ('typography' in screen) {
        const keys = Object.keys(screen.typography)
        const expected =
          screen.key === 'start' ? keys.length + 2 : keys.length + 1
        expect(screen.htmlRoot.nodes.length).toBe(expected)
      }
    })
  })
})
