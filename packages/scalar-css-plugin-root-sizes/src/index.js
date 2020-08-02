import postcss from 'postcss'
import { pxToPercent } from '@scalar-css/scalar-css-util-conversions'

/**
 * Generate the root font size that is used as a scale parameter
 * for the design and layout of the site for this screen.
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
  const rootSizeStart = pxToPercent(baseFontSizePx)
  // 3. Get the VW value for the root font size of the current screen
  //     => 14px / 320px * 100 = 4.375vw
  const rootSizeVW = (baseFontSizePx / breakpointStartPx) * 100
  // 4. Get the "end" root font size for the current screen
  //      => 87.5% / 0.556 = 157.374%
  const rootSizeEnd = rootSizeStart / breakpointRatio
  // 5. Set these values in a clamp() except on 'end' screen
  //      => clamp(100%, 5vw, 1.294%)
  return prev
    ? `${rootSizeEnd}%`
    : `clamp(${rootSizeStart}%, ${rootSizeVW}vw, ${rootSizeEnd}%)`
}

export function generateRootFontSizeCSS(screen, prev, source) {
  const fontSize = calculateRootFontSize(screen, prev)
  const html = postcss
    .rule({ selector: 'html', source })
    .append({
      prop: 'line-height',
      value: screen.baseLineHeight
    })
    .append({
      prop: 'font-size',
      value: fontSize
    })

  screen.htmlRoot.append(html)
  screen.varsRoot
    .append({ prop: '--baseline', value: screen.baseLineHeight })
    .append({ prop: '--rhythm', value: screen.verticalRhythm })
    .append({ prop: '--baseline-rem', value: `calc(var(--baseline) * 1rem)` })
    .append({ prop: '--rhythm-rem', value: `calc(var(--rhythm) * 1rem)` })
}

export default function rootSizes(ctx, options, source) {
  ctx.screens.forEach((screen, index) => {
    const prev = screen.key === 'end' ? ctx.screens[index - 1] : null
    generateRootFontSizeCSS(screen, prev, source)
  })
}
