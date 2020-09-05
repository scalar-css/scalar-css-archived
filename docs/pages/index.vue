<template>
  <div>
    <section>
      <section-title
        tagline="Complete Customization, No Overrides"
        title="Build quickly with utility-first CSS"
      />
      <p>
        Following in the tradition of other highly-customizable CSS utility
        frameworks like Tailwind, Scalar generates a low-level, class-based API
        that helps you rapidly build unique layouts without forcing you to
        override base styles.
      </p>
      <icon-block icon="waveform" title="Responsive, yet precise">
        Scalar takes advantage of the latest CSS functionality and a pioneering
        approach to CSS to keep your design consistent, no matter the viewport.
      </icon-block>
      <icon-block icon="typography" title="Rich Typography">
        Modify font properties, vertical rhythm, margins, line heights, and
        modular scales at any breakpoint to get the right type stylinhg for each
        screen.
      </icon-block>
      <icon-block icon="modular" title="Modular">
        Scalar’s composable plugins and configs allows you to opt-in, out, or
        even build your own, to ensure you have 100% control over your final
        CSS.
      </icon-block>
      <icon-block icon="accessible" title="Accessible">
        Many existing “fluid” font techniques inhibit accessibility. Scalar
        works without breaking accessibility and doesn’t use obscure calc
        statements.
      </icon-block>
    </section>
    <section>
      <section-title
        tagline="Support Scalar's Development"
        title="How can you help?"
      />
      <p>
        If you love the ideas behind Scalar and the potential it unveils, please
        consider sponsoring its development to ensure we can build a web with
        beautiful, accessible typography and grids for all.
      </p>
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
    </section>
    <section>
      <section-title
        tagline="Video Training — Coming in 2021"
        title="Learn to design and develop fluidly"
      />
      <p>
        Scalar and fluid web design give us an ability to design and build web
        sites in a new way that gives us greater control and precision over
        typography, layout, and copywriting.
      </p>

      <p>
        Whether you’re a designer or a developer, prepare for an in-depth,
        guided course and walk-through of all the building blocks and essential
        concepts behind fluid web design. You’ll be learning from the creator of
        Scalar himself, Kether Saturnius, a 20 year veteran of the web industry
        who spent the first half of his career as a designer.
      </p>

      <p><strong>Save 50% if you buy before 2021</strong></p>
    </section>
  </div>
</template>

<script>
  import IconBlock from '~/components/IconBlock'
  import SectionTitle from '~/components/SectionTitle'

  export default {
    components: {
      IconBlock,
      SectionTitle
    }
  }
</script>

<style lang="postcss"></style>
