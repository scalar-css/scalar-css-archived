import { pxToRem } from '../utils/conversions'

/**
 * Generate Default Size Units
 *
 * Create the default `inline` and `block` size elements for each of the
 * screens based on the default units specified in the config.
 *
 * @param {String} key
 * @param {Object} screen
 * @param {Array} units
 * @param {Function} postcss
 */
export function generateDefaultSizeUnits(key, screen, units, postcss) {
  const screenKey = key === 'start' ? '' : `${key}\\:`

  const rules = units.reduce((acc, unit) => {
    const iSize = postcss
      .rule({ selector: `.${screenKey}i-size-${unit}` })
      .append({ prop: '--iSize', value: `var(--unit-${unit})` })
    acc.push(iSize)

    const bSize = postcss
      .rule({ selector: `.${screenKey}b-size-${unit}` })
      .append({ prop: '--bSize', value: `var(--unit-${unit})` })
    acc.push(bSize)

    return acc
  }, [])

  screen.htmlRoot.append(...rules)
}

export function generateDefaultRootCSS(screen, postcss) {
  const iSize = postcss
    .rule({ selector: `[class*='i-size']` })
    .append({ prop: 'inline-size', value: `calc(1rem * var(--iSize, 1))` })
  const bSize = postcss
    .rule({ selector: `[class*='b-size']` })
    .append({ prop: 'block-size', value: `calc(1rem * var(--bSize, 1))` })
  screen.htmlRoot.append(iSize, bSize)
}

export default function logicalDimensions(config, postcss) {
  const { units } = config.theme
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen], index) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, postcss)
    }

    generateDefaultSizeUnits(key, screen, units, postcss)
  })
}
