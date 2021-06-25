<template>
  <div v-if="books">
    <b-list
      @click-title.prevent="$emit('book', book)"
      v-for="book in books"
      :key="book.id"
    >
      <template #image>
        <img
          :src="image(book.id)"
          width="100"
          :alt="book.title"
          :style="{ cursor: 'pointer' }"
          @click="$emit('book', book)"
        />
      </template>
      <template #title>
        <span :style="{ cursor: 'pointer' }">
          {{ book.title }}
        </span>
      </template>
      <template #options>
        <b-button design="text" @click="$emit('book', book)">
          {{ formatPrice(book.price) }} {{ book.currency }}
        </b-button>
      </template>
      <template #meta>
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
        <b-list-separator />
        {{ book.genre }}
        <b-list-separator />
        {{ $t(book.type) }}
        <b-list-separator />
        {{ book.releaseYear }}
      </template>
    </b-list>
  </div>
</template>

<script>
import { author, price } from '../../services/formatter'

export default {
  name: 'books-list-search',
  props: {
    books: Array,
  },
  methods: {
    formatAuthor: author,
    formatPrice: price,
    image(id) {
      return (
        process.env.VUE_APP_API +
        '/api/public/book/cover/' +
        id +
        '_100x100.jpg'
      )
    },
  },
}
</script>
