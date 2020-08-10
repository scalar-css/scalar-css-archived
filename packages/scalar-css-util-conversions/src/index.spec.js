import {
  rounded,
  pxToPercent,
  percentToPx,
  pxToRem,
  remToPx,
  scalarUnitConversion
} from '.'

describe('src/util/conversions.js', () => {
  it('should convert pixels to a percent integer', () => {
    let expected = 100
    let actual = pxToPercent(16)
    expect(actual).toBe(expected)

    expected = 112.5
    actual = pxToPercent(18)
    expect(actual).toBe(expected)

    expected = 87.5
    actual = pxToPercent(14)
    expect(actual).toBe(expected)

    expected = 75
    actual = pxToPercent(12)
    expect(actual).toBe(expected)
  })

  it('should convert percent to pixels', () => {
    let expected = 16
    let actual = percentToPx(100)
    expect(actual).toBe(expected)

    expected = 18
    actual = percentToPx(112.5)
    expect(actual).toBe(expected)

    expected = 14
    actual = percentToPx(87.5)
    expect(actual).toBe(expected)

    expected = 12
    actual = percentToPx(75)
    expect(actual).toBe(expected)

    expected = 13.5
    actual = percentToPx(75, 18)
    expect(actual).toBe(expected)
  })

  it('should convert pixels to a browser rem unit', () => {
    let expected = 1
    let actual = pxToRem(16)
    expect(actual).toBe(expected)

    expected = 1.125
    actual = pxToRem(18)
    expect(actual).toBe(expected)

    expected = 0.875
    actual = pxToRem(14)
    expect(actual).toBe(expected)

    expected = 0.75
    actual = pxToRem(12)
    expect(actual).toBe(expected)
  })

  it('should convert a rem value to pixels', () => {
    let expected = 16
    let actual = remToPx(1)
    expect(actual).toBe(expected)

    expected = 18
    actual = remToPx(1.125)
    expect(actual).toBe(expected)

    expected = 14
    actual = remToPx(0.875)
    expect(actual).toBe(expected)

    expected = 12
    actual = remToPx(0.75)
    expect(actual).toBe(expected)

    expected = 18
    actual = remToPx(1, 18)
    expect(actual).toBe(expected)

    expected = 20.25
    actual = remToPx(1.125, 18)
    expect(actual).toBe(expected)

    expected = 15.75
    actual = remToPx(0.875, 18)
    expect(actual).toBe(expected)

    expected = 13.5
    actual = remToPx(0.75, 18)
    expect(actual).toBe(expected)
  })

  it('should round to the right decimal place', () => {
    let expected = 0.87
    let actual = rounded(0.8743962, 2)
    expect(actual).toBe(expected)

    expected = 0.8744
    actual = rounded(0.8743962, 4)
    expect(actual).toBe(expected)

    expected = 1.875
    actual = rounded(1.874962, 3)
    expect(actual).toBe(expected)

    expected = 2.8744
    actual = rounded(2.8743962, 5)
    expect(actual).toBe(expected)
  })

  it('should convert scalar units properly', () => {
    let expected = 'rem(20px)'
    let actual = scalarUnitConversion(20)
    expect(actual).toBe(expected)

    expected = '1rem'
    actual = scalarUnitConversion('1rem')
    expect(actual).toBe(expected)

    expected = '100%'
    actual = scalarUnitConversion('100%')
    expect(actual).toBe(expected)

    expected = 'calc(var(--rhythm-rem) * 3)'
    actual = scalarUnitConversion('3vr')
    expect(actual).toBe(expected)
  })
})
