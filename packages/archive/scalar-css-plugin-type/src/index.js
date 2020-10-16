import { pxToRem } from '@scalar-css/scalar-css-util-conversions'
import postcss from 'postcss'

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
  verticalRhythmPx
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
 * Calculate the margin bottom value in pixels
 *
 * @param {Integer} verticalRhythmPx the base vertical rhythm for this screen
 * @param {Integer} marginBottom the number of vertical rhythm units to add as bottom marginbaseline
 *
 * @returns {Number}
 */
export function getMarginBottomPx(
  verticalRhythmPx,
  baseLineHeightPx,
  marginBottom
) {
  if (marginBottom.includes('rem')) {
    return marginBottom
  } else if (marginBottom.includes('vr')) {
    return marginBottom.replace('vr', '') * verticalRhythmPx
  } else if (marginBottom.includes('bl')) {
    return marginBottom.replace('bl', '') * baseLineHeightPx
  }
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
    `'${id}' is not a valid font scale step for your typography settings. Make sure your 'scaleStep' property is a number and not a string.`
  )
}

/**
 * Generate a new type class that calculates the margin bottom,
 * line height, and font size based on the values provided,
 * while also automatically aligning it to our vertical rhythm.
 *
 * @param {String} id key for the current type object
 * @param {Object} settings properties for the current type object
 * @param {Object} screen current screen
 */
export function generateTypeClassRule(id, settings, screen) {
  const { baseFontSizePx, baseLineHeight, verticalRhythmPx, fontScale } = screen
  const { scaleStep, lineHeight, elements, marginBottom } = settings
  const typeId = id.startsWith('-')
    ? `.-type-${id.replace('-', '')}`
    : `.type-${id}`
  const selector = Array.isArray(elements)
    ? `${elements.join()},${typeId}`
    : typeId
  const typeClass = postcss.rule({ selector })

  const fontScaleStep = getFontScaleStep(id, scaleStep)
  const fontSizePx = getFontSizePx(baseFontSizePx, fontScale, fontScaleStep)
  const lineHeightPx = getLineHeightPx(
    fontSizePx,
    baseLineHeight,
    lineHeight,
    verticalRhythmPx
  )

  const marginBottomPx =
    typeof marginBottom === 'undefined'
      ? 0
      : getMarginBottomPx(
          verticalRhythmPx,
          baseLineHeight * baseFontSizePx,
          marginBottom
        )

  return typeClass
    .append({
      prop: '--typeFontSize',
      value: `${pxToRem(fontSizePx, baseFontSizePx)}rem`
    })
    .append({ prop: '--typeLineHeight', value: `${lineHeightPx / fontSizePx}` })
    .append({
      prop: '--typeMarginBottom',
      value: `${pxToRem(marginBottomPx, baseFontSizePx)}rem`
    })
}

export function createBaseStyleRule() {
  return postcss
    .rule({ selector: '[class*="type-"],h1,h2,h3,h4,h5,h6,p' })
    .append({ prop: 'font-size', value: 'var(--typeFontSize)' })
    .append({ prop: 'line-height', value: 'var(--typeLineHeight)' })
    .append({ prop: 'margin-bottom', value: 'var(--typeMarginBottom)' })
}

export default function type(ctx, options, source) {
  let fontScaleId = null
  ctx.theme.screens.forEach(screen => {
    if (screen.key === 'start') {
      fontScaleId = screen.fontScaleId
      screen.htmlRoot.append(createBaseStyleRule())
      Object.entries(ctx.theme.typography).forEach(([id, settings]) => {
        screen.htmlRoot.append(
          generateTypeClassRule(id, settings, screen, ctx.theme.fonts)
        )
      })
    }

    // Generate new type classes whenever there is a new fontScaleId supplied
    if (screen.fontScaleId !== fontScaleId) {
      fontScaleId = screen.fontScaleId

      // User can override typography settings, if desired, on a per-screen level
      const typography =
        'typography' in screen ? screen.typography : ctx.theme.typography
      Object.entries(typography).forEach(([id, settings]) => {
        screen.htmlRoot.append(
          generateTypeClassRule(id, settings, screen, ctx.theme.fonts)
        )
      })
    }
  })
}
