module.exports = function screens({ addComponents, theme }) {
  const screens = theme('screens', {})
  const screenList = Object.entries(screens)
  const screenStyles = screenList.map(([key, value], index) => {
    const boundary =
      index + 1 < screenList.length
        ? screenList[index + 1][1]
        : screenList[index - 1][1]

    if (key === 'start') {
      return {
        ':root': {
          '--screen-start-size': value.min,
          '--screen-end-size': boundary.min,
        },
      }
    } else if (key === 'end') {
      return {
        [`@media (min-width: ${boundary.min}) and (max-width: ${value.max})`]: {
          ':root': {
            '--screen-start-size': boundary.min,
            '--screen-end-size': value.max,
          },
        },
      }
    } else {
      return {
        [`@media (min-width: ${value.min})`]: {
          ':root': {
            '--screen-start-size': value.min,
            '--screen-end-size': boundary.min,
          },
        },
      }
    }
  })

  addComponents([...screenStyles])
}
