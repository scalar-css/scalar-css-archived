import fs from 'fs'
import path from 'path'
import { pxToRem } from '../utils/conversions'

const debugPath = path.resolve(__dirname, '../defaults/debug.css')
const debugFile = fs.readFileSync(debugPath, 'utf8')

/**
 * Create Variable Settings
 *
 * If the user has provided customization for the debug grid under
 * the `options` key, we update the grid/rhythm colors with the
 * settings they've provided.
 *
 * @param {Object} debug options object
 * @param {PostCSSObject} debugSource
 * @param {PostCSSNode} varsRoot start screen vars root
 */
export function createVariableSettings(debug, debugSource, varsRoot) {
  const { gridColor, verticalRhythmColor, enabled } = debug
  if (enabled) {
    debugSource.walkRules((rule) => {
      if (rule.selector === ':root') {
        rule.walkDecls((decl) => {
          if (gridColor && decl.prop === '--vGridColor') {
            decl.value = gridColor
          } else if (verticalRhythmColor && decl.prop === '--vRhythmColor') {
            decl.value = verticalRhythmColor
          }
          varsRoot.append(decl.clone())
        })
        rule.remove()
      }
    })
  }
}

/**
 * Create Screen Settings
 *
 * Because the user can customize the grid/font size on a per-screen
 * basis, we need to update the values for each screen to ensure it's
 * displaying properly.
 *
 * @param {Object} config
 * @param {PostCSSNode} varsRoot current screen's varsRoot
 */
export function createScreenSettings(config, varsRoot) {
  const screens = Object.entries(config.theme.screens)

  screens.forEach(([screenKey, screen], index) => {
    const { baseFontSizePx, virtualGridPx, verticalRhythmPx } = screen
    const virtualGridRem = pxToRem(virtualGridPx, baseFontSizePx)
    // const verticalRhythmRem = pxToRem(verticalRhythmPx, baseFontSizePx)
    varsRoot.append({
      prop: '--vGridRem',
      value: `${virtualGridRem}rem`,
    })
    // .append({
    //   prop: '--vRhythmRem',
    //   value: `${verticalRhythmRem}rem`,
    // })
  })
}

export default function debug(config, postcss) {
  if (config.options.debug.enabled) {
    const { htmlRoot, varsRoot } = config.theme.screens.start
    const debugSource = postcss.parse(debugFile, {
      from: debugPath,
    })
    createVariableSettings(config.options.debug, debugSource, varsRoot)
    createScreenSettings(config, varsRoot)
    htmlRoot.append(debugSource)
  }
}
