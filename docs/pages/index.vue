<template>
  <div>
    <page-section padding="5bl">
      <template #top>
        <home-hero />
      </template>
      <div>
        <h1 class="type-title color-white">
          Reclaim the
          <span class="color-accent-1">mathematical harmony</span> of your web
          designs
        </h1>
        <p class="type-lead color-white">
          Scalar is a first-of-its-kind CSS framework for helping you quickly
          build typographically rich, mathematically beautiful, completely
          custom layouts that maintain their visual integrity across every
          device and breakpoint.
        </p>
      </div>
    </page-section>

    <page-section padding="5bl" bg="white">
      <template #top>
        <top-two />
      </template>

      <div class="rowLayout">
        <section-title
          tagline="Complete Customization, No Overrides"
          title="Build quickly with utility-first CSS"
        />
        <p>
          Following in the tradition of other highly-customizable CSS utility
          frameworks like Tailwind, Scalar generates a low-level, class-based
          API that helps you rapidly build unique layouts without forcing you to
          override base styles.
        </p>
        <div class="columnLayout">
          <icon-block icon="waveform" title="Responsive, yet precise">
            Scalar takes advantage of the latest CSS functionality and a
            pioneering approach to CSS to keep your design consistent, no matter
            the viewport.
          </icon-block>
          <icon-block icon="typography" title="Rich Typography">
            Modify font properties, vertical rhythm, margins, line heights, and
            modular scales at any breakpoint to get the right type stylinhg for
            each screen.
          </icon-block>
          <icon-block icon="modular" title="Modular">
            Scalar’s composable plugins and configs allows you to opt-in, out,
            or even build your own, to ensure you have 100% control over your
            final CSS.
          </icon-block>
          <icon-block icon="accessible" title="Accessible">
            Many existing “fluid” font techniques inhibit accessibility. Scalar
            works without breaking accessibility and doesn’t use obscure calc
            statements.
          </icon-block>
        </div>
      </div>
    </page-section>

    <page-section padding="5bl" bg="light">
      <template #top>
        <top-three />
      </template>
      <div class="rowLayout">
        <section-title
          tagline="Support Scalar's Development"
          title="How can you help?"
        />
        <div class="columnLayout">
          <p>
            If you love the ideas behind Scalar and the potential it unveils,
            please consider sponsoring its development to ensure we can build a
            web with beautiful, accessible typography and grids for all.
          </p>
          <p class="color-neutral-4">
            Scalar CSS is an MIT-licensed, open source project. It grows thanks
            to the sponsors and support by the amazing backers. Please, consider
            supporting the project.
          </p>
        </div>

        <div class="columnLayout">
          <icon-block icon="training" title="Video training">
            Learn Scalar from the source by buying one of the
            <a
              href="https://learn.scalar.com"
              target="_blank"
              rel="noreferrer nofollow"
              >video trainings</a
            >.
          </icon-block>
          <icon-block icon="store" title="Scalar swag">
            Grab yourself some beautiful swag in our
            <a
              href="https://scalar.threadless.com"
              target="_blank"
              rel="noreferrer nofollow"
              >Scalar merch store</a
            >.
          </icon-block>
          <icon-block icon="oc-colored" title="Open Collective">
            Become a backer or sponsor on
            <a
              href="https://www.opencollective.com/scalar-css"
              target="_blank"
              rel="noreferrer nofollow"
              >Open Collective</a
            >.
          </icon-block>
          <icon-block icon="donate" title="Donations">
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

    <page-section bg="primary-1" padding="7bl">
      <template #top>
        <top-four />
      </template>
      <section-title
        tagline="Video Training — Coming in 2021"
        title="Learn to design and develop fluidly"
        theme="dark"
      />
      <p class="color-neutral-7">
        Scalar and fluid web design give us an ability to design and build web
        sites in a new way that gives us greater control and precision over
        typography, layout, and copywriting.
      </p>

      <p class="color-neutral-7">
        Whether you’re a designer or a developer, prepare for an in-depth,
        guided course and walk-through of all the building blocks and essential
        concepts behind fluid web design. You’ll be learning from the creator of
        Scalar himself, Kether Saturnius, a 20 year veteran of the web industry
        who spent the first half of his career as a designer.
      </p>

      <p class="color-accent-2">
        <strong>Save 50% if you buy before 2021</strong>
      </p>
      <template #bottom>
        <bottom-four />
      </template>
    </page-section>
  </div>
</template>

<script>
  import HomeHero from '@/assets/home-bg.svg'
  import BottomFour from '@/assets/section-four-bottom.svg'
  import TopFour from '@/assets/section-four-top.svg'
  import TopThree from '@/assets/section-three-top.svg'
  import TopTwo from '@/assets/section-two-top.svg'
  import PageSection from '@/components/PageSection.vue'
  import IconBlock from '~/components/IconBlock'
  import SectionTitle from '~/components/SectionTitle'

  export default {
    components: {
      PageSection,
      HomeHero,
      TopTwo,
      TopThree,
      TopFour,
      BottomFour,
      IconBlock,
      SectionTitle
    }
  }
</script>
