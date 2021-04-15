<template>
  <article>
    <b-container size="m">
      <search-actionbar :term="state.term" @set-term="setTerm" @reset="reset" />
    </b-container>

    <b-container size="m" v-if="state.isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="state.hasEmptyResult">
      <b-notification type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-notification>
    </b-container>

    <b-container size="m" v-if="state.hasBooks">
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
import { toRefs } from '@vue/composition-api'

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
  props: {
    term: String,
    page: Number,
  },
  setup(props) {
    let { term, page } = toRefs(props)
    const { state, setBook, setTerm, setPage, reset } = useSearch(term, page)

    return {
      state,
      setBook,
      setTerm,
      setPage,
      reset,
    }
  },
}
</script>
