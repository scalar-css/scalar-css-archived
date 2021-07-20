import fs from 'fs'
import path from 'path'

import pkg from '../package.json'
import { finalize } from './lib/finalizeConfig'
import { loadPlugins } from './lib/loadPlugins'

const scalarComment = `! ScalarCSS v${pkg.version} | MIT License | https://scalar-css.com`
const resetPath = path.resolve(__dirname, './lib/defaults/reset.css')
const resetFile = fs.readFileSync(resetPath, 'utf8')
const plugins = loadPlugins()

function scalarPluginCreator(opts = {}) {
  return {
    postcssPlugin: 'scalarcss',
    prepare() {
      return {
        AtRule: {
          scalar: (atRule, postcss) => {
            const config = finalize(opts, postcss)

            plugins.forEach((plugin) => plugin(config, postcss))

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
