// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex)
Vue.use(Element)
Vue.use(VueResource)
Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  if (store.state.token) {
    request.headers.set('Authorization', store.state.token);
    next(response => {
      return response;
    })
  } else {
    next(response => {
      return response
    })
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
