const fs = require('fs')
const pkg = require('../../package.json')

module.exports = function reset(addBase, postcss) {
  const resetStyles = postcss.parse(
    fs.readFileSync(`${__dirname}/reset.css`, 'utf8'),
  )

  addBase([
    postcss.comment({
      text: `! ScalarCSS v${pkg.version} | MIT License | https://scalar-css.com`,
    }),
    ...resetStyles.nodes,
  ])
}
