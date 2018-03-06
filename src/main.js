// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
// import store from './store'

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})

/* eslint-disable no-new */
Vue.use(Mint)
new Vue({
  el: '#app',
  render: h => h(App),
  router
  // store
})
