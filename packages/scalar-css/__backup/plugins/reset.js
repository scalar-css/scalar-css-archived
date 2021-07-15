const fs = require('fs')
const pkg = '0.0.0'

module.exports = function reset(postcss) {
	const resetStyles = postcss.parse(
		fs.readFileSync(`${__dirname}/reset.css`, 'utf8'),
	)

	return [
		postcss.comment({
			text: `! ScalarCSS v${pkg.version} | MIT License | https://scalar-css.com`,
		}),
		...resetStyles.nodes,
	]
}
