<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      专题
    </div>
    <div class="content-wrapper">
        <div class="title">
            {{ special.title }}
        </div>
        <div class="content" v-html="special.content">
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex';
//   import {getRecommend, getDiscList} from 'api/recommend'

  export default {
    data () {
      return {
          id: '',
          special: {
              title: '2222222',
              content: '255555555555555555555555'
          }
      }
    },
    created () {
      this.$store.dispatch('hideNav')
      this.id = this.$route.query.id
      this.getSpecialDetail()
    },
    methods: {
        //返回
        back () {
            this.$router.go(-1)
        },
        getSpecialDetail () {
            let _this = this;
            this.special = {}
            _this.$http.get('/specialDetail',{
                params:{
                    id: _this.id
                }
            }).then((res)=>{
                _this.special = res.data
            },(err)=>{
                console.log(err);
            })
        },

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
    .content-wrapper
        margin: 0
        width: 100%
        .title
          margin: 5px
          font-size: $font-size-large
          color: $color-theme-d
          text-align: center
        .content
          margin: 10px
          text-indent:2em
          height: 20px
          line-height: 20px
          font-size: $font-size-medium-x
</style>