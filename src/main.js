// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/'
import Mint from 'mint-ui'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
// import store from './store'

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) { 
  return response
}, function (error) {
  return Promise.reject(error)
})
axios.defaults.baseURL = 'http://localhost:2222/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios
/* axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; */


if (window.sessionStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo))
}


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.user_id) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    console.log('some')
  } else {
    console.log('ooo')
    next()
  }
})

/* eslint-disable no-new */
Vue.use(Mint)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
