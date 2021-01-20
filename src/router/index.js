import Vue from 'vue'
import Router from 'vue-router'

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
      path: '*',
      name: 'not-found',
      component: () => import('../views/404View'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
