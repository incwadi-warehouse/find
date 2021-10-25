<template>
  <article>
    <b-container size="m" v-if="is404">
      <b-alert type="warning">
        {{ $t('notFoundDesc') }}
      </b-alert>
    </b-container>

    <b-container size="m" v-if="state.filters.branch">
      <search-actionbar
        :term="state.term"
        @set-term="setTerm"
        @reset="reset"
        @search="search"
      />
    </b-container>

    <b-container size="m" v-if="!state.filters.branch">
      <p>{{ $t('chooseBranch') }}</p>
    </b-container>

    <b-container size="m">
      <search-radio-filter
        :selectedItem="state.filters.branch"
        :items="state.branches"
        :title="$t('branch')"
        @select="handleFilter('branch', $event)"
      />
    </b-container>

    <b-container size="m" v-if="state.isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="state.hasEmptyResult">
      <b-alert type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-alert>
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

    <div v-if="state.term == null || state.hasEmptyResult">
      <b-container size="m">
        <h3>{{ $t('recommendations') }}</h3>
      </b-container>

      <b-container size="m">
        <search-books-card
          :books="state.recommendations.books"
          @book="setBook"
        />
      </b-container>
    </div>
  </article>
</template>

<script>
import SearchActionbar from '../components/search/Actionbar'
import SearchBooksList from '../components/search/BooksList'
import SearchBooksCard from '../components/search/BooksCard'
import SearchPagination from '@/components/search/Pagination'
import SearchRadioFilter from '@/components/search/RadioFilter'
import useSearch from '@/composables/useSearch'
import { toRefs } from '@vue/composition-api'
import router from '~b/router'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchActionbar,
    SearchBooksList,
    SearchBooksCard,
    SearchPagination,
    SearchRadioFilter,
  },
  props: {
    term: String,
    page: Number,
    branch: Number,
    is404: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let { term, page, branch } = toRefs(props)
    const { state, setTerm, setPage, reset, search, handleFilter } = useSearch(
      term,
      page,
      branch
    )

    const setBook = (book) => {
      router.push({ name: 'book', params: { book: book.id } })
    }

    return {
      state,
      setBook,
      setTerm,
      setPage,
      reset,
      search,
      handleFilter,
    }
  },
}
</script>
