<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="m">
      <h1>{{ book.title }}</h1>
    </b-container>

    <b-container size="m" v-if="book">
      <p>{{ $t('book.author') }}: {{ book.author | formatAuthor }}</p>
      <p>
        {{ $t('book.price') }}: {{ book.price | formatPrice }}
        {{ book.branch.currency }}
      </p>
      <p>{{ $t('book.genre') }}: {{ book.genre.name }}</p>
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
