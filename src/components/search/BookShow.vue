<template>
  <b-modal @close="$emit('close', $event)">
    <b-container size="m">
      <h1>{{ book.title }}</h1>
      <p v-if="book.authorSurname || book.authorFirstname">
        {{ $t('search.by') }}
        {{ formatAuthor(book.authorFirstname, book.authorSurname) }}
      </p>
    </b-container>

    <b-container size="m" v-if="book.cover_m && book.cover_l">
      <img :src="book.cover_m" v-if="!hasZoom" @click="hasZoom = !hasZoom" />
      <img :src="book.cover_l" v-if="hasZoom" @click="hasZoom = !hasZoom" />
    </b-container>

    <b-container size="m" v-if="book.shortDescription">
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
      <p v-if="book.cond">{{ $t('search.condition') }}: {{ book.cond }}</p>
    </b-container>

    <b-container size="m">
      <p>{{ $t('search.branch') }}: {{ book.branchName }}</p>
      <p :style="{ whiteSpace: 'pre' }">{{ book.branchOrdering }}</p>
    </b-container>

    <br />
    <br />
    <br />
    <br />
    <br />
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
  data() {
    return {
      hasZoom: false,
    }
  },
  methods: {
    formatAuthor: formatAuthor,
    formatPrice: formatPrice,
  },
}
</script>
