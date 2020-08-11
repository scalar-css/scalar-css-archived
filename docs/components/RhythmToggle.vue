<template>
  <button
    class="pos-fixed bottom-0 left-2 toggle bg-black px-2 py-1 rounded-top rhythm-shadow color-dull font-bold d-flex align-center md-top-0 md-bottom-auto md-rounded-top-none md-rounded-bottom md-right-5 md-left-auto"
    :class="{ 'color-primary': isShowingRhythm }"
    @click="toggle"
    type="button"
  >
    <power-icon
      class="d-inline w-2 mr-1"
      :class="{ 'color-primary': isShowingRhythm }"
    />
    Rhythm
  </button>
</template>

<script>
  import PowerIcon from '~/assets/icons/power-off.svg'

  export default {
    components: {
      PowerIcon
    },
    data() {
      return {
        isShowingRhythm: true
      }
    },
    mounted() {
      document.documentElement.classList.add('is-showing-rhythm')
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
    /* --baseline-color: rgba(255, 0, 0, 0.1); */
    --baseline-color: rgba(11, 255, 247, 0.25);
    --background-baseline: repeating-linear-gradient(
      to bottom,
      var(--baseline-color),
      var(--baseline-color) 1px,
      transparent 1px,
      transparent var(--baseline-rem)
    );
    /* Vertical Rhythm */
    --rhythm-color: rgba(150, 150, 150, 0.25);
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
    margin-right: auto;
    margin-left: auto;
    min-height: 100vh;
    content: '';
    background-image: var(--background-rhythm), var(--background-baseline);
    background-size: 100%;
    background-position: 0 0;
    /* z-index: 1000; */
    pointer-events: none;
  }

  .toggle {
    transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
</style>
