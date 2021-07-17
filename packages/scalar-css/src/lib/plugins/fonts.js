export function createFontStyles(fontSettings, root) {
  const { family, ligatures, weight } = fontSettings

  root.append({ prop: 'font-family', value: family })

  if (ligatures) {
    root.append({ prop: 'font-variant-ligatures', value: ligatures })
  }

  if (weight) {
    root.append({ prop: 'font-weight', value: weight })
  }
}

export function createElementsRule(settings, htmlRoot, postcss) {
  const { elements } = settings
  let rule = null

  if (elements === 'mono') {
    rule = postcss.rule({ selector: 'pre,code,kbd,samp' })
  } else if (elements === 'headers') {
    rule = postcss.rule({ selector: 'h1,h2,h3,h4,h5,h6' })
  } else if (Array.isArray(elements)) {
    const selector = elements.reduce((sel, el) => `${sel},${el}`)
    rule = postcss.rule({ selector })
  } else if (typeof elements === 'string') {
    rule = postcss.rule({ selector: elements })
  }

  createFontStyles(settings, rule)

  htmlRoot.append(rule)
}

export default function fonts(config, postcss) {
  const { bodyRoot, htmlRoot } = config.theme.screens.start
  Object.values(config.theme.fonts).forEach((settings) => {
    if (settings.elements === 'body') {
      createFontStyles(settings, bodyRoot)
    } else {
      createElementsRule(settings, htmlRoot, postcss)
    }
  })
}
