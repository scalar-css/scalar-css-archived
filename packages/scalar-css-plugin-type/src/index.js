import postcss from 'postcss'

import { processParams } from '@scalar-css/scalar-css-util-css'
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
 * @param {Integer} lineHeight unitless number for this type's font size
 * @param {Integer} verticalRhythmPx base vertical rhythm in pixels
 *
 * @returns {Number}
 */
export function getLineHeightPx(fontSizePx, lineHeight, verticalRhythmPx) {
  const lineHeightPx = fontSizePx * lineHeight
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
  return marginBottom * verticalRhythmPx - paddingTopPx
}

function generateFontValues(screen, params, capHeight) {
  const { baseFontSizePx, verticalRhythmPx, fontScale } = screen
  const [fontScaleStep, lineHeight, marginBottom] = params

  const fontSizePx = getFontSizePx(
    baseFontSizePx,
    fontScale,
    parseFloat(fontScaleStep)
  )
  const lineHeightPx = getLineHeightPx(
    fontSizePx,
    parseFloat(lineHeight),
    verticalRhythmPx
  )
  const paddingTopPx = getPaddingTopPx(fontSizePx, lineHeightPx, capHeight)
  const marginBottomPx = getMarginBottomPx(
    verticalRhythmPx,
    parseFloat(marginBottom),
    paddingTopPx
  )

  return {
    lineHeight: `${lineHeightPx / fontSizePx}`, // convert back to unitless number
    fontSize: `${pxToRem(fontSizePx, baseFontSizePx)}rem`,
    paddingTop: `${pxToRem(paddingTopPx, baseFontSizePx)}rem`,
    marginBottom: `${pxToRem(marginBottomPx, baseFontSizePx)}rem`
  }
}

export function createBaseStyleRule() {
  return postcss
    .rule({ selector: '[class*="type-"]' })
    .append({ prop: 'font-size', value: 'var(--fs)' })
    .append({ prop: 'line-height', value: 'var(--lh)' })
    .append({ prop: 'margin-bottom', value: 'var(--mb)' })
    .append({ prop: 'padding-top', value: 'var(--pt)' })
}

export function generateCSS(fontSizes, screen, source) {
  Object.entries(fontSizes).forEach(fs => {
    const [modularStep, fontFamily] = fs
  })
}

export default function type(ctx, options, source) {
  if (ctx.Theme.Typography) {
    ctx.Theme.Screens.forEach(screen => {
      if (screen.key === 'start') {
        screen.htmlRoot.append(createBaseStyleRule())
      }
      generateCSS(ctx.Theme.Typography, screen, source)
    })
  }
}
