import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

function initializePlugin(ctx, plugin, source) {
  if (Array.isArray(plugin)) {
    const [processor, opts] = plugin

    if (
      typeof opts === 'undefined' ||
      (typeof opts === 'object' && !opts.exclude) ||
      (typeof opts === 'boolean' && opts === true)
    ) {
      return Promise.resolve(processor(ctx, source))
    }
  }

  return Promise.resolve(plugin(ctx, source))
}

export default function (ctx, plugins) {
  return css => {
    css.walkAtRules('scalar', async atRule => {
      if (atRule.params === 'reset') {
        const resetPath = path.resolve(__dirname, '../defaults/reset.css')
        atRule.before(
          postcss.parse(fs.readFileSync(resetPath, 'utf8'), { from: resetPath })
        )
        atRule.remove()
      }

      if (atRule.params === 'debug') {
        const debugPath = path.resolve(__dirname, '../defaults/debug.css')
        const baseLineColor =
          ctx.options.debug && ctx.options.debug.baselineColor
            ? ctx.options.debug.baselineColor
            : 'rgba(255, 0, 0, 0.1)'
        const rhythmColor =
          ctx.options.debug && ctx.options.debug.rhythmColor
            ? ctx.options.debug.rhythmColor
            : 'rgba(255, 0, 0, 0.05)'

        atRule.before(
          postcss.parse(fs.readFileSync(debugPath, 'utf8'), { from: debugPath })
        )
        atRule.before(
          postcss
            .rule({ selector: ':root' })
            .append({
              prop: '--baseline-color',
              value: baseLineColor
            })
            .append({
              prop: '--rhythm-color',
              value: rhythmColor
            })
        )
        atRule.remove()
      }

      if (atRule.params === 'utilities' && Array.isArray(plugins)) {
        plugins.reduce(async (prevPromise, plugin) => {
          return prevPromise.then(initializePlugin(ctx, plugin, atRule.source))
        }, Promise.resolve())
        atRule.remove()
      }

      ctx.theme.screens.forEach(screen => {
        css.append(screen.rootNode.toString())
      })
    })
  }
}
