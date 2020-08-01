/**
 * @author Kether Saturnius
 * @license MIT
 * @module scalar-css:preset:minimal
 * @overview
 *
 * This default preset only includes the "core" plugins needed for generating
 * the reset, debug, root sizes, typography, and container for a fluid site.
 */

import scalarReset from '@scalar-css/scalar-css-plugin-reset'
import scalarDebug from '@scalar-css/scalar-css-plugin-debug'
import scalarRootSizes from '@scalar-css/scalar-css-plugin-root-sizes'

const defaultOptions = {}

export default function presetDefault(opts = {}) {
  const options = Object.assign({}, defaultOptions, opts)

  const plugins = [
    [scalarReset, options.reset],
    [scalarDebug, options.debug],
    [scalarRootSizes, options.rootSizes]
  ]

  return { plugins }
}
