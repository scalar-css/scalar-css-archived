<template>
  <article class="container">
    <div>
      <div v-for="folder in sidebarLinks" :key="folder.key">
        <h3>{{ folder.title }}</h3>
        <ul>
          <li v-for="link in folder.links" :key="link.path">
            <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <h1 class="font-roboto">{{ doc.title }}</h1>
    <p>{{ doc.description }}</p>
    <nuxt-content class="font-sans" :document="doc" />
  </article>
</template>

<script>
  export default {
    async asyncData({ $content, route, sidebarLinks }) {
      const doc = await $content(route.fullPath).fetch()
      return { sidebarLinks, doc }
    }
  }
</script>
