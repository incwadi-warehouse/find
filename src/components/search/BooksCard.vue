<template>
  <b-horizontal-list v-if="books">
    <b-horizontal-list-item size="s" v-for="book in books" :key="book.id">
      <div class="image_container">
        <img
          class="image"
          :src="book.cover_l"
          :alt="book.title"
          @click="$emit('book', book)"
          v-if="book.cover_l"
        />
      </div>

      <p class="author">
        {{ author(book.authorFirstname, book.authorSurname) }}
      </p>

      <p class="title" :title="book.title" @click="$emit('book', book)">
        {{ title(book.title) }}
      </p>

      <b-button class="price" design="text" @click="$emit('book', book)">
        {{ price(book.price) }} {{ book.currency }}
      </b-button>
    </b-horizontal-list-item>
  </b-horizontal-list>
</template>

<script>
import { author, price } from '../../services/formatter'

export default {
  name: 'books-card-search',
  props: {
    books: Array,
  },
  setup() {
    const title = (title) => {
      const limit = 50
      if (title.length > limit) {
        return title.slice(0, limit - 4) + '...'
      }
      return title
    }

    return { price, author, title }
  },
}
</script>

<style scoped>
.image_container {
  background: var(--color-neutral-02);
  height: 300px;
  text-align: center;
  cursor: pointer;
}
.image {
  cursor: pointer;
  width: auto;
  max-height: 100%;
}
.title {
  height: 120px;
  font-weight: bold;
  cursor: pointer;
}
.author {
  height: 50px;
  overflow: hidden;
}
.price {
  padding-left: 0;
  font-weight: 600;
}
</style>
