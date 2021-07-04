const plugin = require('tailwindcss/plugin')

module.exports = function sitemode({ addUtilities }) {
  const newUtilities = {
    '.sitemode-ltr': {
      'writing-mode': 'horizontal-tb',
      direction: 'ltr',
    },
    '.sitemode-rtl': {
      'writing-mode': 'horizontal-tb',
      direction: 'rtl',
    },
    '.sitemode-vlr': {
      'writing-mode': 'vertical-lr',
    },
    '.sitemode-vrl': {
      'writing-mode': 'vertical-rl',
    },
  }

  addUtilities(newUtilities)
}
