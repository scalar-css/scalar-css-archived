export default {
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
    scalarUnits: 10,
    screens: [
      {
        key: 'start',
        fontScaleId: 'majorThird',
        breakpointStartPx: 320,
        baseFontSizePx: 16,
        baseLineHeight: 1.5,
        verticalRhythm: 0.5,
        container: {
          padding: '2vr'
        },
        typography: {
          '-3': {
            fontId: 'sans',
            scaleStep: -3,
            lineHeight: 2,
            marginBottom: '2vr'
          },
          footer: {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '1vr'
          },
          toggle: {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '0'
          },
          '-2': {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '2vr'
          },
          '-1': {
            fontId: 'sans',
            scaleStep: -1,
            marginBottom: '2vr'
          },
          btn: {
            fontId: 'sans',
            scaleStep: -1,
            marginBottom: '0'
          },
          tagline: {
            fontId: 'sans',
            scaleStep: -1,
            marginBottom: '0'
          },
          iconNumber: {
            fontId: 'sans',
            scaleStep: 10,
            marginBottom: '0'
          },
          '0': {
            fontId: 'sans',
            marginBottom: '2vr'
          },
          '1': {
            fontId: 'work',
            marginBottom: '2vr'
          },
          '2': {
            fontId: 'work',
            marginBottom: '3vr'
          },
          '3': {
            fontId: 'work',
            lineHeight: 1.1,
            marginBottom: '4vr'
          },
          '4': {
            fontId: 'work',
            lineHeight: 1.2,
            marginBottom: '4vr'
          },
          '5': {
            fontId: 'work',
            marginBottom: '6vr'
          },
          title: {
            fontId: 'work',
            marginBottom: '4vr',
            scaleStep: 5,
            lineHeight: 1.1,
            letterSpacing: -0.2
          }
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
        },
        typography: {
          '-3': {
            fontId: 'sans',
            scaleStep: 'x',
            marginBottom: '2vr'
          },
          footer: {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '1vr'
          },
          toggle: {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '0'
          },
          '-2': {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '2vr'
          },
          '-1': {
            fontId: 'sans',
            scaleStep: -1,
            lineHeight: 1.3,
            marginBottom: '1vr'
          },
          btn: {
            fontId: 'sans',
            scaleStep: -1,
            marginBottom: '0'
          },
          tagline: {
            fontId: 'sans',
            scaleStep: -1,
            marginBottom: '0'
          },
          iconNumber: {
            fontId: 'sans',
            scaleStep: 10,
            marginBottom: '0'
          },
          '0': {
            fontId: 'sans',
            marginBottom: '2vr'
          },
          '1': {
            fontId: 'work',
            lineHeight: 2,
            marginBottom: '2vr'
          },
          '2': {
            fontId: 'work',
            lineHeight: 2,
            marginBottom: '2vr'
          },
          '3': {
            fontId: 'work',
            lineHeight: 1.2,
            marginBottom: '2vr'
          },
          '4': {
            fontId: 'work',
            lineHeight: 1.2,
            marginBottom: '4vr'
          },
          '5': {
            fontId: 'work',
            lineHeight: 1.1,
            marginBottom: '6vr'
          },
          title: {
            fontId: 'work',
            marginBottom: '4vr',
            scaleStep: 4,
            lineHeight: 1.1,
            letterSpacing: -0.2
          }
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
        },
        typography: {
          '-3': {
            fontId: 'sans',
            scaleStep: 'x',
            marginBottom: '2vr'
          },
          '-2': {
            fontId: 'sans',
            scaleStep: -2,
            marginBottom: '2vr'
          },
          '-1': {
            fontId: 'sans',
            scaleStep: -1,
            marginBottom: '2vr'
          },
          '0': {
            fontId: 'sans',
            marginBottom: '2vr'
          },
          '1': {
            fontId: 'work',
            lineHeight: 2,
            marginBottom: '2vr'
          },
          '2': {
            fontId: 'work',
            lineHeight: 2,
            marginBottom: '2vr'
          },
          '3': {
            fontId: 'work',
            lineHeight: 1.2,
            marginBottom: '2vr'
          },
          '4': {
            fontId: 'work',
            lineHeight: 1.2,
            marginBottom: '4vr'
          },
          '5': {
            fontId: 'work',
            lineHeight: 1.1,
            marginBottom: '6vr'
          }
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
