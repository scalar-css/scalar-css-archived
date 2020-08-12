<template>
  <header class="pos-fixed bg-white w-full z-40 h-6 border-bottom">
    <nav class="container h-full">
      <div class="d-flex align-items-center justify-between h-full">
        <a href="/" class="d-inline-block w-30 md-w-20 lg-w-10">
          <scalar-brand class="color-primary-2" />
        </a>
        <rhythm-toggle />
        <div class="d-flex flex-grow">
          <hamburger class="lg-d-none" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import ScalarBrand from '~/assets/scalar-brand-v3.svg'
  import TwitterLogo from '~/assets/icons/twitter-square.svg'
  import GithubLogo from '~/assets/icons/github-square.svg'
  import Hamburger from './Hamburger'
  import RhythmToggle from './RhythmToggle'

  export default {
    components: {
      TwitterLogo,
      GithubLogo,
      ScalarBrand,
      Hamburger,
      RhythmToggle
    }
  }
</script>

<style lang="postcss"></style>
