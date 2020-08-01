import reset from '@scalar-css/scalar-css-plugin-reset'
import debug from '@scalar-css/scalar-css-plugin-debug'
import rootSizes from '@scalar-css/scalar-css-plugin-root-sizes'

export default function core(ctx) {
  return css => {
    reset()(css)
    debug(ctx)(css)
    rootSizes(ctx)(css)
  }
}
