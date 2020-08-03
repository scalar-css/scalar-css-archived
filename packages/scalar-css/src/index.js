import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import isResolvable from 'is-resolvable'
import functions from 'postcss-functions'
import { cosmiconfig } from 'cosmiconfig'

import setup from './core/setup'
import scalar from './core/scalar'
import screen from './core/screen'

const scalarName = 'scalar-css'

const scalarFunctions = functions({
  glob: path.join(__dirname, 'functions', '*.js')
})

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
async function resolveConfig(config, css, result) {
  if (config.preset) {
    return resolvePreset(config.preset)
  }

  const inputFile = css.source && css.source.input && css.source.input.file
  let searchPath = inputFile ? path.dirname(inputFile) : process.cwd()
  let configPath = null

  if (config.configFile) {
    searchPath = null
    configPath = path.resolve(process.cwd(), config.configFile)
  }

  const configExplorer = cosmiconfig(scalarName)
  const searchForConfig = configPath
    ? configExplorer.load(configPath)
    : configExplorer.search(searchPath)

  return searchForConfig.then(config => {
    if (config === null) {
      return resolvePreset('minimal')
    }

    return resolvePreset(config.config.preset || config.config)
  })
}

export default postcss.plugin(scalarName, (config = {}) => {
  return async (css, result) => {
    const ctx = setup(config)
    const plugins = await resolveConfig(config, css, result)

    return postcss([
      scalar(ctx, plugins),
      screen(ctx),
      scalarFunctions
    ]).process(css, {
      from: css.source.input.file
    })
  }
})
