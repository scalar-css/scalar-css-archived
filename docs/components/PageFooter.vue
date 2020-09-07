<template>
  <page-section padding="5bl 0">
    <template #top>
      <footer-bg />
    </template>
    <footer class="footer rowLayout gap-su pl-su">
      <nav>
        <ul class="list-unstyled columnLayout gap-su">
          <li class="-type-2">
            <a
              class="footer-link text-uppercase"
              target="_blank"
              rel="noreferrer noopener nofollow"
              href="github.com/scalar-css/scalar-css"
              >Github</a
            >
          </li>
          <li class="-type-2">
            <a
              class="footer-link text-uppercase"
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.twitter.com/scalar-css"
              >Twitter</a
            >
          </li>
          <li class="-type-2">
            <a class="footer-link text-uppercase" href="#">About</a>
          </li>
        </ul>
      </nav>
      <p class="-type-2 color-neutral-3">
        Designed and built with love by
        <a href="https://www.k3th3r.com" class="footer-link" target="_blank"
          >Kether Saturnius</a
        >. Copyright © 2020 Kether Saturnius.
      </p>
      <p class="-type-2 color-neutral-3">
        Currently <strong>unstable</strong>. Code licensed
        <a
          href="https://github.com/scalar-css/scalar-css/blob/master/LICENSE"
          target="_blank"
          class="footer-link"
          rel="noreferrer noopener"
          >MIT</a
        >
      </p>
    </footer>
  </page-section>
</template>

<script>
  import FooterBg from '@/assets/footer-bg.svg'
  import PageSection from '@/components/PageSection.vue'

  export default {
    components: {
      PageSection,
      FooterBg
    }
  }
</script>

<style lang="postcss">
  .footer-link {
    color: var(--color-neutral-3);

    &:hover {
      color: var(--color-neutral-2);
    }
  }
</style>
