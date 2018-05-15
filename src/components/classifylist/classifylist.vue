<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      {{tTitle}}
    </div>
    <scroll class="scroll" :data="classifyList">
        <div>
            <ul class="content-wrapper">
                <li class="manga-wrapper" v-for="item in classifyList" >
                    <img class="manga-img" :src="item.classifyPic" @click="toDetail(item)">
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

  export default {
    data () {
      return {
          classifyList: [],
          tid: '',
          tTitle: '',
      }
    },
    created () {
      this.$store.dispatch('hideNav');
      this.tid = this.$route.query.tid
      this.tTitle = this.$route.query.classifyName
      this.getListData()
    },
    methods: {
      //返回
      back () {
        this.$router.go(-1)
      },

      //列表数据
      getListData () {
        let _this = this
        _this.$http.get('/classifylist',{
          params: {
              tid: _this.tid
          }
        }).then((res)=>{
          _this.classifyList = []
          // console.log(res.data)
          res.data.map(item => {
            let data = {}
            data.classifyPic = `http://localhost/qizipublic/public/static/cover/` + item.mangapic
            data.classifyName = item.manganame.split("(")[0]
            data.mangaid = item.id
            _this.classifyList.push(data)
          })
        },(err)=>{
          console.log(err);
        })
      },

      //查看漫画详情
      toDetail (item) {
        this.$router.push({
          path: `detail`,
          query: {
            mangaid: item.mangaid
          }
        })
      }

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