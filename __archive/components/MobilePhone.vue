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
    box-sizing: content-box !important;
    display: inline-block;
    width: var(--phoneWidth);
    height: var(--phoneHeight);
    padding: 105px 22px;
    margin-top: calc(-1 * var(--phoneHeight));
    background: #2c2b2c;
    border-radius: 50px;
    transform-origin: bottom left;
    animation: phoneScale 5s alternate infinite ease-in-out;

    &:before {
      position: absolute;
      top: 4px;
      left: 4px;
      z-index: 1;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      content: '';
      background: #1e1e1e;
      border-radius: 46px;
    }

    .screen {
      position: relative;
      z-index: 3;
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: white;
      border-radius: 1px;
      box-shadow: 0 0 0 3px #111;
    }

    .home {
      position: absolute;
      bottom: 19px;
      left: 50%;
      z-index: 3;
      width: 68px;
      height: 68px;
      margin-left: -34px;
      border-radius: 36px;
      box-shadow: inset 0 0 0 4px #2c2b2c;
    }

    .top-bar,
    .bottom-bar {
      display: block;
      width: 100%;
      height: 3px;
      background: black;
    }

    .top-bar {
      position: absolute;
      top: 70px;
      left: 0;
    }

    .middle-bar {
      position: absolute;
      top: 0px;
      left: 90px;
      width: 3px;
      height: 4px;
      background: black;
    }

    .bottom-bar {
      position: absolute;
      bottom: 70px;
      left: 0;
    }

    .sleep {
      position: absolute;
      top: -4px;
      right: 60px;
      width: 60px;
      height: 4px;
      background: #282727;
      border-radius: 2px 2px 0px 0px;
    }

    .volume {
      position: absolute;
      top: 180px;
      left: -4px;
      z-index: 0;
      width: 4px;
      height: 27px;
      background: #282727;
      border-radius: 2px 0px 0px 2px;

      &:before {
        position: absolute;
        top: -75px;
        left: 0px;
        display: block;
        width: 4px;
        height: 35px;
        content: '';
        background: inherit;
        border-radius: 2px 0px 0px 2px;
      }

      &:after {
        position: absolute;
        bottom: -64px;
        left: 0px;
        display: block;
        width: 4px;
        height: 27px;
        content: '';
        background: inherit;
        border-radius: 2px 0px 0px 2px;
      }
    }

    .camera {
      position: absolute;
      top: 32px;
      left: 50%;
      z-index: 3;
      width: 10px;
      height: 10px;
      margin-left: -5px;
      background: #3c3d3d;
      border-radius: 5px;
    }

    .sensor {
      position: absolute;
      top: 60px;
      left: 160px;
      z-index: 3;
      width: 10px;
      height: 10px;
      margin-left: -32px;
      background: #3c3d3d;
      border-radius: 5px;
    }

    .speaker {
      position: absolute;
      top: 60px;
      left: 50%;
      z-index: 3;
      width: 64px;
      height: 10px;
      margin-left: -32px;
      background: #292728;
      border-radius: 5px;
    }
  }
</style>
