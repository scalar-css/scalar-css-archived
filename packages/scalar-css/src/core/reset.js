export default function () {
  return css => {
    css.walkAtRules('scalar-reset', atRule => {
      atRule.before(loadCssFile('reset.css'))
      atRule.remove()
    })
  }
}
