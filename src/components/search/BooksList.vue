<template>
  <div v-if="books">
    <b-list v-for="book in books" :key="book.id" divider>
      <template #image>
        <img
          width="100"
          :src="image(book.id)"
          :alt="book.title"
          :style="{ cursor: 'pointer' }"
          @click="$router.push({ name: 'book', params: { book_id: book.id } })"
        />
      </template>

      <template #title>
        <span
          :style="{ cursor: 'pointer' }"
          @click.prevent="
            $router.push({ name: 'book', params: { book_id: book.id } })
          "
        >
          {{ book.title }}
        </span>
      </template>

      <template #options>
        <b-button
          design="text"
          @click="$router.push({ name: 'book', params: { book_id: book.id } })"
        >
          {{ price(book.price) }} {{ book.currency }}
        </b-button>
      </template>
      <template #meta>
        {{ author(book.authorFirstname, book.authorSurname) }}
        &bull;
        {{ book.genre }}
        &bull;
        {{ book.format_name }}
        &bull;
        {{ book.releaseYear }}
      </template>
    </b-list>
  </div>
</template>

<script>
import { author, price } from '../../services/formatter'

export default {
  name: 'search-books-list',
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
