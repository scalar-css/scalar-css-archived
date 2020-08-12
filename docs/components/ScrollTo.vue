<template>
  <a :href="`#${targetId}`" class="g-scroll-to" @click="scrollPage">
    <slot />
  </a>
</template>

<script>
  export default {
    props: {
      targetId: {
        type: String,
        required: true
      },
      isMobile: {
        type: Boolean,
        default: false
      },
      offset: {
        type: Array,
        validator: value => value.length === 2,
        default() {
          return [50, 50]
        }
      }
    },
    methods: {
      scrollPage(e) {
        e.preventDefault()
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop
        const target = document.getElementById(this.targetId)
        if (target !== null) {
          const offset = this.isMobile ? this.offset[0] : this.offset[1]
          const rect = target.getBoundingClientRect()
          window.scrollTo({
            top: scrollTop + rect.top - offset,
            behavior: 'smooth'
          })
        }
      }
    }
  }
</script>
