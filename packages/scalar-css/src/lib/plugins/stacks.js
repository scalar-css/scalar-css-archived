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
export function generateClassesForScreen(key, screen, postcss) {
  const screenKey = key === 'start' ? '' : `${key}\\:`

  const iStack = postcss
    .rule({ selector: `.${screenKey}i-stack` })
    .append({ prop: 'display', value: `flex` })
    .append({ prop: 'flex-direction', value: 'row' })

  const bStack = postcss
    .rule({ selector: `.${screenKey}b-stack` })
    .append({ prop: 'display', value: `flex` })
    .append({ prop: 'flex-direction', value: 'column' })

  screen.htmlRoot.append(iStack, bStack)
}

export default function stacks(config, postcss) {
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen]) => {
    generateClassesForScreen(key, screen, postcss)
  })
}
