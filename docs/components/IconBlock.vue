<template>
  <div class="rowLayout gap-ru">
    <base-icon :name="icon" />
    <h4 class="icon-title -type-2 color-accent-1 text-uppercase">
      {{ title }}
    </h4>
    <p class="-type-1 text-max-width"><slot /></p>
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

<style lang="postcss">
  .icon-title {
    position: relative;

    &:before {
      position: absolute;
      content: ' ';
      display: block;
      height: 1em;
      width: 1px;
      top: calc(var(--typeLineHeight) * 0.2em);
      left: calc(-1 * var(--rhythmUnit));
      background-color: var(--color-accent-2);
    }
  }

  @screen md {
    .icon-title:before {
      left: calc(-1 * var(--scalarUnit));
    }
  }
</style>
