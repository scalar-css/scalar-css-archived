exports.rounded = (num, precision) => {
  precision = Math.pow(10, precision)
  return Math.round((num + Number.EPSILON) * precision) / precision
}

exports.percentToPx = (fontSizePercent, deviceBaseFontSizePx = 16) => {
  return (fontSizePercent / 100) * deviceBaseFontSizePx
}

exports.pxToPercent = (fontSize, deviceBaseFontSizePx = 16) => {
  return (fontSize / deviceBaseFontSizePx) * 100
}

exports.pxToRem = (fontSize, deviceBaseFontSizePx = 16) => {
  return rounded(fontSize / deviceBaseFontSizePx, 3)
}

exports.remToPx = (value, baseFontSize = 16) => {
  return rounded(value * baseFontSize, 3)
}

exports.scalarUnitConversion = (value) => {
  if (typeof value === 'number') {
    return `rem(${value}px)`
  } else if (value.endsWith('vr')) {
    return `calc(var(--rhythm-rem) * ${value.replace('vr', '')})`
  }

  return value
}
