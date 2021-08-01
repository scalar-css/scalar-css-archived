import { pxToRem } from '../utils/conversions'

export function generateDefaultUnits(key, screen, units) {
  units.forEach((unit) => {
    screen.varsRoot.append({
      prop: `--unit-${unit}`,
      value: pxToRem(unit, screen.baseFontSizePx),
    })
  })
}

export default function units(config) {
  const { units } = config.theme
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen]) => {
    generateDefaultUnits(key, screen, units)
  })
}
