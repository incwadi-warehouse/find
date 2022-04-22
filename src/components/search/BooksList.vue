<template>
  <div v-if="books">
    <b-list v-for="book in books" :key="book.id" divider>
      <template #image>
        <router-link :to="{ name: 'book', params: { book_id: book.id } }">
          <img width="100" :src="image(book.id)" :alt="book.title" />
        </router-link>
      </template>

      <template #title>
        <router-link :to="{ name: 'book', params: { book_id: book.id } }">
          {{ book.title }}
        </router-link>
      </template>

      <template #options>
        <b-button
          design="text"
          @click="$router.push({ name: 'book', params: { book_id: book.id } })"
        >
          {{ formatPrice(book.price) }} {{ book.currency }}
        </b-button>
      </template>

      <template #meta>
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
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
import useBook from './../../composables/useBook'

export default {
  name: 'search-books-list',
  props: {
    books: Array,
  },
  setup() {
    const { formatPrice, formatAuthor } = useBook()

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
