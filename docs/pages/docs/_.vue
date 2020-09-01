<template>
  <div class="section">
    <div class="columnLayout" data-columns="main">
      <div class="sidebar-scrollbar">
        <div class="sidebar">
          <section class="rowLayout">
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
          </section>
        </div>
      </div>
      <div class="columnLayout" data-columns="content">
        <section class="rowLayout gap-lg">
          <div class="rowLayout gap-sm">
            <h1 class="color-primary-2">{{ doc.title }}</h1>
            <p class="type-1" v-html="doc.description" />
          </div>
          <div>
            <nuxt-content :document="doc" />
          </div>
        </section>
        <section class="rowLayout">
          <div>
            <h3 class="-type-2 text-uppercase color-neutral-5">
              On this page
            </h3>
            <ul>
              <li
                v-for="link of doc.toc"
                :key="link.id"
                class="-type-1"
                :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
              >
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
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
  .sidebar-scrollbar {
    top: 0;
    position: sticky;
    overflow-y: scroll;
    direction: rtl;
  }
  .sidebar {
    direction: ltr;
    padding-left: calc((var(--baselineUnit) * 2) - var(--scrollbarWidth));
    height: 100vh;
  }
</style>
