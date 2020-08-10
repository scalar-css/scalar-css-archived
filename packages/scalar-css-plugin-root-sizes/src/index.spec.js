import { calculateRootFontSize, default as rootSizes } from './'
import setup from '../../scalar-css/src/core/setup'

const ctx = setup({})

const startScreen = ctx.theme.screens[0]
const smScreen = ctx.theme.screens[1]
const mdScreen = ctx.theme.screens[2]
const lgScreen = ctx.theme.screens[3]
const xlScreen = ctx.theme.screens[4]
const endScreen = ctx.theme.screens[5]

describe('@scalar-css/scalar-css-plugin-root-sizes', () => {
  it('should generate our start root size properly', () => {
    const actual = calculateRootFontSize(startScreen)
    const expected = 'clamp(100%, 5vw, 180%)'
    expect(actual).toBe(expected)
  })

  it('should generate our sm root size properly', () => {
    const actual = calculateRootFontSize(smScreen)
    const expected = 'clamp(100%, 2.7777777777777777vw, 133.33333333333334%)'
    expect(actual).toBe(expected)
  })

  it('should generate our md root size properly', () => {
    const actual = calculateRootFontSize(mdScreen)
    const expected = 'clamp(100%, 2.083333333333333vw, 129.16666666666666%)'
    expect(actual).toBe(expected)
  })

  it('should generate our lg root size properly', () => {
    const actual = calculateRootFontSize(lgScreen)
    const expected = 'clamp(100%, 1.6129032258064515vw, 120.96774193548387%)'
    expect(actual).toBe(expected)
  })

  it('should generate our xl root size properly', () => {
    const actual = calculateRootFontSize(xlScreen)
    const expected = 'clamp(125%, 1.6666666666666667vw, 150%)'
    expect(actual).toBe(expected)
  })

  it('should generate our end root size properly', () => {
    const actual = calculateRootFontSize(endScreen, xlScreen)
    const expected = '150%'
    expect(actual).toBe(expected)
  })

  it('should properly generate the html/css properly', () => {
    rootSizes(ctx)
    let rootNode = ctx.theme.screens[0].rootNode.toString()
    let expected = `:root {
    --baseline: 1.5;
    --rhythm: 0.75;
    --baseline-rem: 1.5rem;
    --rhythm-rem: 0.75rem}
html {
    line-height: 1.5;
    font-size: clamp(100%, 5vw, 180%)}`
    expect(rootNode).toBe(expected)

    // 'md' screen
    rootNode = ctx.theme.screens[2].rootNode.toString()
    expected = `@screen md {
:root {
--baseline: 1.5;
--rhythm: 0.75;
--baseline-rem: 1.5rem;
--rhythm-rem: 0.75rem}
html {
line-height: 1.5;
font-size: clamp(100%, 2.083333333333333vw, 129.16666666666666%)
}
}`
    expect(rootNode).toBe(expected)

    // 'end' screen
    rootNode = ctx.theme.screens[5].rootNode.toString()
    expected = `@screen end {
:root {
--baseline: 1.5;
--rhythm: 0.75;
--baseline-rem: 1.5rem;
--rhythm-rem: 0.75rem}
html {
line-height: 1.5;
font-size: 150%
}
}`
    expect(rootNode).toBe(expected)
  })
})
