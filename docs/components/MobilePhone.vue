<template>
  <div class="px-ru md-px-su">
    <div class="phone">
      <div class="top-bar"></div>
      <div class="sleep"></div>
      <div class="volume"></div>
      <div class="camera"></div>
      <div class="sensor"></div>
      <div class="speaker"></div>
      <div class="screen">
        <!-- Content goes here -->
      </div>
      <div class="home"></div>
      <div class="bottom-bar"></div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="postcss">
  @keyframes phoneScale {
    0% {
      transform: scale(0.8);
    }
    100% {
      transfrom: scale(2);
    }
  }
  .phone {
    --phoneHeight: 50vh;
    --phoneWidth: calc(var(--phoneHeight) * 0.56338028);
    position: relative;
    display: inline-block;
    box-sizing: content-box !important;
    padding: 105px 22px;
    background: #2c2b2c;
    width: var(--phoneWidth);
    height: var(--phoneHeight);
    border-radius: 50px;
    margin-top: calc(-1 * var(--phoneHeight));
    animation: phoneScale 5s alternate infinite ease-in-out;
    transform-origin: bottom left;

    &:before {
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      position: absolute;
      top: 4px;
      content: '';
      left: 4px;
      border-radius: 46px;
      background: #1e1e1e;
      z-index: 1;
    }

    .screen {
      width: 100%;
      position: relative;
      height: 100%;
      z-index: 3;
      background: white;
      overflow: hidden;
      display: block;
      border-radius: 1px;
      box-shadow: 0 0 0 3px #111;
    }

    .home {
      border-radius: 36px;
      width: 68px;
      box-shadow: inset 0 0 0 4px #2c2b2c;
      height: 68px;
      position: absolute;
      left: 50%;
      margin-left: -34px;
      bottom: 19px;
      z-index: 3;
    }

    .top-bar,
    .bottom-bar {
      height: 3px;
      background: black;
      width: 100%;
      display: block;
    }

    .top-bar {
      top: 70px;
      position: absolute;
      left: 0;
    }

    .middle-bar {
      width: 3px;
      height: 4px;
      top: 0px;
      left: 90px;
      background: black;
      position: absolute;
    }

    .bottom-bar {
      bottom: 70px;
      position: absolute;
      left: 0;
    }

    .sleep {
      position: absolute;
      top: -4px;
      right: 60px;
      width: 60px;
      height: 4px;
      border-radius: 2px 2px 0px 0px;
      background: #282727;
    }

    .volume {
      position: absolute;
      left: -4px;
      top: 180px;
      z-index: 0;
      height: 27px;
      width: 4px;
      border-radius: 2px 0px 0px 2px;
      background: #282727;

      &:before {
        position: absolute;
        left: 0px;
        top: -75px;
        height: 35px;
        width: 4px;
        border-radius: 2px 0px 0px 2px;
        background: inherit;
        content: '';
        display: block;
      }

      &:after {
        position: absolute;
        left: 0px;
        bottom: -64px;
        height: 27px;
        width: 4px;
        border-radius: 2px 0px 0px 2px;
        background: inherit;
        content: '';
        display: block;
      }
    }

    .camera {
      background: #3c3d3d;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 32px;
      left: 50%;
      margin-left: -5px;
      border-radius: 5px;
      z-index: 3;
    }

    .sensor {
      background: #3c3d3d;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 60px;
      left: 160px;
      z-index: 3;
      margin-left: -32px;
      border-radius: 5px;
    }

    .speaker {
      background: #292728;
      width: 64px;
      height: 10px;
      position: absolute;
      top: 60px;
      left: 50%;
      margin-left: -32px;
      border-radius: 5px;
      z-index: 3;
    }
  }
</style>
