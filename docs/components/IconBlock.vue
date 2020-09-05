<template>
  <div>
    <base-icon :name="icon" />
    <h4 class="-type-2 color-accent text-uppercase">{{ title }}</h4>
    <p><slot /></p>
  </div>
</template>

<script>
  import BaseIcon from '@/components/global/BaseIcon.vue'

  export default {
    components: {
      BaseIcon
    },
    props: {
      icon: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="postcss"></style>
