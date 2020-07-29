import {
  setBaseFontSizePx,
  setBaseLineHeight,
  setFontScale,
  setVerticalRhythm,
  setBreakpointEndPx,
  default as setup
} from './setup'

it('should throw errors for missing values on the start screen', () => {
  const screen = {
    key: 'start'
  }

  expect(() => {
    setBaseFontSizePx(screen, null)
  }).toThrowError(
    `Invalid config for 'start' screen. You must provide a 'baseFontSizePx' value.`
  )

  expect(() => {
    setBaseLineHeight(screen, null)
  }).toThrowError(
    `Invalid config for 'start' screen. You must provide a 'baseLineHeight' value.`
  )
})

it('should throw errors for an invalid fontScaleId value', () => {
  const screen = {
    key: 'sm',
    fontScaleId: 'bloop'
  }

  expect(() => {
    setFontScale(screen, null)
  }).toThrowError(
    `Invalid font scale settings for '${screen.key}'. You must either provide a 'modularScale' float value, or specify a 'modularScaleId' value that matches one of the default modular scales provided by Fluid CSS.`
  )
})

it('should properly set the baseFontSizePx value', () => {
  const prevScreen = {
    key: 'sm',
    baseFontSizePx: 16
  }
  const screen = {
    key: 'md',
    baseFontSizePx: 18
  }

  let actual = setBaseFontSizePx(screen, prevScreen)
  expect(actual).toBe(18)
  delete screen.baseFontSizePx
  actual = setBaseFontSizePx(screen, prevScreen)
  expect(actual).toBe(16)
})

it('should properly set the baseLineHeight value', () => {
  const prevScreen = {
    key: 'sm',
    baseLineHeight: 1.4
  }
  const screen = {
    key: 'md',
    baseLineHeight: 1.5
  }

  let actual = setBaseLineHeight(screen, prevScreen)
  expect(actual).toBe(1.5)
  delete screen.baseLineHeight
  actual = setBaseLineHeight(screen, prevScreen)
  expect(actual).toBe(1.4)
})

it('should properly set the verticalRhythm value', () => {
  const vr = {
    key: 'sm',
    verticalRhythm: 0.75
  }
  const noVR = {
    key: 'md',
    baseLineHeight: 2
  }

  let actual = setVerticalRhythm(vr)
  expect(actual).toBe(0.75)

  actual = setVerticalRhythm(noVR)
  expect(actual).toBe(1)
})

it('should properly set the breakpointEndPx value', () => {
  const screen = {
    key: 'sm',
    breakpointStartPx: 576
  }
  const nextScreen = {
    key: 'md',
    breakpointStartPx: 768
  }

  let actual = setBreakpointEndPx(screen, nextScreen)
  expect(actual).toBe(768)

  const endScreen = {
    key: 'end',
    breakpointStartPx: 1440
  }
  const endNextScreen = undefined

  actual = setBreakpointEndPx(endScreen, endNextScreen)
  expect(actual).toBe(1440)
})

it('should properly set the fontScale value', () => {
  const customFontScaleScreen = {
    key: 'sm',
    fontScale: 1.3993
  }
  const prevScreen = {
    key: 'sm',
    fontScale: 1.333
  }
  const screen = {
    key: 'md',
    fontScaleId: 'augmentedFourth'
  }

  let actual = setFontScale(customFontScaleScreen, prevScreen)
  expect(actual).toBe(1.3993)

  actual = setFontScale(screen, prevScreen)
  expect(actual).toBe(1.414)

  delete screen.fontScaleId
  actual = setFontScale(screen, prevScreen)
  expect(actual).toBe(1.333)
})

it('should properly generate the context from an empty config', () => {
  let actual = setup()

  const start = actual.screens[0]
  expect(start.baseLineHeightPx).toBe(24)
  expect(start.verticalRhythmPx).toBe(12)

  const lg = actual.screens[3]
  expect(lg.baseLineHeightPx).toBe(24)
  expect(lg.verticalRhythmPx).toBe(12)
  expect(lg.fontScaleId).toBe('perfectFourth')
  expect(lg.fontScale).toBe(1.333)
  expect(lg.breakpointEndPx).toBe(1200)

  expect(actual.currentScreen.key).toBe('start')
  expect(actual.defaultScreenKey).toBe('start')
  expect(Object.keys(actual.screensByKey).length).toBe(6)
})

it('should properly generate the context from an existing config', () => {
  const config = {
    screens: [
      {
        key: 'start',
        fontScaleId: 'minorThird',
        breakpointStartPx: 320,
        baseFontSizePx: 14,
        baseLineHeight: 1.4
      },
      {
        key: 'sm',
        breakpointStartPx: 576
      },
      {
        key: 'md',
        breakpointStartPx: 768,
        baseFontSizePx: 16,
        baseLineHeight: 1.5,
        verticalRhythm: 1
      },
      {
        key: 'end',
        breakpointStartPx: 1440
      }
    ]
  }
  let actual = setup(config)

  const start = actual.screens[0]
  expect(start.baseLineHeightPx).toBe(19.599999999999998)
  expect(start.verticalRhythmPx).toBe(9.799999999999999)

  const md = actual.screens[2]
  expect(md.baseLineHeightPx).toBe(24)
  expect(md.verticalRhythmPx).toBe(16)

  expect(actual.currentScreen.key).toBe('start')
  expect(actual.defaultScreenKey).toBe('start')
  expect(Object.keys(actual.screensByKey).length).toBe(4)
})
