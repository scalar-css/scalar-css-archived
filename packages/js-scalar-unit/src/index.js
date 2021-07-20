function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}

export const jsScalarUnit = {
  init: function () {
    const root = getComputedStyle(document.documentElement)

    function scalarCalculator() {
      const start = parseInt(root.getPropertyValue('--screenStartSize'))
      const end = parseInt(root.getPropertyValue('--screenEndSize'))

      if (window.innerWidth < end) {
        const min = parseInt(
          root.getPropertyValue('--screenMinFontSize').trim().replace('%', ''),
        )
        document.documentElement.style.setProperty(
          '--screenScalarFontSize',
          `${min / (start / window.innerWidth)}%`,
        )
      }

      document.documentElement.style.setProperty(
        '--scrollbarWidth',
        `${getScrollbarWidth()}px`,
      )

      document.documentElement.style.setProperty(
        '--windowWidth',
        `${window.innerWidth - getScrollbarWidth()}px`,
      )
    }

    scalarCalculator()

    window.addEventListener('resize', scalarCalculator)
  },
}
