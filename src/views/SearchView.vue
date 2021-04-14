<template>
  <article>
    <b-container size="m">
      <search-actionbar
        v-model="state.term"
        @reset-page="state.page = 1"
        @find="find"
        @reset="reset"
      />
    </b-container>

    <b-container size="m" v-if="state.isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="hasBooks">
      <search-books-list :books="state.books" @book="setBook" />
    </b-container>

    <b-container size="m" v-if="state.pages > 1">
      <search-pagination
        :pages="state.pages"
        :page="state.page"
        @set-page="setPage"
      />
    </b-container>

    <search-book-show
      :book="state.book"
      v-if="state.book"
      @close="state.book = null"
    />
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBookShow from '../components/search/BookShow'
import SearchBooksList from '../components/search/BooksList'
import SearchPagination from '@/components/search/Pagination'
import useSearch from '@/composables/useSearch'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchActionbar,
    SearchBookShow,
    SearchBooksList,
    SearchPagination,
  },
  setup() {
    const { state, hasBooks, setBook, setPage, find, reset } = useSearch()

    return {
      state,
      hasBooks,
      setBook,
      setPage,
      find,
      reset,
    }
  },
}
</script>
