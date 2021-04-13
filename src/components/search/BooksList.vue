<template>
  <article>
    <b-list
      @click-title.prevent="$emit('book', book)"
      v-for="book in books"
      :key="book.id"
    >
      <template #image v-if="book.cover_s">
        <img
          :src="book.cover_s"
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
  </article>
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
