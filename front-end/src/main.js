import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import user from './assets/users.js'
import project from './assets/projects.js'

let data = {
  users: user,
  projects: project,
  signIn: false,
  accepted: 0
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)