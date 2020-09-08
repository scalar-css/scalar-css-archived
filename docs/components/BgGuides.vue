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

<style lang="pcss">
  .guides {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 var(--columnPaddingNormal);
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .guides-container {
    position: relative;
    display: flex;
    width: var(--containerWidth, 100%);
    margin-left: var(--containerMargin);
    margin-right: calc(var(--containerMargin) - var(--scrollbarWidth));
    justify-content: space-between;
    height: 100%;
  }

  .guide {
    width: 1px;
    background: rgba(33, 43, 44, 0.03);

    &:nth-of-type(2n),
    &:nth-of-type(3n) {
      display: none;
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
