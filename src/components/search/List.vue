<script>
import { useArticle } from '../../composables/useArticle.js'

export default {
  name: 'search-list',
  setup() {
    const { articles, formatPrice, formatAuthor, image } = useArticle()

    return { articles, formatPrice, formatAuthor, image }
  },
}
</script>

<template>
  <div v-if="articles">
    <b-list v-for="article in articles" :key="article.id" divider>
      <template #image>
        <router-link :to="{ name: 'article', params: { id: article.id } }">
          <img
            width="100"
            :src="image(article.id, '100x100')"
            :alt="article.title"
          />
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
