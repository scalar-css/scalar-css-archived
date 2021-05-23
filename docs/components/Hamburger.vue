<template>
  <button
    class="hamburger hamburger--spin"
    :class="{ 'is-open': isOpen }"
    @click="toggle"
    type="button"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</template>

<script>
  export default {
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style lang="postcss">
  .hamburger {
    display: inline-block;
    padding: 1rem;
    margin: 0;
    overflow: visible;
    font: inherit;
    color: inherit;
    text-transform: none;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .hamburger:hover {
    opacity: 0.7;
  }

  .hamburger.is-open:hover {
    opacity: 0.7;
  }

  .hamburger.is-open .hamburger-inner,
  .hamburger.is-open .hamburger-inner::before,
  .hamburger.is-open .hamburger-inner::after {
    background-color: #c2c2c2;
  }

  .hamburger-box {
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }

  .hamburger-inner {
    top: 50%;
    display: block;
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    position: absolute;
    width: 1rem;
    height: 2px;
    background-color: #c2c2c2;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
  }

  .hamburger-inner::before,
  .hamburger-inner::after {
    display: block;
    content: '';
  }

  .hamburger-inner::before {
    top: -0.3rem;
  }

  .hamburger-inner::after {
    bottom: -0.3rem;
  }

  .hamburger--spin .hamburger-inner {
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    transition-duration: 0.22s;
  }

  .hamburger--spin .hamburger-inner::before {
    transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
  }

  .hamburger--spin .hamburger-inner::after {
    transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--spin.is-open .hamburger-inner {
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: rotate(225deg);
  }

  .hamburger--spin.is-open .hamburger-inner::before {
    top: 0;
    opacity: 0;
    transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
  }

  .hamburger--spin.is-open .hamburger-inner::after {
    bottom: 0;
    transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: rotate(-90deg);
  }

  @above md {
  }
</style>
