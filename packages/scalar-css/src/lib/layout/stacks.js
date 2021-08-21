const alignItems = [
  ['start', 'flex-start'],
  ['end', 'flex-end'],
  ['center', 'center'],
  ['baseline', 'baseline'],
  ['stretch', 'stretch'],
]
const justifyContent = [
  ['start', 'flex-start'],
  ['end', 'flex-end'],
  ['center', 'center'],
  ['between', 'space-between'],
  ['around', 'space-around'],
  ['evenly', 'space-evenly'],
]

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
  const rules = []
  const screenKey = key === 'start' ? '' : `${key}\\:`

  rules.push(
    postcss
      .rule({ selector: `.${screenKey}i-stack` })
      .append({ prop: 'display', value: `flex` })
      .append({ prop: 'flex-direction', value: 'row' }),
  )

  rules.push(
    postcss
      .rule({ selector: `.${screenKey}b-stack` })
      .append({ prop: 'display', value: `flex` })
      .append({ prop: 'flex-direction', value: 'column' }),
  )

  justifyContent.forEach(([justifyKey, justifyValue]) => {
    alignItems.forEach(([alignKey, alignValue]) => {
      let rule = null

      if (justifyKey === alignKey) {
        rule = postcss.rule({ selector: `.${screenKey}${justifyKey}` })
      } else {
        rule = postcss.rule({
          selector: `.${screenKey}${justifyKey}-${alignKey}`,
        })
      }
      rules.push(
        rule
          .append({ prop: 'justify-content', value: justifyValue })
          .append({ prop: 'align-items', value: alignValue }),
      )
    })
  })

  screen.htmlRoot.append(...rules)
}

export default function stacks(config, postcss) {
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen]) => {
    generateClassesForScreen(key, screen, postcss)
  })
}
