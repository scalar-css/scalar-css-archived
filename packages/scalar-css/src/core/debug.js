import { loadCssFile } from '../util/css'

const debugTypes = ['vertical']

export default function debug(ctx) {
  return css => {
    css.walkAtRules('debug', atRule => {
      const debugType = atRule.params

      if (!debugTypes.includes(debugType)) {
        throw atRule.error(`'@type ${debugType}' is an invalid debug type`)
      }

      if (debugType === 'vertical') {
        atRule.before(loadCssFile('debugVerticalRhythm.css'))
        atRule.remove()
      }
    })
  }
}
