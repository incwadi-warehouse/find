import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'search' },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView'),
      props: (route) => ({
        term: route.query.term,
        page: parseInt(route.query.page) || undefined,
        is404: route.params.is404,
      }),
    },
    {
      path: '/book/:book_id',
      name: 'book',
      component: () => import('../views/BookView'),
      props: true,
    },
    {
      path: '*',
      redirect: { name: 'search', params: { is404: true } },
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
