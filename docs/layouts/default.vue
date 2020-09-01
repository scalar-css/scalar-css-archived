<template>
  <div>
    <!-- <s-header /> -->
    <main class="rowLayout gap-lg">
      <div />
      <nuxt />
    </main>
    <!-- <s-footer /> -->
  </div>
</template>

<script>
  import scalarCalc from '@scalar-css/js-property-calculator'

  // import SFooter from '~/components/SFooter.vue'
  // import SHeader from '~/components/SHeader.vue'

  export default {
    components: {
      // SHeader,
      // SFooter
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
