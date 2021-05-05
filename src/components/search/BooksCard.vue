<template>
  <b-horizontal-list v-if="books">
    <b-horizontal-list-item size="s" v-for="book in books" :key="book.id">
      <img
        :src="book.cover_l"
        :style="{ cursor: 'pointer' }"
        @click="$emit('book', book)"
        v-if="book.cover_l"
      />
      <p
        :style="{ fontWeight: 'bold', cursor: 'pointer' }"
        @click="$emit('book', book)"
      >
        {{ book.title }}
      </p>
      <b-button design="text" @click="$emit('book', book)">
        {{ formatPrice(book.price) }} {{ book.currency }}
      </b-button>
    </b-horizontal-list-item>
  </b-horizontal-list>
</template>

<script>
import { price } from '../../services/formatter'

export default {
  name: 'books-card-search',
  props: {
    books: Array,
  },
  methods: {
    formatPrice: price,
  },
}
</script>
