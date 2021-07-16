import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

import { loadPlugins } from './loadPlugins'
import pkg from '../../package.json'

export default (ctx) => (css) => {
  const plugins = loadPlugins(ctx)

  css.walkAtRules('scalar', async (atRule) => {
    atRule.before(
      postcss.comment({
        text: `! ScalarCSS v${pkg.version} | MIT License | https://scalar-css.com`,
      }),
    )

    const resetPath = path.resolve(__dirname, './defaults/reset.css')
    atRule.before(
      postcss.parse(fs.readFileSync(resetPath, 'utf8'), {
        from: resetPath,
      }),
    )

    atRule.remove()
  })
}
