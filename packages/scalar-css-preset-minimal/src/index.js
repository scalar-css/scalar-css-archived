/**
 * @author Kether Saturnius
 * @license MIT
 * @module scalar-css:preset:minimal
 * @overview
 *
 * This default preset only includes the "core" plugins needed for generating
 * the reset, debug, root sizes, and typography for a fluid site.
 */
import rootSizes from '@scalar-css/scalar-css-plugin-root-sizes'

const defaultOptions = {}

export default function presetDefault(opts = {}) {
  const options = Object.assign({}, defaultOptions, opts)

  const plugins = [[rootSizes, options.rootSizes]]

  return { plugins }
}
