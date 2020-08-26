const debounce = (callback, wait) => {
  let timeout = null
  return (...args) => {
    const next = () => callback(...args)
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)
  }
}

export default {
  init: function () {
    const root = getComputedStyle(document.documentElement)

    function scalarCalculator() {
      const start = root
        .getPropertyValue('--screenStartSize')
        .trim()
        .replace('px', '')
      const min = root
        .getPropertyValue('--screenMinFontSize')
        .trim()
        .replace('%', '')
      document.documentElement.style.setProperty(
        '--screenScalarFontSize',
        `${min / (start / window.innerWidth)}%`
      )
    }

    scalarCalculator()

    window.addEventListener('resize', debounce(scalarCalculator, 100))
  }
}
