<template>
  <div>
    <h3 class="type-tagline">{{ tagline }}</h3>
    <h2 class="type-3">{{ title }}</h2>
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
      }
    }
  }
</script>
