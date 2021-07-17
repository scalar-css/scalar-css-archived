export function createBaseStyleRule(sitemode, bodyRoot) {
  if (sitemode === 'vrl') {
    return bodyRoot.append({ prop: 'writing-mode', value: 'vertical-rl' })
  } else if (sitemode === 'vlr') {
    return bodyRoot.append({ prop: 'writing-mode', value: 'vertical-lr' })
  }

  return bodyRoot
    .append({ prop: 'writing-mode', value: 'horizontal-tb' })
    .append({ prop: 'direction', value: sitemode })
}

export default function sitemode(config) {
  const root = config.theme.screens.start.bodyRoot
  if (!config.theme.sitemode || config.theme.sitemode === 'ltr') {
    createBaseStyleRule('ltr', root)
  } else {
    createBaseStyleRule(config.theme.sitemode, root)
  }
}
