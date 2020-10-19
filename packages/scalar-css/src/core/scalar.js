import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

import * as plugins from '../plugins'

function initializePlugin(ctx, plugin) {
  return Promise.resolve(plugin(ctx))
}

export default function (ctx) {
  return (css) => {
    css.walkAtRules('scalar', async (atRule) => {
      if (atRule.params === 'reset') {
        const resetPath = path.resolve(__dirname, '../defaults/reset.css')
        atRule.before(
          postcss.parse(fs.readFileSync(resetPath, 'utf8'), {
            from: resetPath,
          }),
        )
        atRule.remove()
      }

      if (atRule.params === 'utilities') {
        Object.entries(plugins).reduce(async (prevPromise, [key, plugin]) => {
          return prevPromise.then(initializePlugin(ctx, plugin))
        }, Promise.resolve())
        atRule.remove()
      }
    })

    ctx.theme.screens.forEach((screen) => {
      // Ignore empty nodes
      if (
        (screen.rootNode.first.type !== 'atrule' &&
          screen.rootNode.first.nodes.length !== 0) ||
        // ugly, I know... but rules with no nodes were still returning lengths
        screen.rootNode.first.nodes.toString().length > 8
      ) {
        css.append(screen.rootNode.toString())
      }
    })
  }
}
