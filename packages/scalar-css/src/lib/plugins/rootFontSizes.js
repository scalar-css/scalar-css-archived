import { pxToPercent } from '../utils/conversions'

/**
 * Generate the root font size values for the current screen. Ensure
 * root font size is in percent to make accessible for screen readers.
 *
 * @param {Object} screen The current screen object
 * @param {Object} prev  The previous screen object (only used for 'end' screen)
 */
export function calculateRootFontSize(
  { baseFontSizePx, breakpointStartPx, breakpointEndPx },
  prev,
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
  const screenMinFontSizePercent = pxToPercent(baseFontSizePx)
  // 3. Get the "end" root font size for the current screen
  //      => 87.5% / 0.556 = 157.374%
  const screenMaxFontSizePercent = screenMinFontSizePercent / breakpointRatio

  // Our "end" screen doesn't expand, so we set the min/max font sizes
  // to be the same value, the max font size of the prev screen.
  return prev
    ? {
        screenMinFontSizePercent: screenMaxFontSizePercent,
        screenMaxFontSizePercent,
      }
    : {
        screenMinFontSizePercent,
        screenMaxFontSizePercent,
      }
}

export function generateRootFontSizeValues(key, screen, prev, postcss) {
  const { screenMinFontSizePercent, screenMaxFontSizePercent } =
    calculateRootFontSize(screen, prev)
  const baseLineHeight = screen.baseLineHeightPx / screen.baseFontSizePx

  if (key === 'start') {
    const htmlRootRule = postcss
      .rule({ selector: 'html' })
      .append({
        prop: 'line-height',
        value: 'var(--screenLineHeight, 1.5)',
      })
      .append({
        prop: 'font-size',
        value: `${screenMinFontSizePercent}%`,
      })
    screen.htmlRoot.append(htmlRootRule)
  }

  screen.varsRoot
    .append({
      prop: '--screenStartSize',
      value: `${screen.breakpointStartPx}`,
    })
    .append({
      prop: '--screenEndSize',
      value: `${screen.breakpointEndPx}`,
    })
    .append({
      prop: '--screenMinFontSize',
      value: `${screenMinFontSizePercent}%`,
    })
    .append({
      prop: '--screenScalarFontSize',
      value: `${screenMinFontSizePercent}%`,
    })
    .append({
      prop: '--screenMaxFontSize',
      value: `${screenMaxFontSizePercent}%`,
    })
    .append({ prop: '--screenLineHeight', value: baseLineHeight })
}

export function generateDefaultRootCSS(applyGlobalScalar, screen, postcss) {
  if (applyGlobalScalar) {
    screen.bodyRoot
      .append({
        prop: 'line-height',
        value: 'var(--screenLineHeight)',
      })
      .append({
        prop: 'font-size',
        value:
          'clamp(var(--screenMinFontSize), var(--screenScalarFontSize, var(--screenMinFontSize)), var(--screenMaxFontSize))',
      })
  } else {
    const scalarClass = postcss
      .rule({ selector: '.scalar' })
      .append({
        prop: 'line-height',
        value: 'var(--screenLineHeight)',
      })
      .append({
        prop: 'font-size',
        value:
          'clamp(var(--screenMinFontSize), var(--screenScalarFontSize, var(--screenMinFontSize)), var(--screenMaxFontSize))',
      })
    screen.htmlRoot.append(scalarClass)
  }
}

export default function rootFontSizes(config, postcss) {
  const screens = Object.entries(config.theme.screens)
  let prev = null

  screens.forEach(([key, screen], index) => {
    if (key === 'start') {
      generateDefaultRootCSS(config.options.applyGlobalScalar, screen, postcss)
    }

    generateRootFontSizeValues(key, screen, prev, postcss)

    // set prev on screen before 'end'
    if (index === screens.length - 2) {
      prev = screen
    }
  })
}
