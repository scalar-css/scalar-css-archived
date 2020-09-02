<template>
  <div>
    <s-section theme="dark" image="header-image.jpg">
      <div class="container">
        <h1 class="type-title color-neutral-7 lg-max-w-60">
          Consistent type and layout for the web.
        </h1>
        <p class="type-0 color-neutral-6 lg-max-w-60">
          Scalar CSS is a first-of-its-kind framework for generating
          <strong><em>fluid web design</em></strong>
          layouts with typographically rich&nbsp;foundations.
        </p>
        <div class="d-flex justify-start pt-2 flex-gap-2">
          <a
            href="#"
            class="btn d-inline-block align-items-center px-2 py-1 bg-primary-3 color-neutral-7 font-bold"
            ><span class="type-btn">Get Started</span></a
          >
          <scroll-to
            target-id="why-scalar"
            :offset="[50, 100]"
            class="btn d-inline-block align-items-center px-2 py-1 color-neutral-7 font-bold"
          >
            <span class="type-btn">Why Scalar?</span>
          </scroll-to>
        </div>
      </div>
    </s-section>
    <s-section theme="light">
      <div class="container">
        <div class="lg-d-flex lg-flex-gap-4 align-items-start">
          <div class="lg-max-w-60">
            <div class="d-flex flex-direction-column flex-gap-2">
              <h6 class="type-tagline color-accent-2">
                Complete Customization, No Overrides
              </h6>
              <h2 class="type-3 color-primary-2">
                Build rapidly with utility-first CSS
              </h2>
            </div>
            <p class="type-0 color-neutral-3">
              Following in the tradition of other highly-customizable CSS
              utility frameworks like Tailwind, Scalar generates a low-level,
              class-based API that helps you rapidly build unique layouts
              without forcing you to override base styles.
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </s-section>
    <s-section theme="dark"> </s-section>
  </div>
</template>

<script>
  import ScrollTo from '~/components/ScrollTo'
  import SSection from '~/components/SSection'

  export default {
    components: {
      SSection,
      IconBlock,
      ScrollTo
    }
  }
</script>

<style lang="postcss">
  .btn {
    text-decoration: none;
    transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .theme-dark a {
    color: var(--color-neutral-7);
  }
</style>
