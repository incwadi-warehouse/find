import { find as findAction, branch as branchAction } from '@/api/search'
import { computed, onMounted, reactive, watch } from '@vue/composition-api'
import router from '@/router'

export default function useSearch(term, page, branch) {
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
    branches: [],
    filters: {
      branch: branch.value
        ? {
            id: branch.value,
            name: computed(() => {
              if (state.branches.length === 0) return null
              const name = state.branches.find(
                (element) => element.id === branch.value
              )
              return name ? name.name : null
            }),
          }
        : undefined,
    },
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

  watch([() => state.term, () => state.page, () => state.branch], () => {
    if (!state.term) {
      state.books = []
      state.counter = 0
    }
    search()
  })

  const setBook = (book) => {
    state.book = book
  }

  const navigate = (term, page, branch) => {
    router.push({
      name: 'search',
      query: { term, page, branch: branch.id },
    })
  }

  const setTerm = (term) => {
    if (term === state.term) return

    navigate(term, 1, state.filters.branch)
  }

  const setPage = (page) => {
    if (page < 1 || page > state.pages) return
    if (page === state.page) return

    navigate(state.term, page, state.filters.branch)
    window.scrollTo(0, 0)
  }

  const reset = () => {
    navigate(undefined, undefined, state.filters.branch)
  }

  const fetchBooks = () => {
    const params = {
      params: {
        options: {
          term: state.term,
          filter: [
            {
              field: 'branch',
              operator: 'eq',
              value: state.filters.branch ? state.filters.branch.id : null,
            },
          ],
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

  const handleFilter = (prop, value) => {
    state.filters[prop] = value
    navigate(state.term, state.page, state.filters.branch)
  }

  const fetchBranches = () => {
    branchAction().then((response) => {
      state.branches = response.data.branches

      if (state.branches && state.branches.length === 1) {
        handleFilter('branch', state.branches[0])
      }
    })
  }

  onMounted(fetchBranches)

  return {
    state,
    setBook,
    setTerm,
    setPage,
    reset,
    search,
    handleFilter,
  }
}
