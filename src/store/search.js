import api from '../api'

export default {
  namespaced: true,
  state: {
    term: null,
    isLoading: false,
    books: [],
    counter: 0,
  },
  mutations: {
    term(state, term) {
      state.term = term
    },
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    books(state, books) {
      state.books = books
    },
    counter(state, counter) {
      state.counter = counter
    },
  },
  actions: {
    find(context) {
      context.commit('isLoading', true)
      api()
        .get('/api/public/book/find', {
          params: {
            options: {
              term: context.state.term,
            },
          },
        })
        .then(function (response) {
          context.commit('books', response.data.books)
          context.commit('counter', response.data.counter)
        })
        .finally(function () {
          context.commit('isLoading', false)
        })
    },
  },
}
