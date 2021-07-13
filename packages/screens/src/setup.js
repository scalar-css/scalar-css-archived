const { defaultFontScales, fontStacks } = require('./defaults')
const { pxToPercent } = require('./utils')

/**
 * Set the base font size in pixels for the current screen
 *
 * @param {Object} screen
 * @param {Object} prev
 * @returns {Integer} the base font size in pixels
 */
exports.setBaseFontSizePx = (screen, prev) => {
  if (screen.key === 'start' && !screen.baseFontSizePx) {
    throw new Error(
      `Invalid config for '${screen.key}' screen. You must provide a 'baseFontSizePx' value.`,
    )
  }

  return screen.baseFontSizePx ? screen.baseFontSizePx : prev.baseFontSizePx
}

/**
 * Set the base line-height for the current screen
 *
 * @param {Object} screen
 * @param {Object} prev
 * @returns {Number} the base line height as a unitless number value
 */
exports.setBaseLineHeight = (screen, prev) => {
  if (screen.key === 'start' && !screen.baseLineHeight) {
    throw new Error(
      `Invalid config for '${screen.key}' screen. You must provide a 'baseLineHeight' value.`,
    )
  }

  return screen.baseLineHeight ? screen.baseLineHeight : prev.baseLineHeight
}

/**
 * Set the vertical rhythm for the current screen
 *
 * If the user hasn't provided a custom vertical rhythm in a unitless
 * number (`screen.verticalRhythm`), then we use half the baseline as a default.
 *
 * @param {Object} screen current screen *
 * @returns {Number} the vertical rhythm in a unitless number value
 */
exports.setVerticalRhythm = (screen, prev) => {
  if (screen.verticalRhythm) {
    return screen.verticalRhythm
  } else if (prev !== null && prev.verticalRhythm) {
    return prev.verticalRhythm
  }

  return screen.baseLineHeight / 2
}

/**
 * Set the 'start' value for our current screen's range
 *
 * The 'end' screen is special because our site no longer scales upon
 * hitting this breakpoint, so if the `max` property exists, that's our
 * last breakpoint, so we return the max value for the "start" also.
 *
 * @param {Object} screen
 * @param {Object} prev
 * @returns {String}
 */
exports.setBreakpointStartPx = (screen, prev) =>
  screen.max
    ? parseInt(screen.max.replace('px', ''))
    : parseInt(screen.min.replace('px', ''))

/**
 * Set the 'end' value for our current screen's range
 *
 * The 'end' screen is special because our site no longer scales upon
 * hitting this breakpoint, so if there is no "next" screen, we use
 * the "max" value instead.
 *
 * @param {Object} screen
 * @param {Object} next
 * @returns {String} the end breakpoint value in pixels
 */
exports.setBreakpointEndPx = (screen, next) => {
  if (next?.max) {
    return parseInt(next.max.replace('px', ''))
  } else if (next?.min) {
    return parseInt(next.min.replace('px', ''))
  } else {
    return parseInt(screen.max.replace('px', ''))
  }
}

/**
 * Set the font scale for the current screen
 *
 * If the user hasn't specified their own modular scale value on the
 * `screen.fontScale` value, we create it based on a modular scale
 * id they provided (or use the value from the previous screen)
 *
 * @param {Object} screen
 * @param {Object} prev
 * @returns {Number}
 */
exports.setFontScale = (screen, prev) => {
  if (screen.fontScale) {
    return screen.fontScale
  }

  if (screen.fontScaleId && !(screen.fontScaleId in defaultFontScales)) {
    // @todo add reference URL to default modular scales
    throw new Error(
      `Invalid font scale settings for '${screen.key}'. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Scalar CSS.`,
    )
  }

  return screen.fontScaleId && screen.fontScaleId in defaultFontScales
    ? defaultFontScales[screen.fontScaleId]
    : prev.fontScale
}

/**
 * Generate the root font size values for the current screen
 *
 * @param {Object} screen The current screen object
 * @param {Object} prev  The previous screen object (only used for 'end' screen)
 */
exports.calculateRootFontSize = (
  { max, baseFontSizePx, breakpointStartPx, breakpointEndPx },
  prev,
) => {
  // 1. Get the scale ratio between the start/end of the current screen, ie:
  //      iPhone 5/SE: 320px wide (start of current screen)
  //      iPhone 6/7/8 Plus: 414px wide (end of current screen)
  //      => 320px / 414px = 0.5555555555555556
  const breakpointRatio = max
    ? prev.breakpointStartPx / prev.breakpointEndPx
    : breakpointStartPx / breakpointEndPx
  // 2. Get the "start" root font size for the current screen
  //      => 14px = 87.5%
  const screenMinFontSize = pxToPercent(baseFontSizePx)
  // 3. Get the "end" root font size for the current screen
  //      => 87.5% / 0.556 = 157.374%
  const screenMaxFontSize = screenMinFontSize / breakpointRatio

  return max
    ? {
        screenMinFontSize: screenMaxFontSize,
        screenMaxFontSize,
      }
    : { screenMinFontSize, screenMaxFontSize }
}

/**
 * Set the base font size in pixels for the current screen
 *
 * @param {Object} screen
 * @param {Object} prev *
 * @returns {Integer} the base font size in pixels
 */
exports.setBaseFontSizePx = (screen, prev) => {
  if (screen.key === 'start' && !screen.baseFontSizePx) {
    throw new Error(
      `Invalid config for 'start' screen. You must provide a 'baseFontSizePx' value.`,
    )
  }

  return screen.baseFontSizePx ? screen.baseFontSizePx : prev.baseFontSizePx
}
