import fs from 'fs'
import path from 'path'

import pkg from '../package.json'
import { finalize } from './lib/finalizeConfig'
import { loadPlugins } from './lib/loadPlugins'

const scalarComment = `! ScalarCSS v${pkg.version} | MIT License | https://scalar-css.com`
const resetPath = path.resolve(__dirname, './lib/defaults/reset.css')
const resetFile = fs.readFileSync(resetPath, 'utf8')
const core = loadPlugins('./core')

function scalarPluginCreator(opts = {}) {
  return {
    postcssPlugin: 'scalarcss',
    prepare() {
      return {
        AtRule: {
          scalar: (atRule, postcss) => {
            const config = finalize(opts, postcss)

            core.forEach((corePlugin) => corePlugin(config, postcss))

            if (config.options.layout) {
              const layout = loadPlugins('./layout')
              layout.forEach((layoutPlugin) => layoutPlugin(config, postcss))
            }

            if (config.options.paint) {
              const paint = loadPlugins('./paint')
              paint.forEach((paintPlugin) => paintPlugin(config, postcss))
            }

            atRule.before(
              postcss.comment({
                text: scalarComment,
              }),
            )
            atRule.before(
              postcss.parse(resetFile, {
                from: resetPath,
              }),
            )

            Object.values(config.theme.screens).forEach((screen) => {
              atRule.before(screen.rootNode.toString())
            })

            atRule.remove()
          },
        },
      }
    },
  }
}

scalarPluginCreator.postcss = true
export default scalarPluginCreator
