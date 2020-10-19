import fs from 'fs'
import path from 'path'
import postcss from 'postcss'

export default function (ctx) {
  console.log('SCALAR ROOT PLUGIN CALLED')
  return (css) => {
    css.walkAtRules('scalar', async (atRule) => {
      if (atRule.params === 'reset') {
        console.log('RESET FOUND')
        const resetPath = path.resolve(__dirname, '../defaults/reset.css')
        atRule.before(
          postcss.parse(fs.readFileSync(resetPath, 'utf8'), {
            from: resetPath,
          }),
        )
        atRule.remove()
      }
    })
  }
}
