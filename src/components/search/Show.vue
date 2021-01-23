<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="m">
      <h1>{{ book.title }}</h1>
    </b-container>

    <b-container size="m" v-if="book">
      <p>
        {{ $t('book.author') }}:
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
      </p>
      <p>
        {{ $t('book.price') }}: {{ formatPrice(book.price) }}
        {{ book.currency }}
      </p>
      <p>{{ $t('book.genre') }}: {{ book.genre }}</p>
      <p>{{ $t('book.releaseYear') }}: {{ book.releaseYear }}</p>
      <p>{{ $t('book.type') }}: {{ $t('book.' + book.type) }}</p>
    </b-container>
  </b-modal>
</template>

<script>
import { formatAuthor, formatPrice } from '../../util/formatter'

export default {
  name: 'show-book',
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
