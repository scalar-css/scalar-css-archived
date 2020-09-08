module.exports = {
  preset: 'default',
  options: {
    debug: {
      baseLineColor: 'rgba(245, 167, 66, 0.2)',
      rhythmColor: 'rgba(245, 167, 66, 0.1)'
    }
  },
  theme: {
    fonts: {
      sans: {
        fontFamily: 'system',
        elements: 'body'
      },
      work: {
        fontFamily: '"Work Sans", Helvetica Neue, Helvetica, Arial, sans-serif',
        ligatures: 'normal',
        weight: 700,
        elements: ['h1', 'h2', 'h3', 'h4', 'h5']
      },
      mono: {
        fontFamily: 'monospace',
        elements: 'mono'
      }
    },
    typography: {
      '-2': {
        scaleStep: -2,
        lineHeight: 1.4
      },
      '-1': {
        scaleStep: -1
      },
      '0': {
        scaleStep: 0,
        elements: ['p', 'h5'],
        marginBottom: '1bl'
      },
      '1': {
        scaleStep: 1,
        lineHeight: 1.4,
        elements: ['h4']
      },
      '2': {
        scaleStep: 2,
        elements: ['h3']
      },
      '3': {
        scaleStep: 3,
        elements: ['h2'],
        lineHeight: 1.2,
        marginBottom: '1bl'
      },
      tagline: {
        scaleStep: 0,
        lineHeight: 1.2
      },
      sectionTitle: {
        scaleStep: 2,
        lineHeight: 1.2
      },
      lead: {
        scaleStep: 1,
        lineHeight: 1.68792198
      },
      pageTitle: {
        scaleStep: 4,
        lineHeight: 1.2,
        marginBottom: '1bl'
      }
    },
    screens: [
      {
        key: 'start',
        fontScaleId: 'majorSecond',
        breakpointStartPx: 320,
        baseFontSizePx: 16,
        baseLineHeight: 1.5,
        verticalRhythm: 0.5,
        container: {
          padding: '2vr'
        }
      },
      {
        key: 'sm',
        breakpointStartPx: 576,
        container: {
          maxWidth: 540
        }
      },
      {
        key: 'md',
        breakpointStartPx: 768,
        fontScaleId: 'majorThird'
        // fontScale: 1.3
      },
      {
        key: 'lg',
        breakpointStartPx: 992
      },
      {
        key: 'xl',
        breakpointStartPx: 1200,
        baseFontSizePx: 18
      },
      {
        key: '2xl',
        breakpointStartPx: 1440,
        fontScaleId: 'perfectFourth',
        baseFontSizePx: 20
      },
      {
        key: 'end',
        breakpointStartPx: 1920
      }
    ]
  }
}
