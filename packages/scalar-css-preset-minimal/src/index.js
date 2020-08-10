/**
 * @author Kether Saturnius
 * @license MIT
 * @module scalar-css:preset:minimal
 * @overview
 *
 * This default preset only includes the "core" plugins needed for generating
 * the reset, debug, root sizes, typography, and container for a fluid site.
 */
import container from '@scalar-css/scalar-css-plugin-container'
import display from '@scalar-css/scalar-css-plugin-display'
import fontFamily from '@scalar-css/scalar-css-plugin-font-family'
import position from '@scalar-css/scalar-css-plugin-position'
import spacing from '@scalar-css/scalar-css-plugin-spacing'
import rootSizes from '@scalar-css/scalar-css-plugin-root-sizes'
import typography from '@scalar-css/scalar-css-plugin-type'

const defaultOptions = {}

export default function presetDefault(opts = {}) {
  const options = Object.assign({}, defaultOptions, opts)

  const plugins = [
    [rootSizes, options.rootSizes],
    [display, options.display],
    [fontFamily, options.fontFamily],
    [position, options.position],
    [spacing, options.spacing],
    [typography, options.type],
    [container, options.container]
  ]

  return { plugins }
}
