export function rounded(num, precision) {
  precision = Math.pow(10, precision)
  return Math.round((num + Number.EPSILON) * precision) / precision
}

export function percentToPx(fontSizePercent, deviceBaseFontSize = 16) {
  return (fontSizePercent / 100) * deviceBaseFontSize
}

export function pxToPercent(fontSize, deviceBaseFontSize = 16) {
  return (fontSize / deviceBaseFontSize) * 100
}

export function pxToRem(fontSize, deviceBaseFontSize = 16) {
  return rounded(fontSize / deviceBaseFontSize, 3)
}

export function remToPx(value, baseFontSize = 16) {
  return rounded(value * baseFontSize, 3)
}
