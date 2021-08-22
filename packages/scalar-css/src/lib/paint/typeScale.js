import { pxToRem } from '../utils/conversions'

/**
 * Get a font size in pixels based on the baseFontSize and ratio provided
 * @see https://observablehq.com/@mayagao/compose-a-typography-system-with-modular-scales-and-vertic
 *
 * @param {Integer} baseFontSizePx in pixels
 * @param {Float} fontScale provided modular scale ratio
 * @param {Integer} fontScaleStep step number in the scale to get
 *
 * @returns {Number}
 */
export function getFontSizePx(baseFontSizePx, fontScale, fontScaleStep) {
  return baseFontSizePx * Math.pow(fontScale, fontScaleStep)
}

/**
 * Calculate the line height which will match to one of the increments
 * of our base vertical rhythm
 * @see https://observablehq.com/@mayagao/compose-a-typography-system-with-modular-scales-and-vertic
 *
 * @param {Integer} fontSizePx the current font size in pixels
 * @param {Integer} baseLineHeight the current screen's baseLineHeight in case 'lineHeight' isn't set
 * @param {Integer} lineHeight unitless number for this type's font size
 * @param {Integer} verticalRhythmPx base vertical rhythm in pixels
 *
 * @returns {Number}
 */
export function getLineHeightPx(
  fontSizePx,
  baseLineHeight,
  lineHeight,
  verticalRhythmPx,
) {
  const lh = lineHeight || baseLineHeight
  const lineHeightPx = fontSizePx * lh
  const rhythmMod = lineHeightPx % verticalRhythmPx

  if (rhythmMod === 0) {
    return lineHeightPx
  }

  // if rhythmMod is less than half our vertical rhythm,
  // we subtract the mod to get to the lower vertical
  // rhythm, otherwise we add the difference to step
  // up to the higher one
  return rhythmMod < verticalRhythmPx / 2
    ? lineHeightPx - rhythmMod
    : lineHeightPx + (verticalRhythmPx - rhythmMod)
}

/**
 * Get the current font scale step. If `fontScaleStep` is undefined, we
 * attempt to use the id/key for the font scale value (DX sugar, basically).
 *
 * @param {String} id key for the current type object
 * @param {Integer|Undefined} fontScaleStep the step in the modular scale
 */
export function getFontScaleStep(id, fontScaleStep) {
  if (typeof fontScaleStep !== 'undefined' && Number.isInteger(fontScaleStep)) {
    return fontScaleStep
  } else if (Number.isInteger(parseInt(id))) {
    return parseInt(id)
  }

  throw new Error(
    `'${id}' is not a valid font scale step for your typography settings. Make sure your 'scaleStep' property is a number and not a string.`,
  )
}

/**
 * Generate a new type class that calculates the typography properties specified
 * for this rule while also automatically aligning it to our vertical rhythm.
 *
 * @param {Array} typeEntry the type entry from our config in [key, value] format
 * @param {Object} screen current screen
 * @param {Function} postcss
 * @returns
 */
export function generateTypeClassRule([id, settings], screen, postcss) {
  console.log('generateTypeClassRule', screen)
  const { baseFontSizePx, baseLineHeight, verticalRhythmPx, fontScale } = screen
  const [scaleStep, lineHeight] = settings
  const typeId = `.type-${id}`
  const typeRule = postcss.rule({ selector: typeId })

  const fontScaleStep = getFontScaleStep(id, scaleStep)
  const fontSizePx = getFontSizePx(baseFontSizePx, fontScale, fontScaleStep)

  typeRule.append({
    prop: '--typeFontSize',
    value: `${pxToRem(fontSizePx, baseFontSizePx)}rem`,
  })

  if (lineHeight) {
    const lineHeightPx = getLineHeightPx(
      fontSizePx,
      baseLineHeight,
      lineHeight,
      verticalRhythmPx,
    )
    typeRule.append({
      prop: '--typeLineHeight',
      value: `${lineHeightPx / fontSizePx}`,
    })
  }

  return typeRule
}

export function createBaseStyleRules(postcss) {
  return postcss
    .rule({ selector: '[class*="type-"' })
    .append({ prop: 'font-size', value: 'var(--typeFontSize)' })
    .append({ prop: 'line-height', value: 'var(--typeLineHeight, 1rem)' })
}

/**
 * .type--2
 * .-type-2
 * .type+1
 * .type-2
 */

export default function typeScales(config, postcss) {
  const screens = Object.entries(config.theme.screens)
  let fontScaleId = null

  screens.forEach(([key, screen]) => {
    if (key === 'start') {
      fontScaleId = screen.fontScaleId
      screen.htmlRoot.append(createBaseStyleRules(postcss))
      Object.entries(config.theme.fontSize).forEach((fontSizeEntry) => {
        screen.htmlRoot.append(generateTypeClassRule(fontSizeEntry, screen))
      })
    }
  })
}
