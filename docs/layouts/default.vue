<template>
  <div>
    <s-header />
    <div class="section">
      <div class="section__clip">
        <div class="section__bg">
          <div class="guides">
            <div class="guides_container">
              <div class="guides_guide"></div>
              <div class="guides_guide"></div>
            </div>
          </div>
        </div>
        <div class="section__container">
          <div class="section__layout">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <!-- <s-footer /> -->
  </div>
</template>

<script>
  import scalarCalc from '@scalar-css/js-property-calculator'

  // import SFooter from '~/components/SFooter.vue'
  import SHeader from '~/components/SHeader.vue'

  export default {
    components: {
      SHeader
      // SFooter
    },
    middleware: ['sidebar'],
    mounted() {
      scalarCalc.init()
    }
  }
</script>

<style lang="postcss">
  @import '~/styles/scalar.pcss';
  .guides {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 var(--columnPaddingNormal);
    pointer-events: none;
  }

  .guides_container {
    --layoutWidth: calc(100% - calc(var(--baselineUnit2) * 2));
    display: flex;
    justify-content: space-between;
    position: relative;
    max-width: var(--layoutWidth);
    height: 100%;
    margin: 0 auto;
  }

  .guides_guide {
    width: 1px;
    background: rgba(33, 43, 44, 0.05);
  }
</style>
