import postcss from 'postcss'

const values = ['static', 'fixed', 'absolute', 'relative', 'sticky']

export function createBaseStyleRule() {
  return postcss
    .rule({ selector: '[class*="pos-"]' })
    .append({ prop: 'position', value: 'var(--pos) !important' })
}

export default function position(ctx, options, source) {
  ctx.theme.screens.forEach(screen => {
    if (screen.key === 'start') {
      screen.htmlRoot.append(createBaseStyleRule())
    }

    values.forEach(value => {
      screen.htmlRoot.append(
        postcss
          .rule({
            selector: `.pos-${value}`
          })
          .append({
            prop: `--pos`,
            value
          })
      )
    })
  })
}
