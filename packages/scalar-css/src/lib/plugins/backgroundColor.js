export function generateBackgroundColors(key, screen, colorModes, postcss) {
  const defaultMode = colorModes.DEFAULT
  const screenKey = key === 'start' ? '' : `${key}\\:`
  const rules = []
  const defaultColors = colorModes[defaultMode]

  Object.entries(defaultColors).forEach(([colorKey, colors]) => {
    Object.entries(colors).forEach(([key, value]) => {
      rules.push(
        postcss
          .rule({
            selector: `.${screenKey}bg-${colorKey}-${key}`,
          })
          .append({
            prop: '--bg',
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
    postcss.rule({ selector: `[class*='bg']` }).append({
      prop: 'background-color',
      value: `var(--bg)`,
    }),
  )

  screen.htmlRoot.append(...rules)
}

export default function backgroundColor(config, postcss) {
  const screens = Object.entries(config.theme.screens)
  const { colorModes } = config.theme

  screens.forEach(([key, screen]) => {
    if (key === 'start') {
      generateDefaultRootCSS(screen, postcss)
    }

    generateBackgroundColors(key, screen, colorModes, postcss)
  })
}
