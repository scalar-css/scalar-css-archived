import postcss from 'postcss'

export function createBaseStyleRule() {
  return postcss
    .rule({ selector: '[class*="font-"]' })
    .append({ prop: 'font-family', value: 'var(--ff, inherit)' })
    .append({ prop: 'font-weight', value: 'var(--fw, inherit)' })
    .append({ prop: 'font-variant-ligatures', value: 'var(--fvl, normal)' })
}

export function generateElementsCSSRule({
  fontFamily,
  elements,
  ligatures,
  weight
}) {
  let rule = null

  if (elements === 'body') {
    rule = postcss.rule({ selector: 'body' })
  } else if (elements === 'headers') {
    rule = postcss.rule({ selector: 'h1,h2,h3,h4,h5,h6' })
  } else if (elements === 'mono') {
    rule = postcss.rule({ selector: 'pre,code,kbd,samp' })
  } else if (Array.isArray(elements)) {
    const selector = elements.reduce((sel, el) => (sel += `,${el}`))
    rule = postcss.rule({ selector })
  } else {
    rule = postcss.rule({ selector: elements })
  }

  rule.append({ prop: 'font-family', value: fontFamily })

  if (typeof ligatures !== 'undefined') {
    rule.append({ prop: 'font-variant-ligatures', value: ligatures })
  }

  if (typeof weight !== 'undefined') {
    rule.append({ prop: 'font-weight', value: weight })
  }

  return rule
}

export function generateFontClassRule(id, { fontFamily, ligatures }) {
  const fontClass = postcss
    .rule({ selector: `.font-${id}` })
    .append({ prop: '--ff', value: fontFamily })

  if (typeof ligatures !== 'undefined') {
    fontClass.append({ prop: '--fvl', value: ligatures })
  }

  return fontClass
}

export default function fonts(ctx, options, source) {
  const startScreen = ctx.theme.screens[0]
  startScreen.htmlRoot.append(createBaseStyleRule())

  Object.entries(ctx.theme.fonts).forEach(([id, settings]) => {
    startScreen.htmlRoot.append(generateFontClassRule(id, settings))

    if (settings.elements) {
      startScreen.htmlRoot.append(generateElementsCSSRule(settings))
    }
  })
}
