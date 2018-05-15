<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      修改密码
    </div>
    <div class="pwd-content">
        <input class="input-text" placeholder="请输入原密码" v-model="password">
        <input class="input-text" placeholder="请输入新密码" v-model="newpassword">
        <button class="button" @click="checkPasswordData()">确认修改</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
const common = require('../../../libs/common')

  export default {
    data () {
      return {
        userid: '1',
        password: '',
        newpassword: '',
        oldpassword: ''
      }
    },
    created () {
      this.$store.dispatch('hideNav')
      this.userid = this.$route.query.userId
    },
    methods: {
      //返回
      back () {
        this.$router.go(-1)
      },

      //检查密码
      checkPasswordData () {
        let password = common.md5(this.password + common.MD5_SUFFXIE)
        let _this = this
        _this.$http.get('/checkpassword',{
          params:{
							userid: _this.userid
						}
        }).then((res)=>{
            _this.oldpassword = res.data.password
        },(err)=>{
            console.log(err)
        })
        if (password == _this.oldpassword || _this.newpassword!= '') {
          _this.$http.get('/uploadpassword',{
              params: {
                  userid: _this.userid,
                  password: _this.newpassword
              }
              }).then((res)=>{
              console.log(_this.userid + 'xxxx')
              console.log(_this.newpassword + 'xxxx')
              sessionStorage.removeItem('userInfo')
              _this.$router.push({
                path: `/home`
              })
          },(err)=>{
              console.log(err);
          })
        } else {
          alert('请输入正确密码')
        }
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
    .pwd-content
        width: 100%
        text-align: center
        .input-text
            width: 80%
            height: 35px
            margin: 10px
            line-height 35px
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