import '@mdi/font/css/materialdesignicons.css'
// import 'sweetalert2/src/sweetalert2.css'
import './assets/scss/app.scss'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './shared/helpers/currency'
import './shared/directives'
import './shared/filters'
import './plugins/echarts';
import './plugins/apexcharts';



Vue.config.productionTip = false

window._Vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
