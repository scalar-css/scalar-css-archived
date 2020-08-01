export default {
  components: true,

  css: ['~/scalar.pcss'],

  modules: ['@nuxt/content'],

  build: {
    postcss: {
      plugins: {
        '@scalar-css/scalar-css': {}
      },
      preset: {
        stage: 0
      }
    }
  }
}
