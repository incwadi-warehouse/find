<template>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td>
        {{ book.title }}
      </td>
      <td v-if="book.author">
        {{ book.author | formatAuthor }}
      </td>
      <td v-else></td>
      <td>
        {{ book.genre.name }}
      </td>
      <td>
        {{ $t(book.type) }}
      </td>
      <td style="text-align: right">
        {{ book.releaseYear }}
      </td>
      <td style="text-align: right">
        {{ book.price | formatPrice }}
      </td>
    </tr>
  </tbody>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'books-list-search',
  computed: {
    ...mapState('book', ['books']),
  },
  filters: {
    formatPrice(price) {
      return Number.parseFloat(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
    formatAuthor(author) {
      if (author.firstname === '') {
        return author.surname
      }
      return author.surname + ', ' + author.firstname
    },
  },
}
</script>
