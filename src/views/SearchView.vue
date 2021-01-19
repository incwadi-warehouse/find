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
          <search-books-table-body />
        </table>
      </b-table>
    </b-container>

    <book-edit
      :book="$store.state.book.book"
      v-if="$store.state.book.book"
      @close="closeEdit"
    />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBookHeading from '../components/search/BookHeading'
import SearchBooksTableHead from '../components/search/BooksTableHead'
import SearchBooksTableBody from '../components/search/BooksTableBody'
import BookEdit from '../components/book/Edit'

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
    BookEdit,
  },
  computed: {
    hasBooks() {
      if (!this.$store.state.book.books) return false
      return this.$store.state.book.books.length >= 1
    },
    isLoading() {
      return this.$store.state.search.isLoading
    },
  },
  methods: {
    closeEdit() {
      this.$store.commit('book/book', null)
    },
  },
}
</script>
