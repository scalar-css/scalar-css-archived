export function temp(screen) {
  console.log('scale', screen)
}

export default function typeScales(config, postcss) {
  const { bodyRoot, htmlRoot } = config.theme.screens.start
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen]) => {
    temp(screen.typeScale)
  })
}
