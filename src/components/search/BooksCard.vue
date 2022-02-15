<template>
  <b-horizontal-list v-if="books">
    <b-horizontal-list-item size="xs" v-for="book in books" :key="book.id">
      <div class="card">
        <div class="card_image">
          <img
            class="image"
            :src="book.cover_l"
            :alt="book.title"
            @click="$emit('book', book)"
            v-if="book.cover_l"
          />
        </div>

        <div class="card_row">
          <p class="author">
            {{ author(book.authorFirstname, book.authorSurname) }}
          </p>
        </div>

        <div class="card_row" :style="{ flexGrow: '2' }">
          <p class="title" :title="book.title" @click="$emit('book', book)">
            {{ book.title }}
          </p>
        </div>

        <div class="card_row">
          <b-button
            class="price"
            design="text"
            :style="{ alignSelf: 'flex-end' }"
            @click="$emit('book', book)"
          >
            {{ price(book.price) }} {{ book.currency }}
          </b-button>
        </div>
      </div>
    </b-horizontal-list-item>
  </b-horizontal-list>
</template>

<script>
import { author, price } from '../../services/formatter'

export default {
  name: 'search-books-card',
  props: {
    books: Array,
  },
  setup() {
    return { price, author }
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
  cursor: pointer;
}
.image {
  cursor: pointer;
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
