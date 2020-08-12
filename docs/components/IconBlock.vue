<template>
  <div>
    <div class="d-flex justify-between align-items-center">
      <h3 class="type-1 color-accent-2">{{ title }}</h3>
      <expand-arrows
        v-if="icon === 'fluid'"
        class="icon h-3 w-3 color-accent-2"
      />
      <font-case
        v-else-if="icon === 'type'"
        class="icon h-3 w-3 color-accent-2"
      />
    </div>
    <slot />
  </div>
</template>

<script>
  import ExpandArrows from '~/assets/icons/expand-arrows.svg'
  import FontCase from '~/assets/icons/font-case.svg'

  export default {
    components: {
      ExpandArrows,
      FontCase
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
