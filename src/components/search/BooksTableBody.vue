<template>
  <tbody>
    <tr v-for="book in books" :key="book.id">
      <td>
        <span @click="$emit('book', book)" :style="{ cursor: 'pointer' }">
          {{ book.title }}
        </span>
      </td>
      <td v-if="book.authorSurname || book.authorFirstname">
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
      </td>
      <td v-else></td>
      <td>
        {{ book.genre }}
      </td>
      <td>
        {{ $t('search.' + book.type) }}
      </td>
      <td :style="{ textAlign: 'right' }">
        {{ book.releaseYear }}
      </td>
      <td :style="{ textAlign: 'right' }">
        {{ formatPrice(book.price) }} {{ book.currency }}
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
import { formatAuthor, formatPrice } from '../../util/formatter'
import { mapState } from 'vuex'

export default {
  name: 'books-list-search',
  computed: {
    ...mapState('search', ['books']),
  },
  methods: {
    formatAuthor: formatAuthor,
    formatPrice: formatPrice,
  },
}
</script>
