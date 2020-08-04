import { pxToRem } from '@scalar-css/scalar-css-util-conversions'

function updateContext(ctx, screen) {
  ctx.Theme.CurrentScreen = {
    ...ctx.Theme.ScreensByKey[screen]
  }
}

function resetContext(ctx) {
  ctx.Theme.CurrentScreen = ctx.Theme.ScreensByKey[ctx.Theme.DefaultScreenKey]
}

function convertRemUnits(decl, baseFontSizePx) {
  const pixelValue = decl.value.replace('rem(', '').replace('px)', '')
  const newValue = pxToRem(pixelValue, baseFontSizePx)
  decl.replaceWith({ prop: decl.prop, value: `${newValue}rem` })
}

export default function (ctx) {
  return css => {
    css.walkAtRules('screen', atRule => {
      if (!(atRule.params in ctx.Theme.ScreensByKey)) {
        throw atRule.error(
          `'@screen ${atRule.params}' is an invalid breakpoint value. `
        )
      }

      const { breakpointStartPx, baseFontSizePx } = ctx.Theme.ScreensByKey[
        atRule.params
      ]

      updateContext(ctx, atRule.params)
      atRule.name = 'media'
      atRule.params = `(min-width: ${breakpointStartPx}px)`

      // Convert any rem units for this screen because rems are
      // relative to the baseFontSize of the current screen
      atRule.walkDecls(decl => {
        if (decl.value.includes('rem(')) {
          convertRemUnits(decl, baseFontSizePx)
        }
      })

      resetContext(ctx)
    })
  }
}
