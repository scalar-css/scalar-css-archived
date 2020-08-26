import postcss from 'postcss'
import { pxToPercent } from '@scalar-css/scalar-css-util-conversions'

/**
 * Generate the root font size values for the current screen
 *
 * @param {Object} screen The current screen object
 * @param {Object} prev  The previous screen object (only used for 'end' screen)
 */
export function calculateRootFontSize(
  { baseFontSizePx, breakpointStartPx, breakpointEndPx },
  prev
) {
  // 1. Get the scale ratio between the start/end of the current screen, ie:
  //      iPhone 5/SE: 320px wide (start of current screen)
  //      iPhone 6/7/8 Plus: 414px wide (end of current screen)
  //      => 320px / 414px = 0.5555555555555556
  const breakpointRatio = prev
    ? prev.breakpointStartPx / prev.breakpointEndPx
    : breakpointStartPx / breakpointEndPx
  // 2. Get the "start" root font size for the current screen
  //      => 14px = 87.5%
  const screenMinFontSize = pxToPercent(baseFontSizePx)
  // 3. Get the "end" root font size for the current screen
  //      => 87.5% / 0.556 = 157.374%
  const screenMaxFontSize = screenMinFontSize / breakpointRatio

  return prev
    ? {
        screenMinFontSize: screenMaxFontSize,
        screenMaxFontSize
      }
    : {
        screenMinFontSize,
        screenMaxFontSize
      }
}

export function generateRootFontSizeValues(screen, prev, source) {
  const { screenMinFontSize, screenMaxFontSize } = calculateRootFontSize(
    screen,
    prev
  )

  screen.varsRoot
    .append({
      prop: '--screenStartSize',
      value: `${screen.breakpointStartPx}px`
    })
    .append({ prop: '--screenMinFontSize', value: `${screenMinFontSize}%` })
    .append({ prop: '--screenScalarFontSize', value: `${screenMinFontSize}%` })
    .append({ prop: '--screenMaxFontSize', value: `${screenMaxFontSize}%` })
    .append({ prop: '--screenLineHeight', value: screen.baseLineHeight })
    .append({ prop: '--screenRhythm', value: screen.verticalRhythm })
}

export function generateDefaultRootCSS(screen, source) {
  // Create all of the base scalar spacing unit variables
  // const scalarUnits = [...Array(ctx.theme.scalarUnits)]

  // scalarUnits.forEach((_, num) => {
  //   screen.varsRoot.append({
  //     prop: `--su-${num + 1}`,
  //     value: `calc(var(--rhythmRem) * ${num + 1})`
  //   })
  // })

  screen.htmlRoot.append(
    postcss
      .rule({ selector: 'html', source })
      .append({
        prop: 'line-height',
        value: 'var(--screenLineHeight)'
      })
      .append({
        prop: 'font-size',
        value:
          'clamp(var(--screenMinFontSize), var(--screenScalarFontSize, var(--screenMinFontSize)), var(--screenMaxFontSize))'
      })
  )
}

export default function rootSizes(ctx, options, source) {
  ctx.theme.screens.forEach((screen, index) => {
    if (screen.key === 'start') {
      generateDefaultRootCSS(screen, source)
    }

    const prev = screen.key === 'end' ? ctx.theme.screens[index - 1] : null
    generateRootFontSizeValues(screen, prev, source)
  })
}
