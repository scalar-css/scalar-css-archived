<template>
  <div class="rowLayout gap-ru">
    <base-icon :name="icon" />
    <h4 class="-type-2 color-accent-1 text-uppercase">{{ title }}</h4>
    <p class="-type-1"><slot /></p>
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
