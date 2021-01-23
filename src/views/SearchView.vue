<template>
  <article>
    <b-container size="l">
      <search-actionbar />
    </b-container>

    <b-container size="l" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <div v-if="hasBooks">
      <search-book-heading />
    </div>

    <b-container size="l" v-if="hasBooks">
      <b-table>
        <table>
          <search-books-table-head />
          <search-books-table-body @book="setBook" />
        </table>
      </b-table>
    </b-container>

    <search-book-show :book="book" v-if="book" @close="closeBookModal" />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBookHeading from '../components/search/BookHeading'
import SearchBooksTableHead from '../components/search/BooksTableHead'
import SearchBooksTableBody from '../components/search/BooksTableBody'
import SearchBookShow from '../components/search/BookShow'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchActionbar,
    SearchBookHeading,
    SearchBooksTableHead,
    SearchBooksTableBody,
    SearchBookShow,
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
    closeBookModal() {
      this.book = null
    },
  },
}
</script>
