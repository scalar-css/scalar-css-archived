<template>
  <div>
    <s-header />
    <main class="pt-6 lg-pt-10">
      <nuxt />
    </main>
  </div>
</template>

<script>
  import SHeader from '~/components/SHeader.vue'

  export default {
    components: {
      SHeader
    }
  }
</script>

<style lang="postcss"></style>
