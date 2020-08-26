function throttle(callback, timeFrame) {
  var lastTime = 0
  return function () {
    var now = Date.now()
    if (now - lastTime >= timeFrame) {
      callback()
      lastTime = now
    }
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

    window.addEventListener('resize', throttle(scalarCalculator, 100))
  }
}
