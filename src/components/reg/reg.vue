<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      注册
    </div>
    <div class="pwd-content">
        <input class="input-text" v-model="username" placeholder="请填写用户名">
        <input class="input-text" v-model="phone" placeholder="请输入手机号码">
        <input class="input-text" type="password" v-model="password" placeholder="请输入密码">
        <input class="input-text" type="password" v-model="repassword" placeholder="请确认密码">
        <button class="button" @click="doReg()">立即注册</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions} from 'vuex';

  export default {
    data () {
      return {
        id: '1',
        username: '',
        phone: '',
        password: '',
        repassword: ''
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

      //注册
      doReg () {
        let _this = this
        if (_this.username == '') {
          alert('请填写用户名')
        } else if (_this.password == '') {
          alert('请填写密码')
        } else if (_this.phone == '') {
          alert('请填写手机号')
        } else if (_this.password != _this.repassword) {
          alert('两次密码填写不同！')
        } else {
          _this.$http.post('/reg', {
            regName: _this.username,
            regPhone: _this.phone,
            regPwd: _this.password
          }).then((res) => {
            if (res.status == 200) {
              if (res.data.status == '1') {
                this.$router.push({
                  path:  `/login`
                })
              } else {
                alert('服务器出错')
              }
            }
          })
        }
      },

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