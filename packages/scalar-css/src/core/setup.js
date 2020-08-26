import postcss from 'postcss'

import { merge } from '../util/helpers'
import defaultConfig from '../defaults/config'
import defaultFontScales from '../defaults/fontScales'
import fontStacks from '../defaults/fontStacks'

/**
 * Set the base font size in pixels for the current screen
 *
 * @param {Object} screen
 * @param {Object} prevScreen *
 * @returns {Integer} the base font size in pixels
 */
export function setBaseFontSizePx(screen, prevScreen) {
  if (screen.key === 'start' && !screen.baseFontSizePx) {
    throw new Error(
      `Invalid config for '${screen.key}' screen. You must provide a 'baseFontSizePx' value.`
    )
  }

  return screen.baseFontSizePx
    ? screen.baseFontSizePx
    : prevScreen.baseFontSizePx
}

/**
 * Set the base line-height for the current screen
 *
 * @param {Object} screen
 * @param {Object} prevScreen *
 * @returns {Number} the base line height as a unitless number value
 */
export function setBaseLineHeight(screen, prevScreen) {
  if (screen.key === 'start' && !screen.baseLineHeight) {
    throw new Error(
      `Invalid config for '${screen.key}' screen. You must provide a 'baseLineHeight' value.`
    )
  }

  return screen.baseLineHeight
    ? screen.baseLineHeight
    : prevScreen.baseLineHeight
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
export function setVerticalRhythm(screen, prevScreen) {
  if (screen.verticalRhythm) {
    return screen.verticalRhythm
  } else if (prevScreen !== null && prevScreen.verticalRhythm) {
    return prevScreen.verticalRhythm
  }

  return screen.baseLineHeight / 2
}

/**
 * Set the 'end' value for our current screen's range
 *
 * The 'end' screen is special because our site no longer scales upon
 * hitting this breakpoint, so we set the start/end breakpoints for
 * this screen to the same value
 *
 * @param {Object} screen
 * @param {Object} nextScreen
 * @returns {Integer} the end breakpoint value in pixels
 */
export function setBreakpointEndPx(screen, nextScreen) {
  return screen.key === 'end'
    ? screen.breakpointStartPx
    : nextScreen.breakpointStartPx
}

/**
 * Set the font scale for the current screen
 *
 * If the user hasn't specified their own modular scale value on the
 * `screen.fontScale` value, we create it based on a modular scale
 * id they provided (or use the value from the previous screen)
 *
 * @param {Object} screen
 * @param {Object} prevScreen
 * @returns {Number}
 */
export function setFontScale(screen, prevScreen) {
  if (screen.fontScale) {
    return screen.fontScale
  }

  if (screen.fontScaleId && !(screen.fontScaleId in defaultFontScales)) {
    // @todo add reference URL to default modular scales
    throw new Error(
      `Invalid font scale settings for '${screen.key}'. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Scalar CSS.`
    )
  }

  return screen.fontScaleId && screen.fontScaleId in defaultFontScales
    ? defaultFontScales[screen.fontScaleId]
    : prevScreen.fontScale
}

/**
 * Generate a new root css node to attach to our context object. This node
 * is used to insert our generated utility classes and css variables directly
 * from our plugins so that all of the final CSS is output in a single
 * bundle that is organized by screen
 *
 * @param {Object} screen
 */
export function setRootCSSNode(screen) {
  const root = postcss.root({ after: '\n' })

  return screen.key === 'start'
    ? root.append(':root {}')
    : root.append(postcss.parse(`@screen ${screen.key} {\n:root {}\n}`))
}

/**
 * Loop through our theme's font properties, and for any properties
 * that have a child referencing one of our default font stacks,
 * merge the default font stacks' properties in
 *
 * @param {Object} config
 */
export function replaceFontStackRefs(config) {
  Object.entries(config.theme.fonts).forEach(([id, settings]) => {
    if (settings.fontFamily in fontStacks) {
      const stack = fontStacks[settings.fontFamily]
      config.theme.fonts[id] = {
        ...settings,
        ...stack
      }
    }
  })
}

/**
 * Finalize the screen properties by duplicating/merging a few values
 * to allow easier access to properties for calculation purposes in
 * other areas of the framework. If a screen does not have new/existing
 * values set, then we re-use the values from the previous screen.
 *
 * @param {Object} config
 * @returns {Object}
 */
export function finalizeScreens(config) {
  config.theme.screens.forEach((screen, index) => {
    const nextScreen = config.theme.screens[index + 1]
    const prevScreen = index !== 0 ? config.theme.screens[index - 1] : null

    screen.baseFontSizePx = setBaseFontSizePx(screen, prevScreen)
    screen.baseLineHeight = setBaseLineHeight(screen, prevScreen)
    screen.verticalRhythm = setVerticalRhythm(screen, prevScreen)
    screen.breakpointEndPx = setBreakpointEndPx(screen, nextScreen)
    screen.fontScale = setFontScale(screen, prevScreen)
    screen.baseLineHeightPx = screen.baseLineHeight * screen.baseFontSizePx
    screen.verticalRhythmPx = screen.verticalRhythm * screen.baseFontSizePx

    screen.rootNode = setRootCSSNode(screen)
    screen.htmlRoot =
      screen.key === 'start' ? screen.rootNode : screen.rootNode.nodes[0]
    screen.varsRoot = screen.htmlRoot.nodes[0]
  })

  replaceFontStackRefs(config)

  return config
}

/**
 * Take our config and build out our custom context that will
 * be used for calculations throughout the rest of the framework
 *
 * @param {Object} defaultConfig Scalar's default config
 * @param {Object} userConfig User's configuration
 *
 * @returns {Object} ctx Finalized context that is used throughout framework
 */
export default function setup(userConfig = {}) {
  const config = finalizeScreens(merge(userConfig, defaultConfig))

  const ctx = merge(config, {
    theme: {
      currentScreen: config.theme.screens[0],
      defaultScreenKey: config.theme.screens[0].key
    }
  })

  // Provide additional, easy access to screen values by their key
  ctx.theme.screensByKey = config.theme.screens.reduce(
    (available, screen, index) => {
      return {
        ...available,
        [screen.key]: index
      }
    },
    {}
  )

  return ctx
}
