import fs from 'fs'
import path from 'path'

const debugPath = path.resolve(__dirname, '../defaults/debug.css')
const debugFile = fs.readFileSync(debugPath, 'utf8')

export function createVariableSettings(debug, debugSource, varsRoot) {
  const { gridColor, verticalRhythmColor } = debug
  if (gridColor || verticalRhythmColor) {
    debugSource.walkRules((rule) => {
      if (rule.selector === ':root') {
        rule.walkDecls((decl) => {
          if (gridColor && decl.prop === '--grid-color') {
            decl.value = gridColor
          } else if (verticalRhythmColor && decl.prop === '--rhythm-color') {
            decl.value = verticalRhythmColor
          }
          varsRoot.append(decl.clone())
        })
        rule.remove()
      }
    })
  }
}

export default function debug(config, postcss) {
  if (config.options.debug.enabled) {
    const { htmlRoot, varsRoot } = config.theme.screens.start
    const debugSource = postcss.parse(debugFile, {
      from: debugPath,
    })
    createVariableSettings(config.options.debug, debugSource, varsRoot)
    htmlRoot.append(debugSource)
  }
}
