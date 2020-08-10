---
to: "packages/scalar-css-plugin-<%= h.changeCase.paramCase(name) %>/src/index.spec.js"
---
import postcss from 'postcss'
import setup from '../../scalar-css/src/core/setup'

describe('@scalar-css/scalar-css-plugin-<%= h.changeCase.paramCase(name) %>', () => {
  it('should ', () => {
    expect(true).toBe(true)
  })
})
