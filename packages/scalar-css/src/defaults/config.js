export default {
  options: {
    debug: {
      baseLineColor: 'rgba(0, 0, 0, 0.2)',
      rhythmColor: 'rgba(0, 0, 0, 0.1)'
    }
  },
  theme: {
    fonts: {
      sans: {
        fontFamily: 'system',
        elements: 'body'
      },
      work: {
        fontFamily: '"Work Sans", serif',
        capHeight: 0.6779661016949152,
        ligatures: 'normal',
        weight: 700,
        elements: ['h1', 'h2', 'h3', 'h4', 'h5']
      },
      mono: {
        fontFamily: 'monospace',
        elements: 'mono'
      }
    },
    units: 5,
    screens: [
      {
        key: 'start',
        fontScaleId: 'majorThird',
        breakpointStartPx: 320,
        baseFontSizePx: 16,
        baseLineHeight: 1.5,
        verticalRhythm: 0.75,
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
        baseFontSizePx: 20,
        fontScaleId: 'perfectFourth',
        container: {
          maxWidth: 720,
          padding: '1vr'
        }
      },
      {
        key: 'lg',
        baseFontSizePx: 16,
        breakpointStartPx: 992,
        fontScaleId: 'perfectFourth',
        container: {
          padding: '0',
          maxWidth: 960,
          margin: 'auto'
        }
      },
      {
        key: 'xl',
        breakpointStartPx: 1200,
        baseFontSizePx: 20,
        container: {
          maxWidth: 1140
        }
      },
      {
        key: 'end',
        breakpointStartPx: 1440
      }
    ]
  }
}
