<template>
  <b-horizontal-list v-if="books">
    <b-horizontal-list-item size="xs" v-for="book in books" :key="book.id">
      <div class="card">
        <div class="card_image">
          <router-link :to="{ name: 'article', params: { id: book.id } }">
            <img
              class="image"
              :src="book.cover_l"
              :alt="book.title"
              v-if="book.cover_l"
            />
          </router-link>
        </div>

        <div class="card_row">
          <p class="author">
            {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
          </p>
        </div>

        <div class="card_row" :style="{ flexGrow: '2' }">
          <router-link
            :to="{ name: 'article', params: { id: book.id } }"
            class="title"
          >
            {{ book.title }}
          </router-link>
        </div>

        <div class="card_row">
          <b-button
            class="price"
            design="text"
            :style="{ alignSelf: 'flex-end' }"
            @click="$router.push({ name: 'article', params: { id: book.id } })"
          >
            {{ formatPrice(book.price) }} {{ book.currency }}
          </b-button>
        </div>
      </div>
    </b-horizontal-list-item>
  </b-horizontal-list>
</template>

<script>
import useBook from './../../composables/useBook'

export default {
  name: 'search-books-card',
  props: {
    books: Array,
  },
  setup() {
    const { formatPrice, formatAuthor } = useBook()

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
