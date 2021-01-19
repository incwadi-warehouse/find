import Vue from 'vue'
import Vuex from 'vuex'
import book from './book'
import user from './user'
import search from './search'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    book,
    user,
    search,
  },
})
