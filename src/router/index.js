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
import Classifylist from 'components/classifylist/classifylist'
import Detail from 'components/detail/detail'
import Content from 'components/content/content'
import Article from 'components/article/article'
import Search from 'components/search/search'
import Comments from 'components/comments/comments'

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
    },
    {
      path: '/classifylist',
      component: Classifylist
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/content',
      component: Content
    },
    {
      path: '/article',
      component: Article
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/comments',
      component: Comments
    }
  ]
})
