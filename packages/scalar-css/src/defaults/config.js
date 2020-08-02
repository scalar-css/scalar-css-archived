export default {
  options: {},
  theme: {
    fonts: {
      // body, header, code, body-and-header, all
      all: {
        key: '',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        fontStack: 'helvetica',
        capHeight: 0.5
      }
    },
    screens: [
      {
        key: 'start',
        fontScaleId: 'minorThird',
        breakpointStartPx: 320,
        baseFontSizePx: 16,
        baseLineHeight: 1.5
      },
      {
        key: 'sm',
        breakpointStartPx: 576
      },
      {
        key: 'md',
        breakpointStartPx: 768,
        baseFontSizePx: 16,
        baseLineHeight: 1.5
      },
      {
        key: 'lg',
        breakpointStartPx: 992,
        fontScaleId: 'perfectFourth'
      },
      {
        key: 'xl',
        breakpointStartPx: 1200,
        baseFontSizePx: 20,
        baseLineHeight: 1.5
      },
      {
        key: 'end',
        breakpointStartPx: 1440
      }
    ]
  }
}
