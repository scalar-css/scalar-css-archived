<template>
  <div>
    <s-header />
    <main class="pt-6 lg-pt-10">
      <nuxt />
    </main>
    <s-footer />
  </div>
</template>

<script>
  import SHeader from '~/components/SHeader.vue'
  import SFooter from '~/components/SFooter.vue'

  export default {
    components: {
      SHeader,
      SFooter
    }
  }
</script>

<style lang="postcss"></style>
