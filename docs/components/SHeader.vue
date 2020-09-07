<template>
  <header class="section h-bl3">
    <div class="section__clip">
      <div class="section__bg">
        <header-bg class="w-full" />
      </div>
      <div class="section__container h-full d-flex align-center">
        <div class="section__layout">
          <div class="px-ru">
            <div class="columnLayout justify-between align-center">
              <div>
                <nuxt-link
                  to="/"
                  class="d-block"
                  style="width: calc(var(--baselineUnit) * 3);"
                >
                  <scalar-brand />
                </nuxt-link>
              </div>
              <!-- <div>
                <div class="relative color-primary-3">
                  <input
                    type="search"
                    class="bg-primary-1 height-bl width-bl px-bl color-neutral-7"
                    style="--width: 21; --px-bl: 4;"
                  />
                  <div
                    class="absolute top-0 left-0 px-ru height-bl d-flex align-center"
                    style="--px-ru: 0.25;"
                  >
                    <icon-search class="height-rem" />
                  </div>
                </div>
              </div> -->
              <nav>
                <ul class="columnLayout gap-bl1">
                  <li>
                    <a
                      href="https://opencollective.com/scalar-css"
                      rel="noreferrer"
                    >
                      <icon-oc />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/gUAQA8U"
                      rel="noreferrer nofollow"
                    >
                      <icon-discord class="height-rem" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/scalar_css" rel="noreferrer">
                      <icon-twitter class="height-rem" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/scalar-css/scalar-css/"
                      rel="noreferrer"
                    >
                      <icon-github class="height-rem" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import HeaderBg from '~/assets/header-bg.svg'
  import IconDiscord from '~/assets/icons/icon-discord.svg'
  import IconGithub from '~/assets/icons/icon-github.svg'
  import IconSearch from '~/assets/icons/icon-search.svg'
  // import IconOC from '~/assets/icons/icon-open-collective.svg'
  import IconTwitter from '~/assets/icons/icon-twitter.svg'
  import ScalarBrand from '~/assets/scalar-brand.svg'
  // import Hamburger from './Hamburger'
  // import RhythmToggle from './RhythmToggle'

  export default {
    components: {
      ScalarBrand,
      IconDiscord,
      IconGithub,
      // IconOC,
      IconTwitter,
      IconSearch,
      HeaderBg
      // Hamburger,
      // RhythmToggle
    }
  }
</script>

<style lang="postcss"></style>
