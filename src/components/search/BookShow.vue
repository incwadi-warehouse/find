<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="m">
      <h1>{{ book.title }}</h1>
      <p v-if="book.authorSurname || book.authorFirstname">
        {{ $t('search.by') }}
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
      </p>
      <p>{{ book.shortDescription }}</p>
    </b-container>

    <b-container size="m" v-if="book">
      <p>
        {{ $t('search.price') }}: {{ formatPrice(book.price) }}
        {{ book.currency }}
      </p>
      <p>{{ $t('search.genre') }}: {{ book.genre }}</p>
      <p>{{ $t('search.releaseYear') }}: {{ book.releaseYear }}</p>
      <p>{{ $t('search.type') }}: {{ $t('search.' + book.type) }}</p>
    </b-container>
  </b-modal>
</template>

<script>
import { formatAuthor, formatPrice } from '../../util/formatter'

export default {
  name: 'book-show',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatAuthor: formatAuthor,
    formatPrice: formatPrice,
  },
}
</script>
