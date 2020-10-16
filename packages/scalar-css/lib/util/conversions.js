"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rounded = rounded;
exports.percentToPx = percentToPx;
exports.pxToPercent = pxToPercent;
exports.pxToRem = pxToRem;
exports.remToPx = remToPx;
exports.scalarUnitConversion = scalarUnitConversion;

function rounded(num, precision) {
  precision = Math.pow(10, precision);
  return Math.round((num + Number.EPSILON) * precision) / precision;
}

function percentToPx(fontSizePercent) {
  var deviceBaseFontSizePx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return fontSizePercent / 100 * deviceBaseFontSizePx;
}

function pxToPercent(fontSize) {
  var deviceBaseFontSizePx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return fontSize / deviceBaseFontSizePx * 100;
}

function pxToRem(fontSize) {
  var deviceBaseFontSizePx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return rounded(fontSize / deviceBaseFontSizePx, 3);
}

function remToPx(value) {
  var baseFontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return rounded(value * baseFontSize, 3);
}

function scalarUnitConversion(value) {
  if (typeof value === 'number') {
    return "rem(".concat(value, "px)");
  } else if (value.endsWith('vr')) {
    return "calc(var(--rhythm-rem) * ".concat(value.replace('vr', ''), ")");
  }

  return value;
}