export default {
  components: true,

  modules: ['@nuxt/content', 'nuxt-webfontloader'],

  css: ['~/scalar.pcss'],

  webfontloader: {
    google: {
      families: ['Roboto+Slab:wght@660&display=swap']
    }
  },

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
