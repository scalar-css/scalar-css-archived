import 'core-js/stable'
import 'regenerator-runtime/runtime'
import postcss from 'postcss'

import scalar from './core/scalar'
import screen from './core/screen'
import setup from './core/setup'

const scalarName = 'scalar-css'

const plugin = postcss.plugin(scalarName, (pluginConfig = {}) => {
  const ctx = setup(pluginConfig)

  return async (css) => {
    return postcss([scalar(ctx), screen(ctx)]).process(css, {
      from: css.source.input.file,
    })
  }
})

module.exports = plugin
