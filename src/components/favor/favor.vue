<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      我的收藏
    </div>
    <scroll class="scroll" :data="favorList">
        <div>
            <ul class="content-wrapper">
                <li class="manga-wrapper" v-for="item in favorList">
                    <img class="manga-img" :src="item.classifyPic">
                    <p class="manga-text">{{ item.classifyName }}</p>
                </li>
            </ul>
        </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions} from 'vuex';
//   import {getRecommend, getDiscList} from 'api/recommend'

  export default {
    data () {
      return {
          favorList: [
                {
                    classifyPic: require('@/assets/qingnian.jpg'),
                    classifyName: '昨日之歌',
                    classifyId: '0'
                },
                {
                    classifyPic: require('@/assets/shaonian.jpg'),
                    classifyName: '哥布林杀手',
                    classifyId: '1'
                },
                {
                    classifyPic: require('@/assets/shaonv.jpg'),
                    classifyName: '会长大人',
                    classifyId: '2'
                },
                {
                    classifyPic: require('@/assets/maoxian.jpg'),
                    classifyName: '异世界魔王',
                    classifyId: '3'
                },
          ]
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
        padding-left: 10px;
    .scroll
        height: 100%
        overflow: hidden
        .content-wrapper
          margin: 0
          .manga-wrapper
            display: inline-block
            width: 30%
            margin: 1% -1% 0% 3%;
            padding: 0
            .manga-img
              display: block
              position: relative
              width: 100%
              min-height: 100px !important
              background-color: #ededed
              border-radius: 2px;
            .manga-text
              color: #000;
              display: block;
              line-height: 15px;
              height: 15px;
              padding-top: 5px;
              overflow: hidden;
              font-size: $font-size-small
</style>