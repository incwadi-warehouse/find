<template>
  <article>
    <b-container size="m">
      <search-actionbar />
    </b-container>

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="hasBooks">
      <search-books-list @book="setBook" />
    </b-container>

    <search-book-show :book="book" v-if="book" @close="book = null" />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBookShow from '../components/search/BookShow'
import SearchBooksList from '../components/search/BooksList'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchActionbar,
    SearchBookShow,
    SearchBooksList,
  },
  data() {
    return {
      book: null,
    }
  },
  computed: {
    hasBooks() {
      if (!this.$store.state.search.books) return false
      return this.$store.state.search.books.length >= 1
    },
    isLoading() {
      return this.$store.state.search.isLoading
    },
  },
  methods: {
    setBook(book) {
      this.book = book
    },
  },
}
</script>
