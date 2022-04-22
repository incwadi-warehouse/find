<template>
  <article>
    <b-container size="m" v-if="is404">
      <b-alert type="warning">
        {{ $t('notFoundDesc') }}
      </b-alert>
    </b-container>

    <b-container size="m">
      <b-search
        focus
        branded
        :placeholder="$t('searchInTitleAuthorGenre')"
        :value="term"
        @input="searchOnInput"
        @submit.prevent="search"
        @reset="
          $router.push({
            name: 'search',
          })
        "
      />
    </b-container>

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container
      size="m"
      v-if="term != null && books.length == 0 && !isLoading"
    >
      <b-alert type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m" v-if="books.length >= 1">
      <search-books-list :books="books" />
    </b-container>

    <b-container size="m" v-if="pages > 1">
      <search-pagination :pages="pages" :page="page" />
    </b-container>

    <div v-if="term == null || books.length == 0">
      <b-container size="m">
        <h3>{{ $t('recommendations') }}</h3>
      </b-container>

      <b-container size="m">
        <search-books-card :books="recommendations" />
      </b-container>
    </div>
  </article>
</template>

<script>
import SearchBooksList from '../components/search/BooksList'
import SearchBooksCard from '../components/search/BooksCard'
import SearchPagination from '@/components/search/Pagination'
import useRecommendation from '@/composables/useRecommendation'
import useBook from '@/composables/useBook'
import { computed, onMounted, toRefs, watch } from '@vue/composition-api'
import { debounce } from 'lodash'
import router from '@/router'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchBooksList,
    SearchBooksCard,
    SearchPagination,
  },
  props: {
    term: String,
    page: Number,
    is404: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { term, page } = toRefs(props)

    const { recommendations, listRecommendations } = useRecommendation()

    const { books, counter, isLoading, listBooks } = useBook()

    onMounted(listRecommendations)

    const pages = computed(() => {
      return Math.ceil(counter.value / 20)
    })

    const search = () => {
      if (!term.value) return

      listBooks(term.value, page.value)
    }

    onMounted(search)

    watch([() => term.value, () => page.value], () => {
      if (!term.value) {
        books.value = []
        counter.value = 0
      }
      search()
    })

    let request = null

    const searchOnInput = (t) => {
      if (request !== null) {
        request.cancel()
      }

      request = debounce(() => {
        if (t === null) return

        router.push({
          name: 'search',
          query: { term: t, page: page.value },
        })
      }, 500)

      request()
    }

    return {
      recommendations,
      books,
      counter,
      isLoading,
      pages,
      search,
      searchOnInput,
    }
  },
}
</script>
