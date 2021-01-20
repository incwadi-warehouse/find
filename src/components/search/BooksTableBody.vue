<template>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td>
        <span @click="$emit('book', book)" :style="{ cursor: 'pointer' }">
          {{ book.title }}
        </span>
      </td>
      <td v-if="book.author">
        {{ book.author | formatAuthor }}
      </td>
      <td v-else></td>
      <td>
        {{ book.genre.name }}
      </td>
      <td>
        {{ $t('search.' + book.type) }}
      </td>
      <td :style="{ textAlign: 'right' }">
        {{ book.releaseYear }}
      </td>
      <td :style="{ textAlign: 'right' }">
        {{ book.price | formatPrice }} {{ book.branch.currency }}
      </td>
      <td :style="{ textAlign: 'right' }">
        <b-button design="text" @click="$emit('book', book)">
          {{ $t('search.details') }}
        </b-button>
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
