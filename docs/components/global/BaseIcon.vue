<template>
  <Component
    :is="require(`@/assets/icons/icon-${name}.svg`)"
    class="icon"
    v-bind="$attrs"
  />
</template>

<script>
  export default {
    // Transparent wrapper component
    // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
    inheritAttrs: false,

    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
  .icon {
    /* Add some default CSS declaration blocks */
  }
</style>
