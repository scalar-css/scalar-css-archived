import { cosmiconfig } from 'cosmiconfig'
import isResolvable from 'is-resolvable'
import path from 'path'
import postcss from 'postcss'
import functions from 'postcss-functions'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import scalar from './core/scalar'
import screen from './core/screen'
import setup from './core/setup'
import { merge } from './util/helpers'

const scalarName = 'scalar-css'

const scalarFunctions = functions({
  glob: path.join(__dirname, 'functions', '*.js'),
})

/**
 *
 * @param {String} preset - existing preset, 'default'
 * @param {Array} preset - multiple presets to be merged, ['default', {}]
 * @param {Object} preset - already invoked function: { plugins: [] }
 */
async function resolvePreset(preset) {
  let fn, options

  if (typeof preset === 'undefined') {
    return Promise.resolve([])
  }

  if (preset.plugins) {
    return Promise.resolve(preset.plugins)
  }

  if (Array.isArray(preset)) {
    fn = preset[0]
    options = preset[1]
  } else {
    fn = preset
    options = {}
  }

  // Try loading a preset from node_modules
  if (isResolvable(fn)) {
    return Promise.resolve(require(fn).default(options).plugins)
  }

  // Otherwise, try adding some syntactic sugar
  const sugar = `@scalar-css/scalar-css-preset-${fn}`
  if (isResolvable(sugar)) {
    return Promise.resolve(require(sugar).default(options).plugins)
  }

  // If those fail, we probably have a typo in the config somewhere
  throw new Error(
    `Cannot load preset "${fn}". Please check your configuration for errors and try again.`,
  )
}

/**
 * ScalarCSS will look for configuration first as options passed
 * directly to it, and failing this it will use cosmiconfig to
 * load an external file
 *
 * @param {*} css
 * @param {*} options
 */
async function resolveConfig(pluginConfig, css, result) {
  const inputFile = css.source && css.source.input && css.source.input.file
  let searchPath = inputFile ? path.dirname(inputFile) : process.cwd()
  let configPath = null

  if (searchPath.includes('node_modules')) {
    return {}
  }

  if (pluginConfig.configFile) {
    searchPath = null
    configPath = path.resolve(process.cwd(), pluginConfig.configFile)
  }

  const configExplorer = cosmiconfig(scalarName)
  const searchForConfig = configPath
    ? configExplorer.load(configPath)
    : configExplorer.search(searchPath)

  return searchForConfig.then((cfg) => {
    const config = cfg === null ? {} : merge(pluginConfig, cfg.config)
    return Promise.resolve(config)
  })
}

const plugin = postcss.plugin(scalarName, (pluginConfig = {}) => {
  return async (css) => {
    const config = await resolveConfig(pluginConfig, css)
    const plugins = await resolvePreset(config.preset, css)
    const ctx = setup(config)

    return postcss([
      scalar(ctx, plugins),
      screen(ctx),
      scalarFunctions,
    ]).process(css, {
      from: css.source.input.file,
    })
  }
})

module.exports = plugin
