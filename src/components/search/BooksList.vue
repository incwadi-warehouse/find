<template>
  <div v-if="books">
    <b-list
      @click-title.prevent="$emit('book', book)"
      v-for="book in books"
      :key="book.id"
    >
      <template #image>
        <img
          width="100"
          :src="image(book.id)"
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
          {{ price(book.price) }} {{ book.currency }}
        </b-button>
      </template>
      <template #meta>
        {{ author(book.authorFirstname, book.authorSurname) }}
        <b-list-separator />
        {{ book.genre }}
        <b-list-separator />
        format: {{ book.format_name }}
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
  setup() {
    const image = (id) => {
      return (
        process.env.VUE_APP_API +
        '/api/public/book/cover/' +
        id +
        '_100x100.jpg'
      )
    }

    return { author, price, image }
  },
}
</script>
