import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import i18n from './i18n'
import meta from './meta'
import components from './components'
import './theme.css'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

new Vue({
  router,
  i18n,
  meta,
  components,
  render: (h) => h(App),
}).$mount('#app')
