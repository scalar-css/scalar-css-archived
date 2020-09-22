import { scalarUnitConversion } from '@scalar-css/scalar-css-util-conversions'
import postcss from 'postcss'

export function createBaseStyleRule() {
  return postcss
    .rule({ selector: '.container' })
    .append({ prop: 'padding', value: 'var(--containerPadding, 0)' })
    .append({ prop: 'max-width', value: 'var(--containerWidth, 100%)' })
}

export function generateCSS(screen, prev, source) {
  const container = screen.container ? screen.container : prev.container
  const containerClass = postcss.rule({ selector: '.container', source })

  if (container.padding) {
    const paddingValue = scalarUnitConversion(container.padding)
    containerClass.append({
      prop: '--containerPadding',
      value: `0 ${paddingValue}`
    })
  }

  if (container.maxWidth) {
    containerClass.append({
      prop: '--containerWidth',
      value: scalarUnitConversion(container.maxWidth)
    })
  }

  screen.htmlRoot.append(containerClass)
}

export default function container(ctx, options, source) {
  ctx.theme.screens.forEach((screen, index) => {
    const prev = screen.key !== 'start' ? ctx.theme.screens[index - 1] : null

    if (screen.key === 'start') {
      screen.htmlRoot.append(createBaseStyleRule())
    }

    generateCSS(screen, prev, source)
  })
}
