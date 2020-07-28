import { merge } from './util/helpers'
import defaultConfig from './defaults/config'
import defaultFontScales from './defaults/fontScales'

/**
 * Finalize the screen properties by duplicating/merging a few values
 * to allow easier access to properties for calculation purposes in
 * other areas of the framework. If a screen does not have new/existing
 * values set, then we re-use the values from the previous screen.
 *
 * 1. If the user hasn't provided a custom vertical rhythm in a unitless
 *    number (`screen.verticalRhythm`), then we use the value provided in
 *    PX. If neither is provided, we use half the baseline as a default.
 * 2. The 'end' screen is special because our site no longer scales upon
 *    hitting this breakpoint, so we set the start/end breakpoints for
 *    this screen to the same value
 * 3. If the user hasn't specified their own modular scale value on the
 *    `screen.modularScale` value, we create it based on a modular scale
 *    id they provided (or use the value from the previous screen)
 *
 * @param {Object} config
 */
function finalizeScreens(config) {
  config.screens.forEach((screen, index) => {
    const nextScreen = config.screens[index + 1]
    const prevScreen = index !== 0 ? config.screens[index - 1] : null

    screen.baseFontSizePx = screen.baseFontSizePx
      ? screen.baseFontSizePx
      : prevScreen.baseFontSizePx
    screen.baseLineHeight = screen.baseLineHeight
      ? screen.baseLineHeight
      : prevScreen.baseLineHeight
    screen.baseLineHeightPx = screen.baseLineHeight * screen.baseFontSizePx

    /* 1 */
    if (screen.verticalRhythm) {
      screen.verticalRhythmPx = screen.verticalRhythm * screen.baseFontSizePx
    } else if (screen.verticalRhythmPx) {
      screen.verticalRhythm = screen.verticalRhythmPx / screen.baseFontSizePx
    } else {
      screen.verticalRhythm = screen.baseLineHeight / 2
      screen.verticalRhythmPx = screen.verticalRhythm * screen.baseFontSizePx
    }

    /* 2 */
    screen.breakpointEndPx =
      screen.key === 'end'
        ? screen.breakpointStartPx
        : nextScreen.breakpointStartPx

    /* 3 */
    if (!screen.fontScale) {
      if (screen.fontScaleId && screen.fontScaleId in defaultFontScales) {
        screen.fontScale = defaultFontScales[screen.fontScaleId]
      } else if (prevScreen.fontScale) {
        screen.fontScale = prevScreen.fontScale
      } else {
        // @todo add reference URL to default modular scales
        throw new Error(
          `Invalid font scale settings for ${screen.key}. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Fluid CSS.`
        )
      }
    }
  })

  return config
}
/**
 * Take our Fluid config and build out our custom context that will
 * be used for calculations and intepretations throughout the rest
 * of the framework
 *
 * @param {Object} defaultConfig Fluid's default config
 * @param {Object} userConfig User's configuration
 *
 * @returns {Object} ctx Finalized context that is used throughout framework
 */
export default function setup(userConfig = {}) {
  const config = finalizeScreens(merge(userConfig, defaultConfig))

  const ctx = {
    ...config,
    currentScreen: config.screens[0],
    defaultScreenKey: config.screens[0].key
  }

  // Provide additional, easy access to screen values by their key
  ctx.screensByKey = config.screens.reduce((available, screen) => {
    return {
      ...available,
      [screen.key]: screen
    }
  }, {})

  return ctx
}
