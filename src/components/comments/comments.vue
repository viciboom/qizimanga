<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      评论漫画
    </div>
    <div class="pwd-content">
        <textarea class="input-text" placeholder="请输入评论信息" v-model="info"></textarea>
        <button class="button" @click="postInfo()">提交评论</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'

  export default {
    data () {
      return {
        mangaid: '',
        userid: '',
        info: '',
        time: ''
      }
    },
    created () {
        this.$store.dispatch('hideNav');
        this.mangaid = this.$route.query.mangaid
        this.userid = this.$route.query.userid
        let a = new Date()
        this.time = a
        console.log(a + 'ppp')
    },
    methods: {
        //返回
        back () {
            this.$router.go(-1)
        },

        //提交评论
        postInfo () {
            let _this = this
            if (_this.info == '') {
                alert('评论不能为空')
            } else {
            _this.$http.post('/postcomment', {
                mangaid: _this.mangaid,
                userid: _this.userid,
                comment: _this.info
                // time: _this.time
            }).then((res) => {
                console.log(res)
                if (res.status == 200) {
                if (res.data.status == '1') {
                    _this.$router.push({
                    path:  `/detail`,
                        query: {
                            mangaid: _this.mangaid
                        }
                    })
                } else {
                    alert('服务器出错')
                }
                }
            })
            }
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
    .pwd-content
        width: 100%
        text-align: center
        .input-text
            width: 80%
            height: 150px
            margin: 10px
            font-size: $font-size-medium
            color: #000
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