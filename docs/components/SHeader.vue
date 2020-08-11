<template>
  <header class="pos-fixed bg-white w-full z-40 h-6 border-bottom lg-h-9">
    <nav class="container h-full">
      <div class="d-flex align-items-center justify-between h-full">
        <a href="/" class="d-inline-block w-50 color-black">
          <scalar-brand />
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
  import ScalarBrand from '~/assets/scalar-brand-v3.svg'
  import Hamburger from './Hamburger'
  import RhythmToggle from './RhythmToggle'

  export default {
    components: {
      ScalarBrand,
      Hamburger,
      RhythmToggle
    }
  }
</script>

<style lang="postcss"></style>
