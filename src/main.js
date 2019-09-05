import 'font-awesome/css/font-awesome.css'
import 'fullcalendar/dist/fullcalendar.css'
import Vue from 'vue'
import store from './config/store'
import './config/bootstrap'
import './config/axios'
import './config/msgs'
import './config/disqus'
import './config/tags'
import './config/mask'
import App from './App'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')