import { find as findAction } from '@/api/search'
import { computed, reactive } from '@vue/composition-api'

export default function useSearch() {
  const state = reactive({
    isLoading: false,
    term: null,
    books: [],
    book: null,
    pages: 1,
    page: 1,
    hasFindError: false,
    hasEmptyResult: false,
  })

  const hasBooks = computed(() => {
    if (!state.books) return false
    return state.books.length >= 1
  })

  const setBook = (id) => {
    state.book = id
  }

  const setPage = (page) => {
    state.page = page
    find()
    window.scrollTo(0, 0)
  }

  const find = () => {
    state.isLoading = true
    const params = {
      params: {
        options: {
          term: state.term,
          offset: state.page * 20 - 20,
        },
      },
    }

    findAction(params)
      .then((response) => {
        state.hasFindError = false
        state.books = response.data.books
        state.hasEmptyResult = false
        if (response.data.books.length === 0) {
          state.hasEmptyResult = true
        }
        state.pages = Math.ceil(response.data.counter / 20)
      })
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
    state.pages = 1
    state.page = 1
    state.hasEmptyResult = false
  }

  return {
    state,
    hasBooks,
    setBook,
    setPage,
    find,
    reset,
  }
}
