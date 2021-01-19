import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import components from '@baldeweg/components'
import VueMeta from 'vue-meta'

Vue.use(components)
Vue.themes()
Vue.use(VueMeta, {
  keyName: 'head',
})
Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('SW registered!')
        })
        .catch(() => {
          console.log('SW registration failed!')
        })
    })
  }
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App,
  },
})
