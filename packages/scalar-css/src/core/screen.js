export default function (ctx) {
  return css => {
    css.walkAtRules('screen', atRule => {
      if (!(atRule.params in ctx.theme.screensByKey)) {
        throw atRule.error(
          `'@screen ${atRule.params}' is an invalid breakpoint value. `
        )
      }

      const breakpoint = ctx.theme.screensByKey[atRule.params].breakpointStartPx
      atRule.name = 'media'
      atRule.params = `(min-width: ${breakpoint}px)`
    })
  }
}
