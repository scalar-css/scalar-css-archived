<template>
  <header class="header">
    <div class="header-bg" :class="{ 'header-bg--show': isScrolled }">
      <header-bg class="w-full" />
    </div>
    <div class="header-content">
      <div class="container">
        <div class="d-flex justify-between align-center px-ru md-px-su">
          <div>
            <nuxt-link
              to="/"
              class="d-block"
              style="width: calc(var(--baselineUnit) * 3);"
            >
              <scalar-brand />
            </nuxt-link>
          </div>
          <nav>
            <ul class="autocols gap-su">
              <li>
                <a href="https://discord.gg/gUAQA8U" rel="noreferrer nofollow">
                  <base-icon size="1" unit="baseline" name="discord" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/scalar_css" rel="noreferrer">
                  <base-icon size="1" unit="baseline" name="twitter" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/scalar-css/scalar-css/"
                  rel="noreferrer"
                >
                  <base-icon size="1" unit="baseline" name="github" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import HeaderBg from '@/assets/header-bg.svg'
  import ScalarBrand from '@/assets/scalar-brand.svg'

  // import Hamburger from './Hamburger'
  // import RhythmToggle from './RhythmToggle'

  export default {
    components: {
      ScalarBrand,
      HeaderBg
      // Hamburger,
      // RhythmToggle
    },
    data() {
      return {
        isScrolled: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.showName)
    },
    methods: {
      showName(e) {
        this.isScrolled = !(window.scrollY < 45)
      }
    }
  }
</script>

<style lang="postcss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--baselineUnit) * 3);
    z-index: 5;
  }

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
    border-bottom: thin solid #175255;
    box-shadow: 0px 5px 17px rgba(0, 0, 0, 0.25);

    &--show {
      opacity: 1;
    }
  }

  .header-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>
