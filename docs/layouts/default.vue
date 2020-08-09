<template>
  <div>
    <s-header />
    <main>
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
