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

      <pre><code>{{ book }}</code></pre>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: 'show-book',
  props: {
    book: {
      type: Object,
      required: true,
    },
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
