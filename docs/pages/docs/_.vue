<template>
  <main class="columnLayout max-width-bl gap-bl1" data-columns="docs">
    <aside class="sidebar-wrapper">
      <div class="sidebar-sticky">
        <div class="sidebar px-ru">
          <nav class="rowLayout pt-bl" style="--pt-bl: 3;">
            <ul>
              <li class="-type-1">
                <nuxt-link to="/docs/getting-started/introduction"
                  >Docs</nuxt-link
                >
              </li>
              <li class="-type-1">
                <nuxt-link to="/blog">Blog</nuxt-link>
              </li>
              <li class="-type-1">
                <nuxt-link to="/community">Community</nuxt-link>
              </li>
              <li class="-type-1">
                <nuxt-link to="/support-scalar">Support Scalar</nuxt-link>
              </li>
            </ul>
            <div v-for="folder in sidebarLinks" :key="folder.key" class="">
              <h3 class="-type-2 text-uppercase color-neutral-5">
                {{ folder.title }}
              </h3>
              <ul>
                <li
                  v-for="link in folder.links"
                  :key="link.path"
                  class="-type-1"
                >
                  <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-for="folder in sidebarLinks" :key="folder.key" class="">
              <h3 class="-type-2 text-uppercase color-neutral-5">
                {{ folder.title }}
              </h3>
              <ul>
                <li
                  v-for="link in folder.links"
                  :key="link.path"
                  class="-type-1"
                >
                  <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-for="folder in sidebarLinks" :key="folder.key" class="">
              <h3 class="-type-2 text-uppercase color-neutral-5">
                {{ folder.title }}
              </h3>
              <ul>
                <li
                  v-for="link in folder.links"
                  :key="link.path"
                  class="-type-1"
                >
                  <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-for="folder in sidebarLinks" :key="folder.key" class="">
              <h3 class="-type-2 text-uppercase color-neutral-5">
                {{ folder.title }}
              </h3>
              <ul>
                <li
                  v-for="link in folder.links"
                  :key="link.path"
                  class="-type-1"
                >
                  <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-for="folder in sidebarLinks" :key="folder.key" class="">
              <h3 class="-type-2 text-uppercase color-neutral-5">
                {{ folder.title }}
              </h3>
              <ul>
                <li
                  v-for="link in folder.links"
                  :key="link.path"
                  class="-type-1"
                >
                  <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div v-for="folder in sidebarLinks" :key="folder.key" class="">
              <h3 class="-type-2 text-uppercase color-neutral-5">
                {{ folder.title }}
              </h3>
              <ul>
                <li
                  v-for="link in folder.links"
                  :key="link.path"
                  class="-type-1"
                >
                  <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </aside>
    <section class="rowLayout gap-lg pt-bl pl-bl" style="--pt-bl: 2;">
      <div class="rowLayout gap-sm">
        <h1 class="color-primary-2">{{ doc.title }}</h1>
        <p class="type-1" v-html="doc.description" />
      </div>
      <div class="">
        <nuxt-content class="px-bl" :document="doc" style="--px-bl: 3;" />
      </div>
    </section>
    <aside class="sidebar-wrapper pt-bl" style="--pt-bl: 3;">
      <div class="sticky top-0 px-ru border-aside">
        <h3 class="-type-2 text-uppercase color-neutral-5">
          On this page
        </h3>
        <ul>
          <li
            v-for="link of doc.toc"
            :key="link.id"
            class="-type-2"
            :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
          >
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </main>
</template>

<script>
  export default {
    async asyncData({ $content, route, sidebarLinks }) {
      const doc = await $content(route.fullPath).fetch()
      return { sidebarLinks, doc }
    }
  }
</script>

<style lang="pcss">
  .sidebar-sticky {
    top: 0;
    position: sticky;
  }
  .sidebar {
    height: calc(100vh - (var(--baselineUnit) * 3));
    overflow-y: scroll;
  }
  .border-aside {
    border-left: 1px solid rgba(33, 43, 44, 0.05);
  }
</style>
