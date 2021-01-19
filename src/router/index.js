import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'search',
      component: () => import('../views/SearchView'),
    },
    {
      path: '/book/new',
      name: 'book.new',
      component: () => import('../views/SearchView'),
      props: { showCreateBook: true },
    },
    {
      path: '/book/:bookId',
      name: 'book',
      component: () => import('../views/SearchView'),
      props: true,
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('../views/404View'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  store.commit('app/showOffCanvas', false)
  next()
})

export default router
