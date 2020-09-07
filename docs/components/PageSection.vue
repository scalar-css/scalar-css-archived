<template>
  <section class="section" :style="sectionStyles">
    <section-bg :bg="bgFill" :bg-top-position="padding">
      <template v-if="!!$slots.top" #top><slot name="top" /></template>
      <template v-if="!!$slots.bottom" #bottom><slot name="bottom" /></template>
    </section-bg>
    <div class="layout" :style="layoutStyles">
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
      },
      padding: {
        type: String,
        default: ''
      },
      pull: {
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
      },
      layoutStyles() {
        if (this.padding.includes(' ')) {
          const values = this.padding.split(' ')
          return {
            '--layoutPaddingTop': `calc(var(--baselineUnit) * ${values[0].replace(
              'bl',
              ''
            )})`,
            '--layoutPaddingBottom': `calc(var(--baselineUnit) * ${values[1].replace(
              'bl',
              ''
            )})`
          }
        }
        return {
          '--layoutPadding': `calc(var(--baselineUnit) * ${this.padding.replace(
            'bl',
            ''
          )})`
        }
      },
      sectionStyles() {
        if (this.pull !== '') {
          return {
            '--sectionPull': `calc(var(--baselineUnit) * ${this.pull.replace(
              'bl',
              ''
            )})`
          }
        }
        return null
      }
    }
  }
</script>

<style>
  .section {
    --sectionPull: 0;

    position: relative;
    z-index: 1;
    margin-bottom: calc(-1 * var(--sectionPull));
  }

  .layout {
    --layoutPaddingTop: var(--layoutPadding);
    --layoutPaddingBottom: var(--layoutPadding);
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--layoutPaddingTop) 0 var(--layoutPaddingBottom);
  }

  .container {
    width: var(--containerWidth, 100%);
    margin-left: var(--containerMargin);
    margin-right: calc(var(--containerMargin) - var(--scrollbarWidth));
  }
</style>
