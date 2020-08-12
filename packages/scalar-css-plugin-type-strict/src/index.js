import postcss from 'postcss'

import { pxToRem } from '@scalar-css/scalar-css-util-conversions'

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
  const lh = lineHeight ? lineHeight : baseLineHeight
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
 * Calculate the padding top value to align our type to the vertical rhythm. Based
 * off of Razvan Onofrei's aligning type to baseline the right way:
 * @see https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b
 *
 * @param {Integer} fontSizePx current font size in pixels
 * @param {Integer} lineHeightPx optimized line height for current font size in pixels
 * @param {Integer} capHeight current font's cap height value
 *
 * @returns {Number}
 */
export function getPaddingTopPx(fontSizePx, lineHeightPx, capHeight) {
  const capHeightPx = fontSizePx * capHeight
  return (lineHeightPx - capHeightPx) / 2
}

/**
 * Calculate the margin bottom value in pixels
 *
 * @param {Integer} verticalRhythmPx the base vertical rhythm for this screen
 * @param {Integer} marginBottom the number of vertical rhythm units to add as bottom margin
 * @param {Integer} paddingTopPx the number of pixels being added to the top padding to align to baseline
 *
 * @returns {Number}
 */
export function getMarginBottomPx(
  verticalRhythmPx,
  marginBottom,
  paddingTopPx
) {
  return marginBottom.replace('vr', '') * verticalRhythmPx - paddingTopPx
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
 * Generate a new type class that calculates the top-padding offset,
 * margin bottom, line height, and font size based on the values provided,
 * while also automatically aligning it to our vertical rhythm.
 *
 * @param {String} id key for the current type object
 * @param {Object} settings properties for the current type object
 * @param {Object} screen current screen
 * @param {Object} fonts the current theme's font settings
 */
export function generateTypeClassRule(id, settings, screen, fonts) {
  const { baseFontSizePx, baseLineHeight, verticalRhythmPx, fontScale } = screen
  const { fontId, scaleStep, lineHeight, marginBottom } = settings
  const capHeight = fonts[fontId].capHeight
  const typeClass = postcss.rule({ selector: `.type-${id}` })

  const fontScaleStep = getFontScaleStep(id, scaleStep)
  const fontSizePx = getFontSizePx(baseFontSizePx, fontScale, fontScaleStep)
  const lineHeightPx = getLineHeightPx(
    fontSizePx,
    baseLineHeight,
    lineHeight,
    verticalRhythmPx
  )
  const paddingTopPx = getPaddingTopPx(fontSizePx, lineHeightPx, capHeight)
  const marginBottomPx = getMarginBottomPx(
    verticalRhythmPx,
    marginBottom,
    paddingTopPx
  )

  return typeClass
    .append({
      prop: '--fs',
      value: `${pxToRem(fontSizePx, baseFontSizePx)}rem`
    })
    .append({ prop: '--lh', value: `${lineHeightPx / fontSizePx}` })
    .append({
      prop: '--pt',
      value: `${pxToRem(paddingTopPx, baseFontSizePx)}rem`
    })
    .append({
      prop: '--mb',
      value: `${pxToRem(marginBottomPx, baseFontSizePx)}rem`
    })
}

export function createBaseStyleRule() {
  return postcss
    .rule({ selector: '[class*="type-"]' })
    .append({ prop: 'font-size', value: 'var(--fs)' })
    .append({ prop: 'line-height', value: 'var(--lh)' })
    .append({ prop: 'padding-top', value: 'var(--pt)' })
    .append({ prop: 'margin-bottom', value: 'var(--mb)' })
}

export default function typeStrict(ctx, options, source) {
  ctx.theme.screens.forEach(screen => {
    if (screen.key === 'start') {
      screen.htmlRoot.append(createBaseStyleRule())
    }

    if ('typography' in screen) {
      Object.entries(screen.typography).forEach(([id, settings]) => {
        screen.htmlRoot.append(
          generateTypeClassRule(id, settings, screen, ctx.theme.fonts)
        )
      })
    }
  })
}
