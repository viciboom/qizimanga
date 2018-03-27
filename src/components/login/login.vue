<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      登录
    </div>
    <div class="pwd-content">
        <input class="input-text" placeholder="请输入手机号码">
        <input type="password" class="input-text" placeholder="请输入密码">
        <button class="button">登录</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions} from 'vuex';
//   import {getRecommend, getDiscList} from 'api/recommend'

  export default {
    data () {
      return {
        id: '1',
      }
    },
    created () {
      this.$store.dispatch('hideNav');
    },
    methods: {
      //返回
      back () {
        this.$router.go(-1)
      },

    },
    components: {
      Scroll
    },
    computed:mapGetters(['loading','shownav']),
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  html, body
    height: 100%
  .wrapper
    width: 100%
    height: 100%
    .header
      height: 44px
      margin: 0 auto
      padding-right: 10px
      text-align: center
      color: $color-theme-d
      font-size: 18px
      line-height: 44px
      border-bottom: 1px solid $color-theme-d
      .icon-undo
        float: left
        height: 44px
        line-height: 44px
        padding-left: 10px
    .pwd-content
        height: 75%
        width: 100%
        background: url(../../assets/loginbg0.jpg)
        background-size:100%
        text-align: center
        padding-top: 130px
        .input-text
            width: 80%
            min-height: 35px
            margin: 10px
            line-height 35px
            font-size: $font-size-medium
            color: $color-theme
            border-radius: 5px
        .button
            display: block
            width: 300px
            height: 35px
            margin:50px auto 5px auto
            line-height: 35px
            font-size: $font-size-medium
            color: $color-theme
            background-color: $color-theme-d
            border: none
            border-radius: 10px
</style>