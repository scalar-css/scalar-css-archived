const mappings = {
  pad: [true, true, true, true],
  'b-pad': [true, true, false, false],
  'bs-pad': [true, false, false, false],
  'be-pad': [false, true, false, false],
  'i-pad': [false, false, true, true],
  'is-pad': [false, false, true, false],
  'ie-pad': [false, false, false, true],
}

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
export function generateDefaultPadding(key, screen, units, postcss) {
  const screenKey = key === 'start' ? '' : `${key}\\:`

  const rules = units.reduce((acc, unit) => {
    Object.entries(mappings).forEach(([key, value]) => {
      acc.push(
        postcss
          .rule({
            selector: `.${screenKey}${key}-${unit}`,
          })
          .append({
            prop: '--bs-padding',
            value: value[0] ? `var(--unit-${unit})` : 0,
          })
          .append({
            prop: '--be-padding',
            value: value[1] ? `var(--unit-${unit})` : 0,
          })
          .append({
            prop: '--is-padding',
            value: value[2] ? `var(--unit-${unit})` : 0,
          })
          .append({
            prop: '--ie-padding',
            value: value[3] ? `var(--unit-${unit})` : 0,
          }),
      )
    })

    return acc
  }, [])

  screen.htmlRoot.append(...rules)
}

export function generateDefaultRootCSS(screen, postcss) {
  const rules = []
  rules.push(
    postcss
      .rule({ selector: `[class*='pad']` })
      .append({
        prop: 'padding-block-start',
        value: `calc(1em * var(--bs-padding, 0))`,
      })
      .append({
        prop: 'padding-block-end',
        value: `calc(1em * var(--be-padding, 0))`,
      })
      .append({
        prop: 'padding-inline-start',
        value: `calc(1em * var(--is-padding, 0))`,
      })
      .append({
        prop: 'padding-inline-end',
        value: `calc(1em * var(--ie-padding, 0))`,
      }),
  )

  screen.htmlRoot.append(...rules)
}

export default function padding(config, postcss) {
  const { units } = config.theme
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen], index) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, postcss)
    }

    generateDefaultPadding(key, screen, units, postcss)
  })
}
