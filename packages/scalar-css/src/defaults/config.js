export default {
  options: {},
  theme: {
    fonts: {
      sans: {
        fontFamily: 'system',
        elements: 'body'
      },
      roboto: {
        fontFamily: '"Roboto Slab", serif',
        capHeight: 0.7288135593220338,
        ligatures: 'normal',
        elements: ['h1', 'h2', 'h3', 'h4', 'h5']
      },
      mono: {
        fontFamily: 'monospace',
        elements: 'mono'
      }
    },
    screens: [
      {
        key: 'start',
        fontScaleId: 'minorThird',
        breakpointStartPx: 320,
        baseFontSizePx: 16,
        baseLineHeight: 1.5,
        container: {
          padding: '1vr'
        },
        typography: {
          '-3': {
            fontId: 'sans',
            scaleStep: -3,
            lineHeight: 2,
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
            fontId: 'roboto',
            marginBottom: '2vr'
          },
          '2': {
            fontId: 'roboto',
            marginBottom: '3vr'
          },
          '3': {
            fontId: 'roboto',
            marginBottom: '4vr'
          },
          '4': {
            fontId: 'roboto',
            marginBottom: '4vr'
          },
          '5': {
            fontId: 'roboto',
            marginBottom: '6vr'
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
        baseFontSizePx: 16,
        baseLineHeight: 1.5,
        container: {
          maxWidth: 720
        }
      },
      {
        key: 'lg',
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
            fontId: 'roboto',
            lineHeight: 2,
            marginBottom: '2vr'
          },
          '2': {
            fontId: 'roboto',
            lineHeight: 2,
            marginBottom: '2vr'
          },
          '3': {
            fontId: 'roboto',
            lineHeight: 1.2,
            marginBottom: '2vr'
          },
          '4': {
            fontId: 'roboto',
            lineHeight: 1.2,
            marginBottom: '4vr'
          },
          '5': {
            fontId: 'roboto',
            lineHeight: 1.1,
            marginBottom: '6vr'
          }
        }
      },
      {
        key: 'xl',
        breakpointStartPx: 1200,
        baseFontSizePx: 20,
        baseLineHeight: 1.5,
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
