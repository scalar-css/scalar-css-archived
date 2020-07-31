import postcss from 'postcss'

export default function debug(ctx) {
  return css => {
    ctx.screens.forEach((screen, index) => {
      // const vars = postcss
      //   .rule({ selector: ':root' })
      //   .append({ prop: '--baseline', value: `${screen.baseLineHeight}rem` })
      //   .append({ prop: '--rhythm', value: `${screen.verticalRhythm}rem` })
      // screen.rootNode.append(vars)
      // console.log(screen.rootNode.toString())
    })
  }
}
