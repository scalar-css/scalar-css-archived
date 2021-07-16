import postcss from 'postcss'

import defaultFontScales from './defaults/fontScales'
import fontStacks from './defaults/fontStacks'

/**
 * Generate a new root css node to attach to our context object. This node
 * is used to insert our generated utility classes and css variables directly
 * from our plugins so that all of the final CSS is output in a single
 * bundle that is organized by screen
 *
 * @param {String} screenKey
 * @param {Object} screen
 */
export function setRootCSSNode(screenKey, screen) {
  const root = postcss.root({ after: '\n' })
  if (screenKey === 'start') {
    return root.append(':root {}')
  }

  return screenKey !== 'end'
    ? root.append(
        postcss.parse(`@media (min-width ${screen.minPx}px) {\n:root {}\n}`),
      )
    : root.append(
        postcss.parse(
          `@media (min-width ${screen.minPx}px) and (max-width ${screen.maxPx}px) {\n:root {}\n}`,
        ),
      )
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
        ...stack,
      }
    }
  })
}

/**
 * Set the font scale for the current screen
 *
 * If the user hasn't specified their own modular scale value on the
 * `screen.fontScale` value, we create it based on a modular scale
 * id they provided (or use the value from the previous screen)
 *
 * @param {String} screenKey
 * @param {Object} screen
 * @param {Object} prevScreen
 * @returns {Number}
 */
export function setFontScale(screenKey, screen, prevScreen) {
  if (screen.fontScale) {
    return screen.fontScale
  }

  if (screen.fontScaleId && !(screen.fontScaleId in defaultFontScales)) {
    // @todo add reference URL to default modular scales
    throw new Error(
      `Invalid font scale settings for '${screenKey}' screen. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Scalar CSS.`,
    )
  }

  return screen.fontScaleId
    ? defaultFontScales[screen.fontScaleId]
    : prevScreen.fontScale
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
export function setBreakpointEndPx(screenKey, screen, nextScreen) {
  return screenKey === 'end' ? screen.minPx : nextScreen.minPx
}

/**
 * Set a default value for our core properties for each screen
 *
 * @param {Object} screen
 * @param {Object} prevScreen
 * @returns {Integer} the property's value in pixels
 */
export const createSetDefaultValueFunc =
  (screen, prevScreen) => (screenKey, propKey) => {
    if (screenKey === 'start' && !screen[propKey]) {
      throw new Error(
        `Invalid config for '${screenKey}' screen. You must provide a '${propKey}' value.`,
      )
    }

    return screen[propKey] ? screen[propKey] : prevScreen[propKey]
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
export const finalize = (config) => {
  const screens = Object.entries(config.theme.screens)
  const defaultPropKeys = [
    'baseFontSizePx',
    'baseLineHeightPx',
    'virtualGridPx',
    'verticalRhythmPx',
  ]

  screens.forEach(([screenKey, screen], index) => {
    const nextScreen = index + 1 < screens.length ? screens[index + 1][1] : null
    const prevScreen = index !== 0 ? screens[index - 1][1] : null
    const setDefaultValue = createSetDefaultValueFunc(screen, prevScreen)

    defaultPropKeys.forEach((propKey) => {
      screen[propKey] = setDefaultValue(screenKey, propKey)
    })

    screen.maxPx = setBreakpointEndPx(screenKey, screen, nextScreen)
    screen.fontScale = setFontScale(screenKey, screen, prevScreen)
    screen.rootNode = setRootCSSNode(screenKey, screen)
  })

  replaceFontStackRefs(config)

  return config
}

/**
 * Take our config and build out our custom context that will
 * be used for calculations throughout the rest of the framework.
 * This mostly makes sure that we have the right properties for
 * each screen, by copying the values from the previous screen
 * if they don't exist on the current screen.
 *
 * @param {Object} config User's custom configuration
 *
 * @returns {Object} ctx Finalized context that is used throughout framework
 */
export default (config) => {
  return finalize(config)
}
