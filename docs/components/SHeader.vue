<template>
  <header class="pos-fixed w-full z-40 h-6 border-bottom lg-h-9">
    <nav class="container h-full">
      <div class="d-flex align-items-center justify-between h-full">
        <a href="/" class="d-block w-50 h-5">
          <scalar-brand />
          <!-- <scalar-bug class="w-3 md-d-none" /> -->
        </a>
        <div class="d-flex flex-grow">
          <hamburger class="lg-d-none" />
        </div>
      </div>
    </nav>
    <rhythm-toggle />
  </header>
</template>

<script>
  import ScalarBrand from '~/assets/scalar-brand.svg'
  import ScalarBug from '~/assets/scalar-brand-bug.svg'
  import Hamburger from './Hamburger'
  import RhythmToggle from './RhythmToggle'

  export default {
    components: {
      ScalarBrand,
      ScalarBug,
      Hamburger,
      RhythmToggle
    }
  }
</script>

<style lang="postcss"></style>
