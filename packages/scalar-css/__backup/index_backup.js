const {
	setBaseFontSizePx,
	setBaseLineHeight,
	setVerticalRhythm,
	setBreakpointStartPx,
	setBreakpointEndPx,
	setFontScale,
	calculateRootFontSize,
} = require('./setup')
const { reset } = require('../plugins/reset')
const sitemode = require('../plugins/sitemode')

/**
 * Finalize the screen properties by duplicating/merging a few values
 * to allow easier access to properties for calculation purposes in
 * other areas of the framework. If a screen does not have new/existing
 * values set, then we re-use the values from the previous screen.
 *
 * @param {Object} config
 * @returns {Object}
 */
module.exports = function core({
	addBase,
	addComponents,
	addUtilities,
	theme,
	postcss,
}) {
	// reset(addBase, postcss)
	addUtilities(sitemode)
	// addUtilities({
	//   '.sitemode-ltr': {
	//     writingMode: 'horizontal-tb',
	//     direction: 'ltr',
	//   },
	//   '.sitemode-rtl': {
	//     writingMode: 'horizontal-tb',
	//     direction: 'rtl',
	//   },
	//   '.sitemode-vlr': {
	//     writingMode: 'vertical-lr',
	//   },
	//   '.sitemode-vrl': {
	//     writingMode: 'vertical-rl',
	//   },
	// })

	const screens = theme('screens', {})
	const screenList = Object.entries(screens)
	const screenStyles = screenList.map(([key, screen], index) => {
		const nextScreen =
			index + 1 < screenList.length ? screenList[index + 1][1] : null
		const prevScreen = index !== 0 ? screenList[index - 1][1] : null

		// finalize screen properties by duplicating/merging a few values
		screen.baseFontSizePx = setBaseFontSizePx(screen, prevScreen)
		screen.baseLineHeight = setBaseLineHeight(screen, prevScreen)
		screen.verticalRhythm = setVerticalRhythm(screen, prevScreen)
		screen.breakpointStartPx = setBreakpointStartPx(screen, prevScreen)
		screen.breakpointEndPx = setBreakpointEndPx(screen, nextScreen)
		screen.fontScale = setFontScale(screen, prevScreen)
		screen.baseLineHeightPx = screen.baseLineHeight * screen.baseFontSizePx
		screen.verticalRhythmPx = screen.verticalRhythm * screen.baseFontSizePx

		const { screenMinFontSize, screenMaxFontSize } = calculateRootFontSize(
			screen,
			prevScreen,
		)

		const fontProperties = {
			'--screen-min-font-size': `${screenMinFontSize}%`,
			'--screen-scalar-font-size': `${screenMinFontSize}%`,
			'--screen-max-font-size': `${screenMaxFontSize}%`,
			'--screen-line-height': `${screen.baseLineHeight}`,
			'--screen-rhythm': `${screen.verticalRhythm}`,
		}

		if (key === 'start') {
			return {
				':root': {
					'--screen-start-size': screen.min,
					'--screen-end-size': nextScreen.min,
					...fontProperties,
				},
				html: {
					'line-height': 'var(--screen-line-height)',
					'font-size':
						'clamp(var(--screen-min-font-size), var(--screen-scalar-font-size, var(--screen-min-font-size)), var(--screen-max-font-size))',
				},
			}
		} else if (key === 'end') {
			return {
				[`@media (min-width: ${prevScreen.max}) and (max-width: ${screen.max})`]:
					{
						':root': {
							'--screen-start-size': prevScreen.max,
							'--screen-end-size': screen.max,
							...fontProperties,
						},
					},
			}
		} else {
			return {
				[`@media (min-width: ${screen.min})`]: {
					':root': {
						'--screen-start-size': screen.min,
						'--screen-end-size': nextScreen.min,
						...fontProperties,
					},
				},
			}
		}
	})

	addComponents([...screenStyles])
}
