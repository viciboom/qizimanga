<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      搜索
    </div>
    <div class="search-title">
        <div class="search-wrapper">
        <input v-model="search" class="search-input">
        <button class="search-btn" @click="searchManga()">搜索</button>
        </div>
    </div>
    <div class="list-wrapper">
        <div class="item" v-for="item in searchList" @click="toDetail(item)">
            <div class="icon">
                <img width="108" height="144" v-lazy="item.img"/>
            </div>
            <div class="text">
                <h2 class="name">漫画名：{{ item.manganame }}</h2>
                <p class="name">作者：{{ item.author }}</p>
                <p class="desc">简介：{{ item.desc }}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex';

  export default {
    data () {
      return {
          id: '',
          search: '',
          searchList: []
      }
    },
    created () {
      this.$store.dispatch('hideNav')
    },
    methods: {
        //返回
        back () {
            this.$router.go(-1)
        },

        //搜索按钮
        searchManga () {
            let _this = this
            _this.$http.get('/search', {
              params: {
                search: _this.search
              }
            }).then((res) => {
              res.data.map(item => {
                let data = {}
                data.img = `http://localhost/qizipublic/public/static/cover/` + item.mangapic
                data.manganame = item.manganame.split("(")[0]
                data.mangaid = item.id
                data.author = item.author
                data.desc = item.info
                _this.searchList.push(data)
              })
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

<style scoped lang="stylus" rel="stylesheet/stylus">
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
    .search-title
        margin: 10px auto
        height: 30px
        .search-wrapper
            margin: 0 auto
            width: 340px
            .search-input
                width: 270px
                height: 30px
            .search-btn
                width: 60px
                height: 30px
                font-size: $font-size-small
                color: #fff
                background-color: $color-theme-d
    .list-wrapper
        width: 100%
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 108px
            width: 108px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              color: $color-text
</style>