<template>
  <section class="section">
    <section-bg :bg="bgFill">
      <template v-if="!!$slots.top" #top><slot name="top" /></template>
      <template v-if="!!$slots.bottom" #bottom><slot name="bottom" /></template>
    </section-bg>
    <div class="layout">
      <div class="container">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
  import SectionBg from './SectionBg'

  export default {
    components: {
      SectionBg
    },
    props: {
      bg: {
        type: String,
        default: ''
      }
    },
    computed: {
      bgFill() {
        if (this.bg !== '') {
          return `bg-${this.bg}`
        }
        return null
      }
    }
  }
</script>

<style>
  .section {
    --sectionPull: calc(var(--baselineUnit) * 5);

    position: relative;
    z-index: 1;
    margin-bottom: calc(-1 * var(--sectionPull));

    &--footer {
      --sectionPull: 0;
      .layout {
        --layoutPaddingTop: calc(var(--baselineUnit) * 4);
        --layoutPaddingBottom: calc(var(--baselineUnit) * 2);
      }
    }
  }

  .layout {
    --layoutPaddingTop: calc(var(--baselineUnit) * 3);
    --layoutPaddingBottom: calc(var(--baselineUnit) * 7);
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--layoutPaddingTop) 0 var(--layoutPaddingBottom);
  }

  .container {
    width: var(--containerWidth, 100%);
    margin-right: calc(var(--containerMargin) - var(--scrollbarWidth));
    margin-left: var(--containerMargin);
  }

  @screen sm {
    .layout {
      --layoutPaddingTop: calc(var(--baselineUnit) * 4);
    }
  }
</style>
