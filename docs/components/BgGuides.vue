<template>
  <div class="guides">
    <div class="guides-container">
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
      <div class="guide"></div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="postcss">
  .guides {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 var(--columnPaddingNormal);
    pointer-events: none;
  }

  .guides-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: var(--containerWidth, 100%);
    height: 100%;
    margin-right: calc(var(--containerMargin) - var(--scrollbarWidth));
    margin-left: var(--containerMargin);
  }

  .guide {
    width: 1px;
    background: rgba(33, 43, 44, 0.03);

    &:nth-of-type(2n),
    &:nth-of-type(3n) {
      display: none;
    }
  }

  @screen sm {
    .guide {
      &:nth-of-type(3n) {
        display: block;
      }
    }
  }

  @screen md {
    .guide {
      &:nth-of-type(2n),
      &:nth-of-type(3n) {
        display: block;
      }
    }
  }
</style>
