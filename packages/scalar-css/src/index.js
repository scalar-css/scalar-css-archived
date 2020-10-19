import 'core-js/stable'
import 'regenerator-runtime/runtime'
import postcss from 'postcss'
import { resolveConfig } from 'prettier'

const scalarName = 'scalar-css'

const plugin = postcss.plugin(scalarName, (pluginConfig = {}) => {
  return async (css, result) => {
    const config = await resolveConfig(pluginConfig, css, result)
    return postcss([])
  }
})

module.exports = plugin
