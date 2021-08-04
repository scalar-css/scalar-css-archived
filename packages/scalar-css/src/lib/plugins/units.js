import { pxToRem } from '../utils/conversions'

export function generateDefaultUnits(key, screen, units, applyGlobalScalar) {
  units.forEach((unit) => {
    screen.varsRoot.append({
      prop: `--unit-${unit}`,
      value: applyGlobalScalar
        ? pxToRem(unit, screen.baseFontSizePx)
        : pxToRem(unit),
    })
  })
}

export default function units(config) {
  const { units } = config.theme
  const { applyGlobalScalar } = config.options
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([key, screen]) => {
    generateDefaultUnits(key, screen, units, applyGlobalScalar)
  })
}
