<template>
  <section class="pos-relative mb--4 lg-mb--10" :class="themeClass">
    <div class="pos-absolute w-full h-full" :class="{ 'bg-neutral-1': image }">
      <div
        :class="bgThemeClass"
        :style="imageBg"
        class="pos-relative w-full h-full top-0 left-0"
      ></div>
    </div>
    <div class="pos-relative z-1">
      <div :class="sectionPadding">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
  const themes = ['dark', 'light', 'image', 'footer']

  export default {
    props: {
      theme: {
        type: String,
        default: 'light',
        validator: theme => themes.includes(theme)
      },
      image: {
        type: String,
        required: false
      }
    },
    computed: {
      themeClass() {
        return this.image ? `theme-image` : `theme-${this.theme}`
      },
      bgThemeClass() {
        if (this.image) {
          return ''
        } else if (this.theme === 'dark') {
          return 'bg-primary-1 bg-skew overflow-hidden'
        } else if (this.theme === 'footer') {
          return 'bg-black overflow-hidden'
        }
        return 'bg-white bg-skew overflow-hidden'
      },
      sectionPadding() {
        if (this.image) {
          return 'pt-4 pb-10 lg-pbt-10'
        } else if (this.theme === 'footer') {
          return 'py-3'
        }

        return 'py-8 lg-pyt-10'
      },
      imageBg() {
        if (this.image) {
          return `background-image: url("/header-image.jpg"); background-size: cover; mix-blend-mode: overlay;`
        }

        return ''
      }
    }
  }
</script>

<style lang="postcss">
  .bg-skew {
    transform-origin: 100%;
    transform: skewY(-4deg);
  }

  .mb--4 {
    --mb: calc(var(--su-4) * -1);
  }

  @screen lg {
    .lg-mb--10 {
      --mb: calc(var(--su-10) * -1);
    }

    .lg-pbt-10 {
      --pb: calc(var(--rhythm-rem) * 15) !important;
    }

    .lg-pyt-10 {
      --py: calc(var(--rhythm-rem) * 15) !important;
    }
  }
</style>
