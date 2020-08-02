import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import isResolvable from 'is-resolvable'
import { cosmiconfig } from 'cosmiconfig'

import setup from './setup'

const scalarName = 'scalar-css'

function initializePlugin(ctx, plugin, source) {
  if (Array.isArray(plugin)) {
    const [processor, opts] = plugin

    if (
      typeof opts === 'undefined' ||
      (typeof opts === 'object' && !opts.exclude) ||
      (typeof opts === 'boolean' && opts === true)
    ) {
      return Promise.resolve(processor(ctx, opts, source))
    }
  }

  return Promise.resolve(plugin(ctx, opts, source))
}

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

    css.walkAtRules('scalar', async atRule => {
      if (atRule.params === 'reset') {
        const resetPath = path.resolve(__dirname, 'defaults/reset.css')
        atRule.before(
          postcss.parse(fs.readFileSync(resetPath, 'utf8'), { from: resetPath })
        )
        atRule.remove()
      }

      if (atRule.params === 'debug') {
        const debugPath = path.resolve(__dirname, 'defaults/debug.css')
        atRule.before(
          postcss.parse(fs.readFileSync(debugPath, 'utf8'), { from: debugPath })
        )
        atRule.remove()
      }

      if (atRule.params === 'utilities') {
        await plugins.reduce(async (prevPromise, plugin) => {
          return prevPromise.then(initializePlugin(ctx, plugin, atRule.source))
        }, Promise.resolve())
        atRule.remove()
      }

      ctx.screens.forEach(screen => {
        css.append(screen.rootNode.toString())
      })
    })
  }
})
