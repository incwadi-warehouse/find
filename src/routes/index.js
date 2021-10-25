export default [
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
      branch: parseInt(route.query.branch),
      is404: route.params.is404,
    }),
  },
  {
    path: '/book/:book',
    name: 'book',
    component: () => import('../views/BookView'),
    props: true,
  },
  {
    path: '*',
    redirect: { name: 'search', params: { is404: true } },
  },
]
