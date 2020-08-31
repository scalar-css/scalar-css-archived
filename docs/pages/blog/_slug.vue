<template>
  <article class="container">
    <nav>
      <ul>
        <li
          v-for="link of article.toc"
          :key="link.id"
          :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }"
        >
          <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <h1 class="font-roboto">{{ article.title }}</h1>
    <p>{{ article.description }}</p>
    <p class="font-mono">
      Article last updated: {{ formatDate(article.updatedAt) }}
    </p>
    <nuxt-content class="font-sans" :document="article" />
  </article>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content(params.slug).fetch()

      return { article }
    },
    methods: {
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
      }
    }
  }
</script>
