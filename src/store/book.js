import api from '../api'

export default {
  namespaced: true,
  state: {
    books: [],
    counter: 0,
  },
  mutations: {
    books(state, books) {
      state.books = books
    },
    counter(state, counter) {
      state.counter = counter
    },
  },
  actions: {
    find(context) {
      context.commit('search/isLoading', true, { root: true })

      let term = undefined
      if (context.rootState.search.term) {
        term = context.rootState.search.term
      }

      api(context.rootState.user.token)
        .get('/api/public/book/find', {
          params: {
            options: {
              term,
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
