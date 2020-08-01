import postcss from 'postcss'
import { loadCssFile } from '@scalar-css/scalar-css-util-css'

export default postcss.plugin('scalar-css-plugin-reset', ctx => {
  return css => {
    css.walkAtRules('scalar-reset', atRule => {
      atRule.before(loadCssFile('reset.css', 'css'))
      atRule.remove()
    })
  }
})
