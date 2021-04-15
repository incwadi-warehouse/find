import { find as findAction } from '@/api/search'
import { computed, onMounted, reactive, watch } from '@vue/composition-api'
import router from '@/router'

export default function useSearch(term, page) {
  const state = reactive({
    isLoading: false,
    term: term,
    books: [],
    book: null,
    counter: 0,
    pages: computed(() => {
      return Math.ceil(state.counter / 20)
    }),
    page: page,
    hasFindError: false,
    hasBooks: computed(() => {
      if (!state.books) return false
      return state.books.length >= 1
    }),
    hasEmptyResult: computed(() => {
      return (
        state.term !== undefined &&
        state.books.length === 0 &&
        state.isLoading === false
      )
    }),
  })

  watch([() => state.term, () => state.page], () => {
    if (!state.term) {
      state.books = []
      state.counter = 0
    }
    search()
  })

  const setBook = (book) => {
    state.book = book
  }

  const navigate = (term, page) => {
    router.push({
      name: 'search',
      query: { term, page },
    })
  }

  const setTerm = (term) => {
    if (term === state.term) return

    navigate(term, 1)
  }

  const setPage = (page) => {
    if (page < 1 || page > state.pages) return
    if (page === state.page) return

    navigate(state.term, page)
    window.scrollTo(0, 0)
  }

  const reset = () => {
    navigate(undefined, undefined)
  }

  const fetchBooks = () => {
    const params = {
      params: {
        options: {
          term: state.term,
          offset: state.page * 20 - 20,
        },
      },
    }

    return findAction(params).then((response) => {
      state.books = response.data.books
      state.counter = response.data.counter
    })
  }

  const search = () => {
    if (!state.term) return

    state.isLoading = true
    state.hasFindError = false
    fetchBooks()
      .catch(() => {
        state.hasFindError = true
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  onMounted(search)

  return {
    state,
    setBook,
    setTerm,
    setPage,
    reset,
  }
}
