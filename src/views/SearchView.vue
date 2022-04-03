<template>
  <article>
    <b-container size="m" v-if="is404">
      <b-alert type="warning">
        {{ $t('notFoundDesc') }}
      </b-alert>
    </b-container>

    <b-container size="m" v-if="search.state.filters.branch">
      <search-actionbar
        :term="search.state.term"
        @set-term="search.setTerm"
        @reset="search.reset"
        @search="search.search"
      />
    </b-container>

    <b-container size="m" v-if="!search.state.filters.branch">
      <p>{{ $t('chooseBranch') }}</p>
    </b-container>

    <b-container size="m">
      <search-radio-filter
        :selectedItem="search.state.filters.branch"
        :items="search.state.branches"
        :title="$t('branch')"
        @select="search.handleFilter('branch', $event)"
      />
    </b-container>

    <b-container size="m" v-if="search.state.isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="search.state.hasEmptyResult">
      <b-alert type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m" v-if="search.state.hasBooks">
      <search-books-list :books="search.state.books" @book="openBook" />
    </b-container>

    <b-container size="m" v-if="search.state.pages > 1">
      <search-pagination
        :pages="search.state.pages"
        :page="search.state.page"
        @set-page="search.setPage"
      />
    </b-container>

    <div v-if="search.state.term == null || search.state.hasEmptyResult">
      <b-container size="m">
        <h3>{{ $t('recommendations') }}</h3>
      </b-container>

      <b-container size="m">
        <search-books-card
          :books="search.state.recommendations.books"
          @book="openBook"
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
import router from '@/router'

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

    const search = useSearch(term, page, branch)

    const openBook = (book) => {
      router.push({ name: 'book', params: { book_id: book.id } })
    }

    return {
      search,
      openBook,
    }
  },
}
</script>
