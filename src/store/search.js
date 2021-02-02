import api from '../api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    term: null,
    books: [],
  },
  mutations: {
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    term(state, term) {
      state.term = term
    },
    books(state, books) {
      state.books = books
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
          context.commit('books', response.data)
        })
        .finally(function () {
          context.commit('isLoading', false)
        })
    },
  },
}
