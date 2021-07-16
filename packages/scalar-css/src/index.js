import 'core-js/stable'
import 'regenerator-runtime/runtime'

import setup from './lib/setup'
import reset from './lib/plugins/reset'

module.exports = (config = {}) => {
  const ctx = setup(config)

  return {
    postcssPlugin: 'scalarcss',
    plugins: [reset(ctx)],
  }
}

module.exports.postcss = true
