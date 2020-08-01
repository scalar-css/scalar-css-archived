import postcss from 'postcss'
import { loadCssFile } from '@scalar-css/scalar-css-util-css'

const debugTypes = ['rhythm']

export default postcss.plugin('scalar-css-plugin-debug', (ctx, options) => {
  return css => {
    css.walkAtRules('scalar-debug', atRule => {
      const debugType = atRule.params

      if (!debugTypes.includes(debugType)) {
        throw atRule.error(`'@type ${debugType}' is an invalid debug type`)
      }

      if (debugType === 'rhythm') {
        atRule.before(loadCssFile('debugVerticalRhythm.css', 'css'))
        atRule.remove()
      }
    })
  }
})
