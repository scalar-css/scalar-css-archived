import path from 'path'
import postcss from 'postcss'
import isResolvable from 'is-resolvable'
import { cosmiconfig } from 'cosmiconfig'

import setup from './setup'

const scalarName = 'scalar-css'

/**
 *
 * @param {String} preset - existing preset, 'default'
 * @param {Array} preset - multiple presets to be merged, ['default', {}]
 * @param {Object} preset - already invoked function: { plugins: [] }
 */
function resolvePreset(preset) {
  let fn, options

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

  // Provide an alias for the default preset, as it is built-in
  if (fn === 'default') {
    return Promise.resolve(
      require('lerna:scalar-css-preset-default')(options).plugins
    )
  }

  // Otherwise, try loading a preset from node_modules
  if (isResolvable(fn)) {
    return Promise.resolve(require(fn)(options).plugins)
  }

  const sugar = `scalar-css-preset-${fn}`
  if (isResolvable(sugar)) {
    return Promise.resolve(require(sugar)(options).plugins)
  }

  // If all else fails, we probably have a typo in the config somewhere
  throw new Error(
    `Cannot load preset "${fn}". Please check your configuration for errors and try again.`
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
function resolveOptions(css, options) {
  if (options.preset) {
    return resolvePreset(options.preset)
  }

  const inputFile = css.source && css.source.input && css.source.input.file
  let searchPath = inputFile ? path.dirname(inputFile) : process.cwd()
  let configPath = null

  if (options.configFile) {
    searchPath = null
    configPath = path.resolve(process.cwd(), options.configFile)
  }

  const configExplorer = cosmiconfig(scalarName)
  const searchForConfig = configPath
    ? configExplorer.load(configPath)
    : configExplorer.search(searchPath)

  return searchForConfig.then(config => {
    if (config === null) {
      return resolvePreset('default')
    }

    return resolvePreset(config.config.preset || config.config)
  })
}

export default postcss.plugin(scalarName, (options = {}, config = {}) => {
  const ctx = setup(options)
  ctx.plugins = resolveOptions(css, options)

  return (css, result) => {
    return ctx.plugins.reduce((promise, plugin) => {
      return promise.then(initializePlugin.bind(null, plugin, css, result, ctx))
    }, Promise.resolve())
  }
})
