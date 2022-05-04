<template>
  <b-horizontal-list v-if="articles">
    <b-horizontal-list-item
      size="xs"
      v-for="article in articles"
      :key="article.id"
    >
      <div class="card">
        <div class="card_image">
          <router-link :to="{ name: 'article', params: { id: article.id } }">
            <img
              class="image"
              :src="article.cover_l"
              :alt="article.title"
              v-if="article.cover_l"
            />
          </router-link>
        </div>

        <div class="card_row">
          <p class="author">
            {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
          </p>
        </div>

        <div class="card_row" :style="{ flexGrow: '2' }">
          <router-link
            :to="{ name: 'article', params: { id: article.id } }"
            class="title"
          >
            {{ article.title }}
          </router-link>
        </div>

        <div class="card_row">
          <b-button
            class="price"
            design="text"
            :style="{ alignSelf: 'flex-end' }"
            @click="
              $router.push({ name: 'article', params: { id: article.id } })
            "
          >
            {{ formatPrice(article.price) }} {{ article.currency }}
          </b-button>
        </div>
      </div>
    </b-horizontal-list-item>
  </b-horizontal-list>
</template>

<script>
import useArticle from './../../composables/useArticle'

export default {
  name: 'search-articles-card',
  props: {
    articles: Array,
  },
  setup() {
    const { formatPrice, formatAuthor } = useArticle()

    return { formatPrice, formatAuthor }
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 420px;
}
.card_image {
  background: var(--color-neutral-02);
  height: 240px;
  text-align: center;
}
.image {
  width: auto;
  max-height: 100%;
}
.title {
  display: -webkit-box;
  padding: 0;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: var(--color-neutral-10);
}
.title:hover {
  color: var(--color-neutral-06);
}
.author {
  display: -webkit-box;
  padding: 0;
  margin: 10px 0;
  overflow: hidden;
  font-size: 0.8rem;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.price {
  padding-left: 0;
  font-weight: 600;
}
</style>
