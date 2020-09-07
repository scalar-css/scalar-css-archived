<template>
  <div>
    <!-- <s-header /> -->
    <main>
      <nuxt />
    </main>
    <page-footer />
  </div>
</template>

<script>
  import scalarCalc from '@scalar-css/js-property-calculator'

  import PageFooter from '~/components/PageFooter.vue'
  // import SHeader from '~/components/SHeader.vue'

  export default {
    components: {
      // SHeader
      PageFooter
    },
    middleware: ['sidebar'],
    mounted() {
      scalarCalc.init()
    }
  }
</script>

<style lang="postcss">
  @import '~/styles/scalar.pcss';
</style>
