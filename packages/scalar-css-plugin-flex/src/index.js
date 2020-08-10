import postcss from 'postcss'

const flexShorthand = {
  initial: '0 1 auto',
  '1': '1 1 0%',
  auto: '1 1 auto',
  none: 'none'
}

const flexDirection = {
  row: 'row',
  column: 'column',
  'row-reverse': 'row-reverse',
  'column-reverse': 'column-reverse'
}

const flexWrap = {
  wrap: 'wrap',
  nowrap: 'nowrap',
  'wrap-reverse': 'wrap-reverse'
}

const justify = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly'
}

const alignItems = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch'
}

const alignContent = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch'
}

const alignSelf = {
  auto: 'auto',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch'
}

export function createBaseFlexRule() {
  return postcss
    .rule({ selector: '[class*="flex-"]' })
    .append({ prop: 'flex', value: 'var(--flex) !important' })
    .append({ prop: 'flex-direction', value: 'var(--flex-dir)' })
    .append({ prop: 'flex-wrap', value: 'var(--flex-wrap)' })
}

export function createBaseJustifyContentRule() {
  return postcss
    .rule({ selector: '[class*="justify-"]' })
    .append({ prop: 'justify-content', value: 'var(--justify)' })
}

export function createBaseAlignRule() {
  return postcss
    .rule({ selector: '[class*="align-"]' })
    .append({ prop: 'align-items', value: 'var(--align-items)' })
    .append({ prop: 'align-content', value: 'var(--align-content)' })
    .append({ prop: 'align-self', value: 'var(--align-self)' })
}

export function createUtilityClasses(screen, prefix, varName, valuesObject) {
  const { key, htmlRoot } = screen

  Object.entries(valuesObject).forEach(([suffix, value]) => {
    const selector =
      key === 'start' ? `.${prefix}-${suffix}` : `.${key}-${prefix}-${suffix}`
    htmlRoot.append(postcss.rule({ selector }).append({ prop: varName, value }))
  })
}

export default function flex(ctx, options, source) {
  ctx.theme.screens.forEach(screen => {
    if (screen.key === 'start') {
      screen.htmlRoot.append(createBaseFlexRule())
      screen.htmlRoot.append(createBaseJustifyContentRule())
      screen.htmlRoot.append(createBaseAlignRule())
    }

    createUtilityClasses(screen, 'flex', '--flex', flexShorthand)
    createUtilityClasses(screen, 'flex', '--flex-dir', flexDirection)
    createUtilityClasses(screen, 'flex', '--flex-wrap', flexWrap)
    createUtilityClasses(screen, 'justify', '--justify', justify)
    createUtilityClasses(screen, 'align-items', '--align-items', alignItems)
    createUtilityClasses(
      screen,
      'align-content',
      '--align-content',
      alignContent
    )
    createUtilityClasses(screen, 'align-self', '--align-self', alignSelf)
  })
}
