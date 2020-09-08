<template>
  <div>
    <page-section bg="primary-1">
      <template #top>
        <home-hero-top />
      </template>
      <template #bottom>
        <home-hero-bottom />
      </template>
      <div class="columnLayout" data-columns="3,1">
        <div class="px-ru md-px-su">
          <h1
            class="type-pageTitle color-neutral-7 text-semi text-max-width"
            style="--mdTextMaxWidth: 30rem;"
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
            "
          >
            Scalar is a first-of-its-kind CSS framework for helping you quickly
            build visually rich, mathematically beautiful, completely custom
            layouts that maintain their integrity across every device and
            breakpoint.
          </p>
        </div>
        <div></div>
      </div>
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
              style="--mdTextMaxWidth: 40rem; --lgTextMaxWidth: 29rem;"
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
                --mdTextMaxWidth: none;
                --lgTextMaxWidth: 14rem;
              "
            >
              <em>Psst! Try resizing your browser to see Scalar in action.</em>
            </p>
          </div>
        </div>
        <div class="columnLayout gap-su2" data-columns="1,1,1,1">
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
            "
          >
            Many existing “fluid” font techniques inhibit accessibility. Scalar
            works without breaking accessibility and doesn’t use obscure calc
            values.
          </icon-block>
        </div>
      </div>
    </page-section>

    <page-section bg="light">
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
              style="--textMaxWidth: 13.75rem; --lgTextMaxWidth: 28rem;"
            >
              If you love the ideas behind Scalar and the potential it unveils,
              please consider sponsoring its development to ensure beautiful,
              accessible&nbsp;typography and grids for all.
            </p>
          </div>
          <div>
            <p
              class="color-neutral-4 px-ru md-pl-su text-max-width"
              style="--textMaxWidth: 14.5rem; --lgTextMaxWidth: 28rem;"
            >
              Scalar CSS is an MIT-licensed, open source project. It grows
              thanks to the sponsors and support by the amazing backers. Please,
              consider supporting the project.
            </p>
          </div>
        </div>

        <div class="columnLayout gap-su2" data-columns="1,1,1,1">
          <icon-block
            class="px-ru md-pl-su"
            icon="training"
            title="Video training"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            <div class="text-max-width" style="--lgTextMaxWidth: 12rem;">
              Learn Scalar from the source. Buy one of the
              <a
                href="https://learn.scalar.com"
                target="_blank"
                rel="noreferrer nofollow"
                >video trainings</a
              >.
            </div>
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
            icon="oc-colored"
            title="Open Collective"
            style="
              --textMaxWidth: 14rem;
              --mdTextMaxWidth: 19rem;
              --lgTextMaxWidth: 12.5rem;
            "
          >
            Become a backer or sponsor on
            <a
              href="https://www.opencollective.com/scalar-css"
              target="_blank"
              rel="noreferrer nofollow"
              >Open Collective</a
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
    </page-section>

    <page-section bg="primary-1">
      <template #top>
        <top-four />
      </template>
      <div class="columnLayout" data-columns="2,1,1">
        <div>
          <div class="rowLayout">
            <section-title
              class="px-ru md-px-su"
              tagline="Video Training — Coming in 2021"
              title="Learn the Scalar fundamentals"
              theme="dark"
            />
            <div>
              <p
                class="color-neutral-7 px-ru md-px-su text-max-width"
                style="--mdTextMaxWidth: 40rem; --lgTextMaxWidth: 29rem;"
              >
                Scalar and fluid web design give us an ability to design and
                build web sites in a new way that gives us greater control and
                precision over typography, layout, and copywriting.
              </p>

              <p
                class="color-neutral-7 px-ru md-px-su text-max-width"
                style="--mdTextMaxWidth: 40rem; --lgTextMaxWidth: 27rem;"
              >
                Whether you’re a designer or a developer, prepare for an
                in-depth, guided course and walk-through of all the building
                blocks and essential concepts behind fluid web design. You’ll be
                learning from the creator of Scalar himself, Kether Saturnius, a
                20 year veteran of the web industry who spent the first half of
                his career as a designer.
              </p>

              <p class="color-accent-2 px-ru md-px-su">
                <strong>Save 50% if you buy before 2021</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="px-ru md-px-su h-full">
          <training-card
            title="Scalar Design"
            image="design-fundamentals"
            :bullets="[
              'Step-by-step lesson progression',
              'Learn the most important building blocks of fluid web design',
              'Design a page layout from scratch using core fluid web design theory',
              'Get a high-level overview of recent advances in CSS layout techniques to help you understand what is possible'
            ]"
          />
        </div>
        <div class="px-ru md-px-su h-full">
          <training-card
            title="Scalar Development"
            image="developer-fundamentals"
            :bullets="[
              'Step-by-step lesson progression',
              'Learn the most important building blocks of fluid web design',
              'Build a real page layout from scratch using core fluid web design theory and the Scalar CSS framework',
              'Get a high-level overview of important design theory'
            ]"
          />
        </div>
      </div>
      <template #bottom>
        <bottom-four />
      </template>
    </page-section>
  </div>
</template>

<script>
  import HomeHeroBottom from '@/assets/home-bg-bottom.svg'
  import HomeHeroTop from '@/assets/home-bg-top.svg'
  import BottomFour from '@/assets/section-four-bottom.svg'
  import TopFour from '@/assets/section-four-top.svg'
  import TopThree from '@/assets/section-three-top.svg'
  import TopTwo from '@/assets/section-two-top.svg'
  import PageSection from '@/components/PageSection.vue'
  import IconBlock from '~/components/IconBlock'
  import SectionTitle from '~/components/SectionTitle'
  import TrainingCard from '~/components/TrainingCard'

  export default {
    components: {
      PageSection,
      HomeHeroTop,
      HomeHeroBottom,
      TopTwo,
      TopThree,
      TopFour,
      BottomFour,
      IconBlock,
      SectionTitle,
      TrainingCard
    }
  }
</script>
