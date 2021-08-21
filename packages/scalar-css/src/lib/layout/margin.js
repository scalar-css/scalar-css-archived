/**
 * top 	inset-block-start
 * left 	inset-inline-start
 * right 	inset-inline-end
 * bottom 	inset-block-end
 * inset, inset-bs, inset-is,
 *
 * i, b-is, b-ie, i-is, i-ie, b-i, i-i
 *
 * https://www.smashingmagazine.com/2019/08/writing-modes-layout/
 * https://24ways.org/2016/css-writing-modes/
 * https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/
 *
 */
const mappings = {
  margin: [true, true, true, true],
  'b-margin': [true, true, false, false],
  'bs-margin': [true, false, false, false],
  'be-margin': [false, true, false, false],
  'i-margin': [false, false, true, true],
  'is-margin': [false, false, true, false],
  'ie-margin': [false, false, false, true],
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
export function generateMargins(key, screen, units, postcss) {
  const screenKey = key === 'start' ? '' : `${key}\\:`

  const rules = units.reduce((acc, unit) => {
    Object.entries(mappings).forEach(([key, value]) => {
      const rule = postcss.rule({
        selector: `.${screenKey}${key}-${unit}`,
      })

      if (value[0]) {
        rule.append({
          prop: '--bs-margin',
          value: `var(--unit-${unit})`,
        })
      }

      if (value[1]) {
        rule.append({
          prop: '--be-margin',
          value: `var(--unit-${unit})`,
        })
      }

      if (value[2]) {
        rule.append({
          prop: '--is-margin',
          value: `var(--unit-${unit})`,
        })
      }

      if (value[3]) {
        rule.append({
          prop: '--ie-margin',
          value: `var(--unit-${unit})`,
        })
      }

      acc.push(rule)
    })

    return acc
  }, [])

  screen.htmlRoot.append(...rules)
}

export function generateDefaultRootCSS(screen, units, postcss) {
  const rules = []
  rules.push(
    postcss
      .rule({ selector: `[class*='margin']` })
      .append({
        prop: 'margin-block-start',
        value: `calc(1em * var(--bs-margin, 0))`,
      })
      .append({
        prop: 'margin-block-end',
        value: `calc(1em * var(--be-margin, 0))`,
      })
      .append({
        prop: 'margin-inline-start',
        value: `calc(1em * var(--is-margin, 0))`,
      })
      .append({
        prop: 'margin-inline-end',
        value: `calc(1em * var(--ie-margin, 0))`,
      }),
  )

  screen.htmlRoot.append(...rules)
}

export default function padding(config, postcss) {
  const { units } = config.theme
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen], index) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, units, postcss)
    }

    generateMargins(key, screen, units, postcss)
  })
}
