<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      我的收藏
    </div>
    <div class="scroll">
        <div>
            <ul class="content-wrapper">
                <li class="manga-wrapper" v-for="item in favorList" @click="toDetail(item)">
                    <img class="manga-img" :src="item.mangapic">
                    <p class="manga-text">{{ item.manganame }}</p>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'

  export default {
    data () {
      return {
          userid: '',
          favorList: []
      }
    },
    created () {
      this.$store.dispatch('hideNav');
      this.userid = this.$route.query.userId
      console.log(this.userid)
      this.getFavorList()
    },
    methods: {
      //返回
      back () {
        this.$router.go(-1)
      },

      //收藏列表
      getFavorList () {
        let _this = this;
          this.favorList = []
          _this.$http.get('/favorlist',{
						params:{
							userid: _this.userid
						}
					}).then((res)=>{
            res.data.map(item => {
              let data = {}
              data.mangapic = `http://localhost/qizipublic/public/static/cover/` + item.mangapic
              data.manganame = item.manganame.split("(")[0]
              data.mangaid = item.mangaid
              data.favorid = item.id
              _this.favorList.push(data)
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

    },
    computed:mapGetters(['loading','shownav']),
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .wrapper
    width: 100%
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
    .scroll
        height: 100%
        overflow: hidden
        .content-wrapper
          margin: 0
          .manga-wrapper
            display: inline-block
            width: 30%
            height: auto
            margin: 1% -1% 0% 3%
            padding: 0
            .manga-img
              display: block
              position: relative
              width: 100%
              min-height: 100px !important
              background-color: #ededed
              border-radius: 2px
            .manga-text
              color: #000
              display: block
              line-height: 15px
              height: 15px
              padding-top: 5px
              overflow: hidden
              font-size: $font-size-small
</style>