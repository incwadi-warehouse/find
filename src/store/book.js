import api from '../api'

export default {
  namespaced: true,
  state: {
    books: [],
    book: null,
    counter: 0,
  },
  mutations: {
    books(state, books) {
      state.books = books
    },
    book(state, book) {
      state.book = book
    },
    removeBook(state, book) {
      const id = state.books.indexOf(book)
      state.books.splice(id, 1)
    },
    counter(state, counter) {
      state.counter = counter
    },
  },
  actions: {
    find(context) {
      const filters = context.rootState.search.elements
      context.commit('search/isLoading', true, { root: true })

      let flattenedFilters = []
      Object.keys(filters).forEach((key) => {
        if (!filters[key]) return
        if (
          !filters[key].field &&
          !filters[key].operator &&
          !filters[key].value
        )
          return
        if (filters[key].field === 'added' || filters[key].field === 'lendOn') {
          const date = new Date(filters[key].value)

          return flattenedFilters.push({
            field: filters[key].field,
            operator: filters[key].operator,
            value: date.getTime() / 1000,
          })
        }
        if (filters[key].field === 'genre') {
          if (filters[key].value.length === 0) {
            let genres = [1, 2, 3, 4]
            // context.rootState.genre.genres.forEach((genre) => {
            //   genres.push(genre.id)
            // })

            return flattenedFilters.push({
              field: filters[key].field,
              operator: filters[key].operator,
              value: genres,
            })
          }
        }
        if (filters[key].field === 'branch') {
          if (filters[key].value.length === 0) {
            return flattenedFilters.push({
              field: filters[key].field,
              operator: filters[key].operator,
              value: [context.rootState.user.me.branch.id],
            })
          }
        }
        return flattenedFilters.push(filters[key])
      })

      let term = undefined
      if (context.rootState.search.term) {
        term = context.rootState.search.term
      }

      let filter = undefined
      if (flattenedFilters.length >= 1) {
        filter = flattenedFilters
      }

      let orderBy = undefined
      if (
        context.rootState.search.orderByField ||
        context.rootState.search.orderByDirection
      ) {
        orderBy = { book: [{}] }
        if (context.rootState.search.orderByField) {
          orderBy.book[0].field = context.rootState.search.orderByField
        }
        if (context.rootState.search.orderByDirection) {
          orderBy.book[0].direction = context.rootState.search.orderByDirection
        }
      }

      api(context.rootState.user.token)
        .get('/api/v1/book/find', {
          params: {
            options: {
              term,
              filter,
              orderBy,
              limit: context.rootState.search.limit,
            },
          },
        })
        .then(function (response) {
          context.commit('books', response.data.books)
          context.commit('counter', response.data.counter)
        })
        .finally(function () {
          context.commit('search/isLoading', false, { root: true })
        })
    },
  },
}
