<template>
  <div class="icon"><component :is="icon" /></div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
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
    height: calc(var(--scalarUnit) * 2);

    svg {
      max-height: 100%;
    }
  }
</style>
