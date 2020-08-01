---
to: "packages/scalar-css-plugin-<%= h.changeCase.paramCase(name) %>/src/index.js"
---
import postcss from 'postcss';

export default postcss.plugin('scalar-css-plugin-<%= h.changeCase.paramCase(name) %>', ctx => {
  return css => {

  }
})