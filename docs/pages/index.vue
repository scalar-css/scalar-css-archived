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
          layouts with typographically rich foundations.
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
          <div>
            <img src="/holder.png" />
          </div>
        </div>
      </div>
    </s-section>
    <s-section theme="dark">
      <div class="container">
        <div class="d-flex flex-direction-column flex-gap-2" id="why-scalar">
          <h6 class="type-tagline color-accent-2">
            Same same, but different
          </h6>
          <h2 class="type-3 color-neutral-7">What makes Scalar unique?</h2>
        </div>
        <div class="d-flex flex-direction-column flex-gap-2">
          <p class="type-0 color-neutral-7 lg-max-w-60">
            If you're already familiar with Tailwind, then many aspects of
            Scalar will seem familiar and intuitive. There are two major things
            that make Scalar unique:
          </p>
          <div class="lg-d-flex lg-flex-direction-row flex-gap-4">
            <div class="lg-max-w-50">
              <icon-block icon="fluid" title="Fluid Web Design">
                <p class="type-0 color-neutral-5">
                  Scalar is the first CSS framework to provide support out of
                  the box for building <em>"fluid"</em> web designs.
                </p>
                <p class="type-0 color-neutral-5">
                  Essentially, using some basic math based on the supplied
                  screen dimensions, Scalar will auto-scale your text, images
                  and other page elements between breakpoints. This ensures your
                  design (including line breaks, measure and vertical rhythm)
                  stays consistent no matter the dimensions of your visitor's
                  browser.
                </p>
                <p class="type-0 color-neutral-5">
                  And, most important of all, this is accomplished entirely
                  <em class="font-bold"
                    >without any additional JavaScript whatsoever</em
                  >.
                </p>
                <p class="type-0">
                  <a href="#" class="font-bold">Learn More »</a>
                </p>
              </icon-block>
            </div>
            <div class="lg-max-w-50">
              <icon-block icon="type" title="Rich Typography">
                <p class="type-0 color-neutral-5">
                  Scalar has been built from the ground up to properly support
                  vertical rhythm, modular scales, and
                  <a
                    href="https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    >proper baseline alignment</a
                  >.
                </p>
                <p class="type-0 color-neutral-5">
                  Scalar also gives you the ability to dynamically modify font
                  options, sizes, margins, line heights, and modular scales
                  across any breakpoint. This means that on mobile where space
                  is limited, you can use the 'majorSecond' scale, while on
                  desktop you could use the 'augmentedFourth' and bump margins
                  or line-height to take advantage of the extra space available
                  with large monitors.
                </p>
                <p class="type-0">
                  <a href="#" class="font-bold">Learn More »</a>
                </p>
              </icon-block>
            </div>
          </div>
        </div>
      </div>
    </s-section>
  </div>
</template>

<script>
  import SSection from '~/components/SSection'
  import IconBlock from '~/components/IconBlock'
  import ScrollTo from '~/components/ScrollTo'

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
