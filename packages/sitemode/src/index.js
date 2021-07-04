module.exports = function sitemode({ addUtilities }) {
  const newUtilities = {
    '.sitemode-ltr': {
      writingMode: 'horizontal-tb',
      direction: 'ltr',
    },
    '.sitemode-rtl': {
      writingMode: 'horizontal-tb',
      direction: 'rtl',
    },
    '.sitemode-vlr': {
      writingMode: 'vertical-lr',
    },
    '.sitemode-vrl': {
      writingMode: 'vertical-rl',
    },
  }

  addUtilities(newUtilities)
}
