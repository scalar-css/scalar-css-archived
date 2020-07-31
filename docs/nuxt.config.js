import scalar from '@scalar-css/scalar-css'

export default {
  components: true,
  modules: ['@nuxt/content'],
  build: {
    postcss: {
      plugins: [
        // require('stylelint')(),
        // require('postcss-import')(),
        // require('postcss-simple-vars')(),
        // require('postcss-preset-env')(),
        // require('postcss-nested')(),
        scalar()
        // require('postcss-rem')()
      ],
      preset: {
        stage: 0
      }
    }
  }
}
