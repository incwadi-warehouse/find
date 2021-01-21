export default {
  namespaced: true,
  state: {
    term: null,
    isLoading: false,
  },
  mutations: {
    term(state, term) {
      state.term = term
    },
    isLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
}
