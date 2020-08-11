import postcss from 'postcss'

const props = {
  m: 'margin',
  p: 'padding'
}

const types = {
  a: '', // placeholder for our .p-* and .m-* classes
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  x: ['left', 'right'],
  y: ['top', 'bottom']
}

export function createAttrSelectors(htmlRoot, prefix, prop) {
  htmlRoot.append(
    postcss.rule({ selector: `[class*="${prefix}-"]` }).append({
      prop: `${prop}`,
      value: `var(--${prefix}) !important`
    })
  )

  Object.entries(types).forEach(([type, edge]) => {
    const rule = postcss.rule({ selector: `[class*="${prefix}${type}-"]` })

    if (Array.isArray(edge)) {
      rule
        .append({
          prop: `${prop}-${edge[0]}`,
          value: `var(--${prefix}${type}) !important`
        })
        .append({
          prop: `${prop}-${edge[1]}`,
          value: `var(--${prefix}${type}) !important`
        })
    } else {
      rule.append({
        prop: `${prop}-${edge}`,
        value: `var(--${prefix}${type}) !important`
      })
    }

    htmlRoot.append(rule)
  })
}

/**
 * Generate our margin/padding utility classes
 *
 * @param {PostCSS Node} htmlRoot
 * @param {Number} total
 * @param {String} key
 */
export function createUtilityClasses({ htmlRoot, key }, scalarUnits, prefix) {
  const finalPrefix = key === 'start' ? prefix : `${key}-${prefix}`

  Object.keys(types).forEach(type => {
    const suffix = type === 'a' ? '' : type

    if (prefix === 'm') {
      htmlRoot.append(
        postcss
          .rule({ selector: `.${finalPrefix}${suffix}-auto` })
          .append({ prop: `--${finalPrefix}${suffix}`, value: `auto` })
      )
    }

    scalarUnits.forEach((_, index) => {
      const num = index + 1
      htmlRoot.append(
        postcss.rule({ selector: `.${finalPrefix}${suffix}-${num}` }).append({
          prop: `--${finalPrefix}${suffix}`,
          value: `var(--su-${num})`
        })
      )
    })
  })
}

export default function spacing(ctx, options, source) {
  const scalarUnits = [...Array(ctx.theme.scalarUnits)]
  ctx.theme.screens.forEach(screen => {
    if (screen.key === 'start') {
      Object.entries(props).forEach(([prefix, prop]) => {
        createAttrSelectors(screen.htmlRoot, prefix, prop)
      })
    }

    if (screen.key !== 'end') {
      Object.keys(props).forEach(prefix => {
        createUtilityClasses(screen, scalarUnits, prefix)
      })
    }
  })
}
