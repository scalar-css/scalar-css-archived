export default {
  components: true,

  modules: ['@nuxt/content', 'nuxt-webfontloader'],

  css: ['~/styles/scalar.pcss'],

  webfontloader: {
    google: {
      families: ['Roboto+Slab:wght@660&display=swap']
    }
  },

  generate: {
    fallback: '404.html', // for Netlify
    routes: ['/'] // give the first url to start crawling
  },

  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-simple-vars': {},
        'postcss-preset-env': {},
        'postcss-nested': {},
        '@scalar-css/scalar-css': {}
      },
      preset: {
        stage: 0
      }
    },

    extend(config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader']
      })
    }
  }
}
