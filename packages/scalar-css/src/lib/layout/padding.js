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
      const rule = postcss.rule({
        selector: `.${screenKey}${key}-${unit}`,
      })

      if (value[0]) {
        rule.append({
          prop: '--bs-padding',
          value: `var(--unit-${unit})`,
        })
      }

      if (value[1]) {
        rule.append({
          prop: '--be-padding',
          value: `var(--unit-${unit})`,
        })
      }

      if (value[2]) {
        rule.append({
          prop: '--is-padding',
          value: `var(--unit-${unit})`,
        })
      }

      if (value[3]) {
        rule.append({
          prop: '--ie-padding',
          value: `var(--unit-${unit})`,
        })
      }

      acc.push(rule)
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
