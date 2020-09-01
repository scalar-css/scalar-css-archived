/**
 * @author Kether Saturnius
 * @license MIT
 * @module scalar-css:preset:minimal
 * @overview
 *
 * This preset only includes the "core" plugins needed for generating
 * the reset, debug, root sizes, and typography for a fluid site.
 */
import fonts from '@scalar-css/scalar-css-plugin-fonts'
import rootSizes from '@scalar-css/scalar-css-plugin-root-sizes'
import type from '@scalar-css/scalar-css-plugin-type'

const defaultOptions = {}

export default function presetDefault(opts = {}) {
  const options = Object.assign({}, defaultOptions, opts)

  const plugins = [
    [rootSizes, options.rootSizes],
    [fonts, options.fonts],
    [type, options.type]
  ]

  return { plugins }
}
