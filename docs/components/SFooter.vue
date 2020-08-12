<template>
  <s-section theme="footer">
    <footer class="container footer">
      <nav>
        <ul class="list-unstyled d-flex">
          <li class="py-1 mr-2">
            <a
              class="type--1 color-neutral-3"
              target="_blank"
              rel="noreferrer noopener nofollow"
              href="github.com/scalar-css/scalar-css"
              >Github</a
            >
          </li>
          <li class="py-1 mr-2">
            <a
              class="type--1 color-neutral-3"
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.twitter.com/scalar-css"
              >Twitter</a
            >
          </li>
          <li class="py-1 mr-2">
            <a class="type--1 color-neutral-3" href="/about">About</a>
          </li>
        </ul>
      </nav>
      <p class="type--1 color-neutral-3">
        Designed and built with love by
        <a href="https://www.k3th3r.com" target="_blank">Kether Saturnius</a>.
      </p>
      <p class="type--1 color-neutral-3">
        Currently <strong>unstable</strong>. Code licensed
        <a
          href="https://github.com/scalar-css/scalar-css/blob/master/LICENSE"
          target="_blank"
          rel="noreferrer noopener"
          >MIT</a
        >
      </p>
    </footer>
  </s-section>
</template>

<script>
  import SSection from './SSection'

  export default {
    components: {
      SSection
    }
  }
</script>

<style lang="postcss">
  .footer a {
    font-weight: 700;
    color: var(--color-neutral-3);

    &:hover {
      color: var(--color-neutral-2);
    }
  }
</style>
