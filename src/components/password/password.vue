<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      修改密码
    </div>
    <div class="pwd-content">
        <input class="input-text" placeholder="请输入原密码">
        <input class="input-text" placeholder="请输入新密码">
        <button class="button">确认修改</button>
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
        phone: '',
        username: '',
        gender: '',
        info: ''
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
  .wrapper
    width: 100%;
    .header
      height: 44px
      margin: 0 auto
      padding-right: 10px;
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
        width: 100%
        text-align: center
        .input-text
            width: 80%
            height: 35px
            margin: 10px
            line-height 35px
            font-size: $font-size-medium
            color: $color-theme
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