import postcss from 'postcss'

const props = {
  m: 'margin',
  p: 'padding'
}

const types = {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  x: ['left', 'right'],
  y: ['top', 'bottom']
}

/**
 * Create all of the base spacing unit variables
 *
 * @param {PostCSS Node} varsNode the postcss node to attach the vars to
 * @param {Number} total total number of spacing units to generate
 */
export function createBaseRootVars(varsNode, total) {
  const spacingNumber = [...Array(total)]

  spacingNumber.forEach((_, num) => {
    varsNode.append({
      prop: `--su-${num + 1}`,
      value: `calc(var(--rhythm-rem) * ${num + 1})`
    })
  })
}

/**
 * Generate the default attribute selectors for our spacing units
 *
 * @param {PostCSS Node} htmlRoot
 * @param {String} id the id used for these selectors
 * @param {String} prop the base property name
 */
export function createAttrSelectors(htmlRoot, id, prop) {
  htmlRoot.append(
    postcss.rule({ selector: `[class*="${id}-"]` }).append({
      prop: `${prop}`,
      value: `var(--${id}) !important`
    })
  )

  Object.entries(types).forEach(([type, edge]) => {
    const rule = postcss.rule({ selector: `[class*="${id}${type}-"]` })

    if (Array.isArray(edge)) {
      rule
        .append({
          prop: `${prop}-${edge[0]}`,
          value: `var(--${id}) !important`
        })
        .append({
          prop: `${prop}-${edge[1]}`,
          value: `var(--${id}) !important`
        })
    } else {
      rule.append({
        prop: `${prop}-${edge}`,
        value: `var(--${id}) !important`
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
export function createUtilityClasses(htmlRoot, total, key) {
  const num = [...Array(total)]
  const selector = Object.keys(types).reduce((acc, type, index, types) => {
    acc += index !== types.length - 1 ? `.${key}${type}-#,` : `.${key}${type}-#`
    return acc
  }, '')

  /* istanbul ignore else */
  if (key === 'm') {
    htmlRoot.append(
      postcss
        .rule({
          selector: selector.replace(/\#/g, 'auto')
        })
        .append({ prop: `--${key}`, value: 'auto' })
    )
  }

  num.forEach((_, num) => {
    htmlRoot.append(
      postcss
        .rule({
          selector: selector.replace(/\#/g, num + 1)
        })
        .append({ prop: `--${key}`, value: `var(--${key}-${num + 1})` })
    )
  })
}

export default function spacing(ctx, options, source) {
  const { total } = ctx.theme.spacing

  ctx.theme.screens.forEach(screen => {
    if (screen.key === 'start') {
      createBaseRootVars(screen.rootNode.first, total)

      Object.entries(props).forEach(([id, prop]) => {
        createAttrSelectors(screen.htmlRoot, id, prop)
      })
    }

    Object.keys(props).forEach(key => {
      createUtilityClasses(screen.htmlRoot, total, key)
    })
  })
}
