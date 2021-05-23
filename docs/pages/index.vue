<template>
  <div>
    <page-section bg="primary-1">
      <template #top>
        <home-hero-top />
      </template>
      <div class="columnLayout" data-columns="3,1">
        <div class="px-ru md-px-su">
          <h1
            class="type-pageTitle color-neutral-7 text-semi text-max-width"
            style="--mdTextMaxWidth: 30rem"
          >
            Reclaim the
            <span class="color-accent-2">mathematical harmony</span> of your web
            designs
          </h1>
          <p
            class="type-lead color-neutral-7 text-max-width"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 30rem;
              --lgTextMaxWidth: 41rem;
              --xxlTextMaxWidth: 45rem;
            "
          >
            Scalar is a first-of-its-kind CSS framework for helping you quickly
            build visually rich, mathematically beautiful, completely custom
            layouts that maintain their integrity across every device and
            breakpoint.
          </p>
        </div>
      </div>
      <template #bottom>
        <home-hero-bottom />
      </template>
    </page-section>

    <page-section bg="white">
      <template #top>
        <top-two />
      </template>

      <div class="rowLayout gap-su2">
        <div class="columnLayout" data-columns="2,1,1">
          <div class="rowLayout">
            <section-title
              class="px-ru md-px-su"
              tagline="Complete Customization, No Overrides"
              title="Build quickly with utility-first CSS"
            />
            <p
              class="px-ru md-px-su text-max-width"
              style="
                --textMaxWidth: 14rem;
                --smTextMaxWidth: none;
                --lgTextMaxWidth: 29rem;
                --xxlTextMaxWidth: 32rem;
              "
            >
              Following in the tradition of other highly-customizable CSS
              utility frameworks like Tailwind, Scalar generates a low-level,
              class-based API that helps you rapidly build unique layouts
              without forcing you to override base styles.
            </p>
          </div>
          <div class="d-flex align-end h-full">
            <p
              class="color-neutral-4 px-ru md-px-su -type-1 text-max-width"
              style="
                --textMaxWidth: 13.8rem;
                --smTextMaxWidth: none;
                --lgTextMaxWidth: 14rem;
                --xxlTextMaxWidth: 13.25rem;
              "
            >
              <em>Psst! Try resizing your browser to see Scalar in action.</em>
            </p>
          </div>

          <div>
            <mobile-phone />
          </div>
        </div>
        <div class="columnLayout" data-columns="1,1,1,1">
          <icon-block
            class="px-ru md-px-su"
            icon="waveform"
            title="Responsive, yet precise"
            style="
              --textMaxWidth: 13rem;
              --mdTextMaxWidth: 16.8rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            Scalar takes advantage of the latest CSS functionality and a
            pioneering approach to CSS to keep your design consistent, no matter
            the viewport.
          </icon-block>
          <icon-block
            class="px-ru md-px-su"
            icon="typography"
            title="Rich Typography"
            style="
              --textMaxWidth: 13rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.1rem;
              --xxlTextMaxWidth: 13.5rem;
            "
          >
            Modify font properties, vertical rhythm, margins, line heights, and
            modular scales at any breakpoint to get the right type styling for
            each screen.
          </icon-block>
          <icon-block
            class="px-ru md-px-su"
            icon="modular"
            title="Modular"
            style="
              --textMaxWidth: 13rem;
              --mdTextMaxWidth: 18.8rem;
              --lgTextMaxWidth: 12.5rem;
              --xxlTextMaxWidth: 13.5rem;
            "
          >
            Scalar’s composable plugins and configs allows you to opt-in, out,
            or even build your own, to ensure you have 100% control over your
            final CSS.
          </icon-block>
          <icon-block
            class="px-ru md-px-su"
            icon="accessible"
            title="Accessible"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
              --xxlTextMaxWidth: 13.5rem;
            "
          >
            Many existing “fluid” font techniques inhibit accessibility. Scalar
            works without breaking accessibility and doesn’t use obscure calc
            values.
          </icon-block>
        </div>
      </div>
    </page-section>

    <!-- <page-section bg="light">
      <template #top>
        <top-three />
      </template>
      <div class="rowLayout gap-su2">
        <section-title
          class="px-ru md-px-su"
          tagline="Support Scalar's Development"
          title="How can you help?"
        />
        <div class="columnLayout" data-columns="2,2">
          <div>
            <p
              class="px-ru md-px-su text-max-width"
              style="
                --textMaxWidth: 13.75rem;
                --smTextMaxWidth: none;
                --lgTextMaxWidth: 28rem;
                --xxlTextMaxWidth: 32rem;
              "
            >
              If you love the ideas behind Scalar and the potential it unveils,
              please consider sponsoring or contributing to its development to
              ensure beautiful, accessible&nbsp;typography and grids for all.
            </p>
          </div>
          <div>
            <p
              class="color-neutral-4 px-ru md-pl-su text-max-width"
              style="
                --textMaxWidth: 14.5rem;
                --lgTextMaxWidth: 28rem;
                --xxlTextMaxWidth: 32rem;
              "
            >
              Scalar CSS is an MIT-licensed, open source project. It grows
              thanks to the sponsors and it's contributors. Please consider
              doing what you can to support the project.
            </p>
          </div>
        </div>

        <div class="columnLayout" data-columns="1,1,1,1">
          <icon-block
            class="px-ru md-px-su"
            icon="discord-colored"
            title="Scalar Discord"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            Come chat Scalar, design theory and web development in our
            <a
              href="https://discord.gg/gUAQA8U"
              target="_blank"
              rel="noreferrer nofollow"
              >Discord</a
            >.
          </icon-block>
          <icon-block
            class="px-ru md-px-su"
            icon="github-colored"
            title="Github"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            File issues, make pull requests, and ask questions in our
            <a
              href="github.com/scalar-css/scalar-css"
              target="_blank"
              rel="noreferrer"
              >Github</a
            >.
          </icon-block>
          <icon-block
            class="px-ru md-px-su"
            icon="store"
            title="Scalar swag"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            Grab yourself some beautiful swag in our
            <a
              href="https://scalar.threadless.com"
              target="_blank"
              rel="noreferrer nofollow"
              >Scalar merch store</a
            >.
          </icon-block>
          <icon-block
            class="px-ru md-px-su"
            icon="donate"
            title="Donations"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            Use
            <a
              href="https://paypal.me/k3th3r"
              target="_blank"
              rel="noreferrer nofollow"
              >PayPal</a
            >
            to send a one-time, non-recurring donation.
          </icon-block>
        </div>
      </div>
    </page-section> -->

    <!-- <page-section
      bg="primary-1"
      style="--sectionPull: calc(var(--baselineUnit) * 6);"
    >
      <template #top>
        <top-four />
      </template>
      <div class="columnLayout" data-columns="2,2">
        <div>
          <div class="rowLayout">
            <section-title
              class="px-ru md-px-su"
              tagline="Experimental Usage"
              title="Get started using Scalar CSS"
              theme="dark"
            />
            <div>
              <p
                class="color-neutral-7 px-ru md-px-su text-max-width"
                style="--mdTextMaxWidth: 40rem; --lgTextMaxWidth: 29rem;"
              >
                Scalar CSS is currently very much in active development and
                experimentation so the API and usage is changing frequently.
                <strong
                  ><em
                    >You should not be using it in production yet.</em
                  ></strong
                >
              </p>
            </div>
          </div>
        </div>
        <div>
          <div class="rowLayout"></div>
        </div>
      </div>
      <template #bottom>
        <bottom-four />
      </template>
    </page-section> -->
  </div>
</template>

<script>
import HomeHeroBottom from '@/assets/home-bg-bottom.svg'
import HomeHeroTop from '@/assets/home-bg-top.svg'
import BottomFour from '@/assets/section-four-bottom.svg'
import TopFour from '@/assets/section-four-top.svg'
import TopThree from '@/assets/section-three-top.svg'
import TopTwo from '@/assets/section-two-top.svg'
import IconBlock from '@/components/IconBlock'
import MobilePhone from '@/components/MobilePhone'
import PageSection from '@/components/PageSection.vue'
import SectionTitle from '@/components/SectionTitle'

export default {
  components: {
    PageSection,
    HomeHeroTop,
    HomeHeroBottom,
    MobilePhone,
    TopTwo,
    TopThree,
    TopFour,
    BottomFour,
    IconBlock,
    SectionTitle,
  },
}
</script>
