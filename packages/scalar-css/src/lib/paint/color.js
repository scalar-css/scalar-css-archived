export function generateColors(key, screen, colorModes, postcss) {
  const defaultMode = colorModes.DEFAULT
  const screenKey = key === 'start' ? '' : `${key}\\:`
  const rules = []
  const defaultColors = colorModes[defaultMode]

  Object.entries(defaultColors).forEach(([colorKey, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      rules.push(
        postcss
          .rule({
            selector: `.${screenKey}color-${colorKey}-${key}`,
          })
          .append({
            prop: '--color',
            value,
          }),
      )
    })
  })

  screen.htmlRoot.append(...rules)
}

export function generateDefaultRootCSS(screen, postcss) {
  const rules = []
  rules.push(
    postcss.rule({ selector: `[class*='color']` }).append({
      prop: 'color',
      value: `var(--color)`,
    }),
  )

  screen.htmlRoot.append(...rules)
}

export default function color(config, postcss) {
  const screens = Object.entries(config.theme.screens)
  const { colorModes } = config.theme

  screens.forEach(([key, screen]) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, postcss)
    }

    generateColors(key, screen, colorModes, postcss)
  })
}
