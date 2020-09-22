<template>
  <div
    class="icon"
    :style="{ '--iconSize': size, '--iconUnit': `var(--${unit}Unit)` }"
  >
    <component :is="icon" />
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: '2'
      },
      unit: {
        type: String,
        default: 'scalar'
      }
    },
    computed: {
      icon() {
        return () => import(`@/assets/icons/icon-${this.name}.svg`)
      }
    }
  }
</script>

<style>
  .icon {
    height: calc(var(--iconUnit) * var(--iconSize));

    svg {
      max-height: 100%;
    }
  }
</style>
