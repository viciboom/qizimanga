import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import Special from 'components/special/special'
import Rank from 'components/rank/rank'
import Classify from 'components/classify/classify'
import User from 'components/user/user'
import Password from 'components/password/password'
import Favor from 'components/favor/favor'
import Reg from 'components/reg/reg'
import Login from 'components/login/login'

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
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/password',
      component: Password
    },
    {
      path: '/favor',
      component: Favor
    },
    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
