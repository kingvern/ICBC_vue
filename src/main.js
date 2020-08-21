import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import fetch from './config/fetch'
import './style/common'
import './config/rem'
import axios from 'axios'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
Vue.use(VueRouter);
// Vue.use(ElementUI);

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
}).$mount('#app');
