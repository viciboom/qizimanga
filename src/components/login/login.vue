<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      登录
    </div>
    <div class="pwd-content">
        <input class="input-text" v-model="phone" placeholder="请输入手机号码">
        <input type="password" v-model="password" class="input-text" placeholder="请输入密码">
        <button class="button" @click="goLogin()">登录</button>
        <button class="button" @click="toReg()">注册</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions} from 'vuex';

  export default {
    data () {
      return {
        phone: '',//手机号
        password: '',//密码
        userInfo: {},//用户信息
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
      //登录
      goLogin(){
				let _this = this;
				if(_this.phone ==''){
					alert('请输入手机号');
				}else if(_this.password == ''){
					alert('请输入密码');
				}else{
					_this.$http.post('/login',{
						loginPhone:_this.phone,
						loginPwd:_this.password,
					}).then((res)=>{
						// console.log(_this.password);
					if(res.status == 200){
						_this.userInfo = res.data;
						if(_this.userInfo.status == 1){
							//LOGIN success
							window.sessionStorage.userInfo = JSON.stringify(_this.userInfo);
              _this.$store.dispatch('setUserInfo', _this.userInfo);
              console.log(_this.$store);
              let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
              _this.$router.push({
                  path: redirect
              });
						}else{
							alert(_this.userInfo.msg);
						}
					}else{
						alert('请求出现错误');
					}
						console.log(res);
					},(err)=>{
						console.log(err);
					});
				}
      },

      //前往注册页
      toReg () {
        this.$router.push({
          path: `/reg`
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
        height: 74%
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
            color: $color-text-theme-font
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