import api from '../api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    term: null,
    books: [],
    pages: 1,
    page: 1,
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
    pages(state, pages) {
      state.pages = pages
    },
    page(state, page) {
      state.page = page
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
              offset: context.state.page * 20 - 20,
            },
          },
        })
        .then(function (response) {
          context.commit('books', response.data.books)
          context.commit('pages', Math.ceil(response.data.counter / 20))
        })
        .finally(function () {
          context.commit('isLoading', false)
        })
    },
  },
}
