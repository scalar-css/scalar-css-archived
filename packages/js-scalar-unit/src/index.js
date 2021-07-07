function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}

export const jsScalarUnit = {
  init: function () {
    const root = getComputedStyle(document.documentElement)

    function scalarCalculator() {
      const start = root.getPropertyValue('--screen-start-size').trim()
      const end = root.getPropertyValue('--screen-end-size').trim()

      if (window.innerWidth < end) {
        const min = root
          .getPropertyValue('--screen-min-font-size')
          .trim()
          .replace('%', '')
        document.documentElement.style.setProperty(
          '--screen-scalar-font-size',
          `${min / (start / window.innerWidth)}%`,
        )
      }

      document.documentElement.style.setProperty(
        '--scrollbar-width',
        `${getScrollbarWidth()}px`,
      )

      document.documentElement.style.setProperty(
        '--window-width',
        `${window.innerWidth - getScrollbarWidth()}px`,
      )
    }

    scalarCalculator()

    window.addEventListener('resize', scalarCalculator)
  },
}
