import setup from './lib/setup'

module.exports = (config = {}) => {
	const ctx = setup(config)

	return {
		postcssPlugin: 'scalarcss',
		plugins: [setup(config)],
	}
}

module.exports.postcss = true
