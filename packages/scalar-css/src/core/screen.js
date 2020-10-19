import { pxToRem } from '../utils/conversions'

function getScreen(ctx, screenKey) {
  return ctx.theme.screens[ctx.theme.screensByKey[screenKey]]
}

function updateContext(ctx, screenKey) {
  ctx.theme.currentScreen = {
    ...getScreen(ctx, screenKey),
  }
}

function resetContext(ctx) {
  ctx.theme.currentScreen = getScreen(ctx, ctx.theme.defaultScreenKey)
}

export function convertRemUnits(decl, baseFontSizePx) {
  const pixelValue = decl.value.replace('rem(', '').replace('px)', '')
  const newValue = pxToRem(pixelValue, baseFontSizePx)
  decl.replaceWith({ prop: decl.prop, value: `${newValue}rem` })
}

export default function (ctx) {
  return (css) => {
    css.walkAtRules('screen', (atRule) => {
      if (!(atRule.params in ctx.theme.screensByKey)) {
        throw atRule.error(
          `'@screen ${atRule.params}' is an invalid breakpoint value. `,
        )
      }

      updateContext(ctx, atRule.params)
      const { breakpointStartPx, baseFontSizePx } = ctx.theme.currentScreen

      atRule.name = 'media'
      atRule.params = `screen and (min-width: ${breakpointStartPx}px)`

      // Convert any rem units for this screen because rems are
      // relative to the baseFontSize of the current screen
      atRule.walkDecls((decl) => {
        if (decl.value.includes('rem(')) {
          convertRemUnits(decl, baseFontSizePx)
        }
      })

      resetContext(ctx)
    })
  }
}
