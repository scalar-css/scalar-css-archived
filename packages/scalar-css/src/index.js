import 'core-js/stable'
import 'regenerator-runtime/runtime'

import setup from './lib/setup'
import scalar from './lib/scalar'

module.exports = (config = {}) => {
  const ctx = setup(config)

  return {
    postcssPlugin: 'scalarcss',
    plugins: [scalar(ctx)],
  }
}

module.exports.postcss = true
