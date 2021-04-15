import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
      page: parseInt(route.query.page),
    }),
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFoundView'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
