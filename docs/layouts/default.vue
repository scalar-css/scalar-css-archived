<template>
  <div>
    <page-header />
    <main>
      <nuxt />
    </main>
    <page-footer />
  </div>
</template>

<script>
  import scalarCalc from '@scalar-css/js-property-calculator'

  import PageFooter from '~/components/PageFooter.vue'
  import PageHeader from '~/components/PageHeader.vue'

  export default {
    components: {
      PageHeader,
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
