import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Special from 'components/special/special'
import Rank from 'components/rank/rank'
import Classify from 'components/classify/classify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/special',
      component: Special
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
