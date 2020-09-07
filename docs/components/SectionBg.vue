<template>
  <div class="sbg">
    <div v-if="!!$slots.top" class="sbg-top"><slot name="top" /></div>
    <div class="sbg-middle" :class="bg"></div>
    <div v-if="!!$slots.bottom" class="sbg-bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
  export default {
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
  }

  .sbg-middle {
    flex-grow: 1;
  }
</style>
