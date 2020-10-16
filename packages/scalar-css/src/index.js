import 'core-js/stable'
import 'regenerator-runtime/runtime'
import postcss from 'postcss'

const scalarName = 'scalar-css'

const plugin = postcss.plugin(scalarName, (pluginConfig = {}) => {
  return async (css, result) => {
    return postcss([])
  }
})

module.exports = plugin
