<template>
  <div class="rowLayout gap-ru">
    <h3 class="type-tagline color-accent-2">{{ tagline }}</h3>
    <h2 class="type-sectionTitle" :class="titleColor">{{ title }}</h2>
  </div>
</template>

<script>
  export default {
    props: {
      tagline: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        default: 'light'
      }
    },
    computed: {
      titleColor() {
        return this.theme === 'light' ? 'color-primary-2' : 'color-primary-4'
      }
    }
  }
</script>

<style lang="pcss">
  .type-tagline {
    font-weight: 400;
  }
</style>
