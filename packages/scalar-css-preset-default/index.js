export default {
  screens: [
    {
      key: 'start',
      fontScaleId: 'minorThird',
      breakpointStartPx: 320,
      baseFontSizePx: 16,
      verticalRhythm: 0.75,
      baseLineHeight: 1.5,
      fontIncrements: [
        { scale: -3 },
        { scale: -2, lineHeight: 1.2, marginBottom: 1 },
        { scale: -1, lineHeight: 1.4 },
        { scale: 1, lineHeight: 1.4, marginBottom: 2 },
        { scale: 2, lineHeight: 1.5, marginBottom: 2 },
        { scale: 3, lineHeight: 1.4, marginBottom: 2 },
        { scale: 4 },
        { scale: 5 }
      ],
      spacing: {
        increments: 10,
        stepType: 'rhythm' // or 'baseline'
      }
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
