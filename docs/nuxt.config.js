export default {
  components: true,
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
