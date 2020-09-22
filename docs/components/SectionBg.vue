<template>
  <div class="sbg">
    <div v-if="!!$slots.top" class="sbg-top"><slot name="top" /></div>
    <div class="sbg-middle" :class="bg"></div>
    <div v-if="!!$slots.bottom" class="sbg-bottom">
      <slot name="bottom" />
    </div>
    <bg-guides />
  </div>
</template>

<script>
  import BgGuides from './BgGuides'
  export default {
    components: {
      BgGuides
    },
    props: {
      bg: {
        type: String,
        default: ''
      },
      bgTopPosition: {
        type: String,
        default: ''
      }
    },
    computed: {
      name() {
        return this.data
      }
    }
  }
</script>

<style lang="postcss">
  .sbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    overflow: hidden;
  }

  .sbg-top {
    width: 200%;
  }

  .sbg-bottom {
    width: 400%;
  }

  .sbg-middle {
    flex-grow: 1;
    margin: -2px 0;
  }

  @screen md {
    .sbg-top,
    .sbg-bottom {
      width: auto;
    }
  }
</style>
