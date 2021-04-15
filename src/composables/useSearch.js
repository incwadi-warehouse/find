import { find as findAction } from '@/api/search'
import { computed, reactive } from '@vue/composition-api'

export default function useSearch() {
  const state = reactive({
    isLoading: false,
    term: null,
    books: [],
    book: null,
    counter: 0,
    pages: computed(() => {
      return Math.ceil(state.counter / 20)
    }),
    page: 1,
    hasFindError: false,
    hasBooks: computed(() => {
      if (!state.books) return false
      return state.books.length >= 1
    }),
    hasEmptyResult: computed(() => {
      return (
        state.term !== null &&
        state.books.length === 0 &&
        state.isLoading === false
      )
    }),
  })

  const setBook = (book) => {
    state.book = book
  }

  const setPage = (page) => {
    if (page < 1 || page > state.pages) return
    state.page = page
    find()
    window.scrollTo(0, 0)
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

  const find = () => {
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

  const reset = () => {
    state.term = null
    state.books = []
    state.counter = 0
    state.page = 1
  }

  return {
    state,
    setBook,
    setPage,
    find,
    reset,
  }
}
