<template>
  <div class="absolute w-full h-full overflow-visible">
    <div class="relative w-full h-full top-0 left-0 overflow-hidden">
      <div class="absolute w-full h-full top-0 left-0 px-bl"></div>
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
