import { pxToRem } from '../utils/conversions'

/**
 * Generate Gap Units
 *
 * Create the default gap values for each of the units, on a
 * screen-by-screen basis.
 *
 * @param {String} key
 * @param {Object} screen
 * @param {Array} units
 * @param {Function} postcss
 */
export function generateDefaultGapUnits(key, screen, units, postcss) {
  const screenKey = key === 'start' ? '' : `${key}\\:`

  const rules = units.reduce((acc, unit) => {
    const gap = postcss
      .rule({ selector: `.${screenKey}gap-${unit}` })
      .append({ prop: '--gap', value: `var(--unit-${unit})` })
    acc.push(gap)

    return acc
  }, [])

  screen.htmlRoot.append(...rules)
}

export function generateDefaultRootCSS(screen, postcss) {
  const iGap = postcss
    .rule({ selector: `[class*='gap']` })
    .append({ prop: 'gap', value: `calc(1rem * var(--gap, 0))` })
  screen.htmlRoot.append(iGap)
}

export default function gaps(config, postcss) {
  const { units } = config.theme
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen], index) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, postcss)
    }

    generateDefaultGapUnits(key, screen, units, postcss)
  })
}
