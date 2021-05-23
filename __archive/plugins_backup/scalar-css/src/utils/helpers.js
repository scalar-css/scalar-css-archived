/**
 * Merge a `source` object to a `target` recursively.
 *
 * @see https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
 *
 * @param {Object} target
 * @param {Object} source
 */
export function merge(target, source) {
  const isObject = (obj) => obj && typeof obj === 'object'

  Object.keys(source).forEach((key) => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = merge(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}
