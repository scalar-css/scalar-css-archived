import reset from './reset'
import debug from './debug'
import rootSizes from './rootSizes'
import test from './test'

export default function core(ctx) {
  return css => {
    reset()(css)
    debug(ctx)(css)
    rootSizes(ctx)(css)
    test(ctx)(css)
  }
}
