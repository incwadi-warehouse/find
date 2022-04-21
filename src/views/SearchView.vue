<template>
  <article>
    <b-container size="m" v-if="is404">
      <b-alert type="warning">
        {{ $t('notFoundDesc') }}
      </b-alert>
    </b-container>

    <b-container size="m">
      <search-actionbar
        :term="term"
        @set-term="
          $router.push({
            name: 'search',
            query: { term: $event, page },
          })
        "
        @reset="
          $router.push({
            name: 'search',
          })
        "
        @search="search"
      />
    </b-container>

    <b-container size="m" v-if="isLoading">
      <b-spinner size="l" />
    </b-container>

    <b-container size="m" v-if="term && books.length == 0">
      <b-alert type="warning">
        <p>{{ $t('foundNothing') }}</p>
      </b-alert>
    </b-container>

    <b-container size="m" v-if="books.length >= 1">
      <search-books-list :books="books" />
    </b-container>

    <b-container size="m" v-if="pages > 1">
      <search-pagination :pages="pages" :page="page" @set-page="setPage" />
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
import SearchActionbar from '../components/search/Actionbar'
import SearchBooksList from '../components/search/BooksList'
import SearchBooksCard from '../components/search/BooksCard'
import SearchPagination from '@/components/search/Pagination'
import useRecommendation from '@/composables/useRecommendation'
import useBook from '@/composables/useBook'
import { computed, onMounted, toRefs, watch } from '@vue/composition-api'
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

    const setPage = (page) => {
      if (page < 1 || page > pages.value) return
      if (page === page.value) return

      router.push({
        name: 'search',
        query: { term: term.value, page },
      })
      window.scrollTo(0, 0)
    }

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

    return {
      recommendations,
      books,
      counter,
      isLoading,
      pages,
      setPage,
      search,
    }
  },
}
</script>
