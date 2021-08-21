import postcssJs from 'postcss-js'

export function getRule(key, postcss) {
  if (key === 'MONO') {
    return postcss.rule({ selector: 'pre,code,kbd,samp' })
  } else if (key === 'HEADERS') {
    return postcss.rule({ selector: 'h1,h2,h3,h4,h5,h6' })
  } else if (key.includes('.')) {
    return postcss.rule({ selector: key })
  } else {
    return postcss.rule({ selector: `.font-${key}` })
  }
}

export default function fonts(config, postcss) {
  const { bodyRoot, htmlRoot } = config.theme.screens.start
  Object.entries(config.theme.fonts).forEach(([key, styles]) => {
    const css = postcssJs.parse(styles)

    if (key === 'BODY') {
      bodyRoot.append(css)
    } else {
      htmlRoot.append(getRule(key, postcss).append(css))
    }
  })
}
