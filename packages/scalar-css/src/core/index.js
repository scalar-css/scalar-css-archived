import reset from './reset'
import debug from './debug'

export default function core(ctx) {
  return css => {
    reset()(css)
    debug(ctx)(css)
  }
}
