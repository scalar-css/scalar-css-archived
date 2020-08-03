export function rounded(num, precision) {
  precision = Math.pow(10, precision)
  return Math.round((num + Number.EPSILON) * precision) / precision
}

export function percentToPx(fontSizePercent, deviceBaseFontSizePx = 16) {
  return (fontSizePercent / 100) * deviceBaseFontSizePx
}

export function pxToPercent(fontSize, deviceBaseFontSizePx = 16) {
  return (fontSize / deviceBaseFontSizePx) * 100
}

export function pxToRem(fontSize, deviceBaseFontSizePx = 16) {
  return rounded(fontSize / deviceBaseFontSizePx, 3)
}

export function remToPx(value, baseFontSize = 16) {
  return rounded(value * baseFontSize, 3)
}

export function scalarUnitConversion(value) {
  if (typeof value === 'number') {
    return `rem(${value}px)`
  } else if (value.endsWith('vr')) {
    return `vr(${value.replace('vr', '')})`
  }

  return value
}
