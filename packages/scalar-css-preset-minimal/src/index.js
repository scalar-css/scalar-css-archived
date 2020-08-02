/**
 * @author Kether Saturnius
 * @license MIT
 * @module scalar-css:preset:minimal
 * @overview
 *
 * This default preset only includes the "core" plugins needed for generating
 * the reset, debug, root sizes, typography, and container for a fluid site.
 */

import scalarRootSizes from '@scalar-css/scalar-css-plugin-root-sizes'
import scalarType from '@scalar-css/scalar-css-plugin-type'

const defaultOptions = {}

export default function presetDefault(opts = {}) {
  const options = Object.assign({}, defaultOptions, opts)

  const plugins = [
    [scalarRootSizes, options.rootSizes],
    [scalarType, options.type]
  ]

  return { plugins }
}
