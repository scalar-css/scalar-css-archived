<template>
  <button
    class="toggle bg-white text-uppercase type-toggle px-2 py-1 font-bold d-flex align-center"
    :class="{
      'color-primary-4': isShowingRhythm,
      'color-neutral-5': !isShowingRhythm
    }"
    @click="toggle"
    type="button"
  >
    Toggle Rhythm
  </button>
</template>

<script>
  export default {
    data() {
      return {
        isShowingRhythm: false
      }
    },
    methods: {
      toggle() {
        this.isShowingRhythm = !this.isShowingRhythm
        document.documentElement.classList.toggle('is-showing-rhythm')
      }
    }
  }
</script>

<style lang="postcss">
  :root {
    --line-thickness: 1px;
    --baseline-color: rgba(194, 153, 112, 0.25);
    --background-baseline: repeating-linear-gradient(
      to bottom,
      var(--baseline-color),
      var(--baseline-color) 1px,
      transparent 1px,
      transparent var(--baseline-rem)
    );

    --rhythm-color: rgba(98, 128, 132, 0.15);
    --background-rhythm: repeating-linear-gradient(
      to bottom,
      var(--rhythm-color),
      var(--rhythm-color) 1px,
      transparent 1px,
      transparent var(--rhythm-rem)
    );
  }

  html {
    position: relative;
  }

  html.is-showing-rhythm::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    min-height: 100vh;
    margin-right: auto;
    margin-left: auto;
    pointer-events: none;
    content: '';
    background-image: var(--background-rhythm), var(--background-baseline);
    background-position: 0 0;
    background-size: 100%;
  }

  .toggle {
    transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
</style>
