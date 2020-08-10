import postcss from 'postcss'
import {
  createBaseRootVars,
  createAttrSelectors,
  createUtilityClasses,
  default as spacing
} from './'
import setup from '../../scalar-css/src/core/setup'

describe('@scalar-css/scalar-css-plugin-spacing', () => {
  it('should generate the right number of spacing variables', () => {
    const varsNode = postcss.root({ after: '\n' }).append(':root {}')
    createBaseRootVars(varsNode.first, 3)
    expect(varsNode.first.nodes.length).toBe(3)
    varsNode.first.nodes.forEach((node, index) => {
      expect(node.prop).toBe(`--su-${index + 1}`)
      expect(node.value).toBe(`calc(var(--rhythm-rem) * ${index + 1})`)
    })
  })

  it('should generate the right attribute selectors', () => {
    const htmlRoot = postcss.root({ after: '\n' })
    createAttrSelectors(htmlRoot, 'm', 'margin')
    const top = htmlRoot.nodes[1]
    const y = htmlRoot.nodes[6]

    expect(htmlRoot.nodes.length).toBe(7)
    expect(top.selector).toBe('[class*="mt-"]')
    expect(top.nodes[0].prop).toBe('margin-top')
    expect(top.nodes[0].value).toBe('var(--m) !important')
    expect(y.selector).toBe('[class*="my-"]')
    expect(y.nodes[0].prop).toBe('margin-top')
    expect(y.nodes[0].value).toBe('var(--m) !important')
    expect(y.nodes[1].prop).toBe('margin-bottom')
    expect(y.nodes[1].value).toBe('var(--m) !important')
  })

  it('should generate the right utility classes', () => {
    const htmlRoot = postcss.root({ after: '\n' })
    createUtilityClasses(htmlRoot, 3, 'm')
    const auto = htmlRoot.nodes[0]
    const first = htmlRoot.nodes[1]

    expect(htmlRoot.nodes.length).toBe(4)
    expect(auto.selector).toBe(
      '.mt-auto,.mr-auto,.mb-auto,.ml-auto,.mx-auto,.my-auto'
    )
    expect(auto.nodes[0].prop).toBe('--m')
    expect(auto.nodes[0].value).toBe('auto')
    expect(first.selector).toBe('.mt-1,.mr-1,.mb-1,.ml-1,.mx-1,.my-1')
    expect(first.nodes[0].prop).toBe('--m')
    expect(first.nodes[0].value).toBe('var(--m-1)')
  })

  it('should scaffold out our spacing classes for the right screens', () => {
    const ctx = setup({})
    const { total } = ctx.theme.spacing
    spacing(ctx)

    const { varsRoot, htmlRoot } = ctx.theme.screens[0]
    expect(varsRoot.nodes.length).toBe(total)
    expect(htmlRoot.nodes.length).toBe(36)

    ctx.theme.screens.forEach(screen => {
      if (screen.key !== 'start') {
        const { htmlRoot } = screen
        const expected = 22

        expect(htmlRoot.nodes.length).toBe(expected)
      }
    })
  })
})
