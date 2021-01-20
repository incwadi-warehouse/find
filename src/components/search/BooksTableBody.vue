<template>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td>
        <span @click="$emit('book', book)">{{ book.title }}</span>
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
      <td style="text-align: right">
        <span @click="$emit('book', book)">{{ $t('detail') }}</span>
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
