import 'core-js/stable'
import 'regenerator-runtime/runtime'
import postcss from 'postcss'

import setup from './core/setup'
import scalar from './core/scalar'

const scalarName = 'scalar-css'

const plugin = postcss.plugin(scalarName, (pluginConfig = {}) => {
  const ctx = setup(pluginConfig)

  return async (css) => {
    return postcss([scalar(ctx)]).process(css, {
      from: css.source.input.file,
    })
  }
})

module.exports = plugin
