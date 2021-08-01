import { pxToRem } from '../utils/conversions'

/**
 * margin-top 	margin-block-start
 * margin-left 	margin-inline-start
 * margin-right 	margin-inline-end
 * margin-bottom 	margin-block-end
 * m, mbs, mbe, mis, mie, mb, mi
 *
 * padding-top 	padding-block-start
 * padding-bottom 	padding-block-end
 * padding-left 	padding-inline-start
 * padding-right 	padding-inline-end
 * p, pt, pb, pl, pr, px, py
 * p, pbs, pbe, pis, pie, pb, pi
 * p, b-ps, b-pe, i-ps, i-pe, b-p, i-p
 *
 * top 	inset-block-start
 * left 	inset-inline-start
 * right 	inset-inline-end
 * bottom 	inset-block-end
 * inset, inset-bs, inset-is,
 *
 * i, b-is, b-ie, i-is, i-ie, b-i, i-i
 *
 * width/height logical properties depending on writing mode
 * inline-size
 * block-size
 * isize, bsize
 *
 * https://www.smashingmagazine.com/2019/08/writing-modes-layout/
 * https://24ways.org/2016/css-writing-modes/
 * https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/
 *
 */
const properties = ['margin', 'padding', 'inset', 'border']
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
export function generateDefaultGapUnits(key, screen, units, postcss) {
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

export function generateDefaultRootCSS(screen, units, postcss) {
  const rules = []
  rules.push(
    postcss
      .rule({ selector: `[class*='pad']` })
      .append({
        prop: '--bs-padding',
        value: 0,
      })
      .append({
        prop: '--be-padding',
        value: 0,
      })
      .append({
        prop: '--is-padding',
        value: 0,
      })
      .append({
        prop: '--ie-padding',
        value: 0,
      })
      .append({
        prop: 'padding-block-start',
        value: `calc(1em * var(--bs-padding))`,
      })
      .append({
        prop: 'padding-block-end',
        value: `calc(1em * var(--be-padding))`,
      })
      .append({
        prop: 'padding-inline-start',
        value: `calc(1em * var(--is-padding))`,
      })
      .append({
        prop: 'padding-inline-end',
        value: `calc(1em * var(--ie-padding))`,
      }),
  )

  screen.htmlRoot.append(...rules)

  // const bps = postcss.rule({ selector: `[class*='bps']` }).append({
  //   prop: 'padding-block-start',
  //   value: `calc(1rem * var(--padding, 0))`,
  // })

  // const bpe = postcss.rule({ selector: `[class*='bpe']` }).append({
  //   prop: 'padding-block-end',
  //   value: `calc(1rem * var(--padding, 0))`,
  // })

  // const ip = postcss
  //   .rule({ selector: `[class*='i-p']` })
  //   .append({
  //     prop: 'padding-inline-start',
  //     value: `calc(1rem * var(--padding, 0))`,
  //   })
  //   .append({
  //     prop: 'padding-inline-end',
  //     value: `calc(1rem * var(--padding, 0))`,
  //   })

  // const ips = postcss.rule({ selector: `[class*='i-ps']` }).append({
  //   prop: 'padding-inline-start',
  //   value: `calc(1rem * var(--padding, 0))`,
  // })

  // const ipe = postcss.rule({ selector: `[class*='i-pe']` }).append({
  //   prop: 'padding-inline-end',
  //   value: `calc(1rem * var(--padding, 0))`,
  // })
  // screen.htmlRoot.append(p, bp, bps, bpe, ip, ips, ipe)
}

export default function padding(config, postcss) {
  const { units } = config.theme
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen], index) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, units, postcss)
    }

    generateDefaultGapUnits(key, screen, units, postcss)
  })
}
