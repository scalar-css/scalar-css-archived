export function generateColorModes(colorModes, screen) {
  const defaultMode = colorModes.DEFAULT
  let modes = ''

  Object.entries(colorModes).forEach(([modeKey, colorGrouping]) => {
    if (modeKey !== 'DEFAULT') {
      modes = modes !== '' ? `${modes},${modeKey}` : modeKey
      Object.entries(colorGrouping).forEach(([colorKey, colors]) => {
        Object.entries(colors).forEach(([key, value]) => {
          screen.varsRoot.append({
            prop: `--${modeKey}Mode-${colorKey}-${key}`,
            value,
          })
        })

        Object.entries(colors).forEach(([key, value]) => {
          if (defaultMode === modeKey) {
            screen.varsRoot.append({
              prop: `--${colorKey}-${key}`,
              value: `var(--${modeKey}Mode-${colorKey}-${key})`,
            })
          }
        })
      })
    }
  })

  screen.varsRoot.append({
    prop: `--colorModes`,
    value: `${modes}`,
  })
}

export default function colorModes(config) {
  const { colorModes } = config.theme
  generateColorModes(colorModes, config.theme.screens.start)
}
