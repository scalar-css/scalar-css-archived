<template>
  <nav class="container">
    <div class="d-flex mx-auto xl-mx-6">
      <a href="/" class="d-block">
        <scalar-brand />
      </a>
      <div class="d-flex flex-grow">
        Bloop
      </div>
    </div>
  </nav>
</template>

<script>
  import ScalarBrand from '~/assets/scalar-brand.svg'

  export default {
    components: {
      ScalarBrand
    }
  }
</script>

<style lang="postcss"></style>
