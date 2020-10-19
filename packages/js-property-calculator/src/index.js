function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}

export default {
  init: function () {
    const root = getComputedStyle(document.documentElement)

    function scalarCalculator() {
      const start = root.getPropertyValue('--screenStartSize').trim()
      const end = root.getPropertyValue('--screenEndSize').trim()

      if (window.innerWidth < end) {
        const min = root
          .getPropertyValue('--screenMinFontSize')
          .trim()
          .replace('%', '')
        document.documentElement.style.setProperty(
          '--screenScalarFontSize',
          `${min / (start / window.innerWidth)}%`
        )
      }

      document.documentElement.style.setProperty(
        '--scrollbarWidth',
        `${getScrollbarWidth()}px`
      )

      document.documentElement.style.setProperty(
        '--windowWidth',
        `${window.innerWidth - getScrollbarWidth()}px`
      )
    }

    scalarCalculator()

    window.addEventListener('resize', scalarCalculator)
  }
}
