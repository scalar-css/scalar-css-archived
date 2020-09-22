<template>
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
            Scalar and fluid web design give us an ability to design and build
            web sites in a new way that gives us greater control and precision
            over typography, layout, and copywriting.
          </p>

          <p
            class="color-neutral-7 px-ru md-px-su text-max-width"
            style="--mdTextMaxWidth: 40rem; --lgTextMaxWidth: 27rem;"
          >
            Whether you’re a designer or a developer, prepare for an in-depth,
            guided course and walk-through of all the building blocks and
            essential concepts behind fluid web design. You’ll be learning from
            the creator of Scalar himself, Kether Saturnius, a 20 year veteran
            of the web industry who spent the first half of his career as a
            designer.
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
</template>
