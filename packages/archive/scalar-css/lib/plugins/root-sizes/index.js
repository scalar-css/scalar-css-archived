"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateRootFontSize = calculateRootFontSize;
exports.generateRootFontSizeValues = generateRootFontSizeValues;
exports.generateDefaultRootCSS = generateDefaultRootCSS;
exports["default"] = rootSizes;

var _scalarCssUtilConversions = require("@scalar-css/scalar-css-util-conversions");

var _postcss = _interopRequireDefault(require("postcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Generate the root font size values for the current screen
 *
 * @param {Object} screen The current screen object
 * @param {Object} prev  The previous screen object (only used for 'end' screen)
 */
function calculateRootFontSize(_ref, prev) {
  var baseFontSizePx = _ref.baseFontSizePx,
      breakpointStartPx = _ref.breakpointStartPx,
      breakpointEndPx = _ref.breakpointEndPx;
  // 1. Get the scale ratio between the start/end of the current screen, ie:
  //      iPhone 5/SE: 320px wide (start of current screen)
  //      iPhone 6/7/8 Plus: 414px wide (end of current screen)
  //      => 320px / 414px = 0.5555555555555556
  var breakpointRatio = prev ? prev.breakpointStartPx / prev.breakpointEndPx : breakpointStartPx / breakpointEndPx; // 2. Get the "start" root font size for the current screen
  //      => 14px = 87.5%

  var screenMinFontSize = (0, _scalarCssUtilConversions.pxToPercent)(baseFontSizePx); // 3. Get the "end" root font size for the current screen
  //      => 87.5% / 0.556 = 157.374%

  var screenMaxFontSize = screenMinFontSize / breakpointRatio;
  return prev ? {
    screenMinFontSize: screenMaxFontSize,
    screenMaxFontSize: screenMaxFontSize
  } : {
    screenMinFontSize: screenMinFontSize,
    screenMaxFontSize: screenMaxFontSize
  };
}

function generateRootFontSizeValues(screen, prev, source) {
  var _calculateRootFontSiz = calculateRootFontSize(screen, prev),
      screenMinFontSize = _calculateRootFontSiz.screenMinFontSize,
      screenMaxFontSize = _calculateRootFontSiz.screenMaxFontSize;

  screen.varsRoot.append({
    prop: '--screenStartSize',
    value: "".concat(screen.breakpointStartPx)
  }).append({
    prop: '--screenEndSize',
    value: "".concat(screen.breakpointEndPx)
  }).append({
    prop: '--screenMinFontSize',
    value: "".concat(screenMinFontSize, "%")
  }).append({
    prop: '--screenScalarFontSize',
    value: "".concat(screenMinFontSize, "%")
  }).append({
    prop: '--screenMaxFontSize',
    value: "".concat(screenMaxFontSize, "%")
  }).append({
    prop: '--screenLineHeight',
    value: screen.baseLineHeight
  }).append({
    prop: '--screenRhythm',
    value: "".concat(screen.verticalRhythm, "rem")
  });
}

function generateDefaultRootCSS(ctx, screen, source) {
  screen.htmlRoot.append(_postcss["default"].rule({
    selector: 'html',
    source: source
  }).append({
    prop: 'line-height',
    value: 'var(--screenLineHeight)'
  }).append({
    prop: 'font-size',
    value: 'clamp(var(--screenMinFontSize), var(--screenScalarFontSize, var(--screenMinFontSize)), var(--screenMaxFontSize))'
  }));
}

function rootSizes(ctx, options, source) {
  ctx.theme.screens.forEach(function (screen, index) {
    if (screen.key === 'start') {
      generateDefaultRootCSS(ctx, screen, source);
    }

    var prev = screen.key === 'end' ? ctx.theme.screens[index - 1] : null;
    generateRootFontSizeValues(screen, prev, source);
  });
}