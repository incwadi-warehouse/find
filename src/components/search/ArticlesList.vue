<template>
  <div v-if="articles">
    <b-list v-for="article in articles" :key="article.id" divider>
      <template #image>
        <router-link :to="{ name: 'article', params: { id: article.id } }">
          <img width="100" :src="image(article.id)" :alt="article.title" />
        </router-link>
      </template>

      <template #title>
        <router-link :to="{ name: 'article', params: { id: article.id } }">
          {{ article.title }}
        </router-link>
      </template>

      <template #options>
        <b-button
          design="text"
          @click="$router.push({ name: 'article', params: { id: article.id } })"
        >
          {{ formatPrice(article.price) }} {{ article.currency }}
        </b-button>
      </template>

      <template #meta>
        {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
        &bull;
        {{ article.genre }}
        &bull;
        {{ article.format_name }}
        &bull;
        {{ article.releaseYear }}
      </template>
    </b-list>
  </div>
</template>

<script>
import useArticle from '../../composables/useArticle'

export default {
  name: 'search-articles-list',
  props: {
    articles: Array,
  },
  setup() {
    const { formatPrice, formatAuthor } = useArticle()

    const image = (id) => {
      return (
        process.env.VUE_APP_API +
        '/api/public/book/cover/' +
        id +
        '_100x100.jpg'
      )
    }

    return { formatPrice, formatAuthor, image }
  },
}
</script>
