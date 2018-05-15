<template>
  <div class="wrapper">
    <div class="header">
      <i class="icon-undo" @click="back()"></i>
      个人信息
    </div>
    <div class="toppic">
      <img :src="userCover" class="uercover">
      <div class="userpic-wrapper">
        <img class="userpic" :src="userInfoData.avatar">
      </div>
    </div>
    <div class="content">
      <div class="content-wrapper">
        <div class="item">
          <span class="text">手机号：</span>
          <input class="user-input" v-model="userInfoData.phone" disabled>
        </div>
        <div class="item">
          <span class="text">用户名：</span>
          <input class="user-input" v-model="userInfoData.username">
        </div>
        <div class="item">
          <span class="text">性别：</span>
          <mt-radio v-model="userInfoData.gender" :options="['男', '女']" class="user-input">
          </mt-radio>
        </div>
        <div class="item">
          <span class="text">签名：</span>
          <textarea class="user-input" v-model="userInfoData.info"></textarea>
        </div>
        <button class="button" @click="change('id')">修改密码</button>
        <button class="button" @click="myfavor('id')">我的收藏</button>
        <button class="button" @click="save('id')">保 存</button>
        <button class="button" @click="logout()">注销</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters,mapActions} from 'vuex';
import VueCoreImageUpload  from 'vue-core-image-upload'
//   import {getRecommend, getDiscList} from 'api/recommend'

  export default {
    data () {
      return {
        id: '1',
        userCover: require('@/assets/userinfo.jpg'),
        userInfoData: {
          id: '',
          avatar: '',
          username: '',
          gender: '',
          info: ''
        },
        default: require('@/assets/logo.png')
      }
    },
    created () {
      this.$store.dispatch('hideNav')
      this.getUserInfo()
    },
    watch: {

    },
    methods: {

      //获取用户信息
      getUserInfo () {
				let _this = this;
				let uObj ={};
				if(window.sessionStorage.userInfo){
					let uObj = JSON.parse(window.sessionStorage.userInfo);
					let useId = uObj.id;
					_this.$http.get('/userinfo',{
						params:{
							uId:useId
						}
					}).then((res)=>{
            _this.userInfoData.id = res.data.id
            _this.userInfoData.phone = res.data.phone
            _this.userInfoData.username = res.data.username
            _this.userInfoData.gender = res.data.gender
            _this.userInfoData.info = res.data.info
            _this.userInfoData.avatar = `http://localhost/qizipublic/public/static/avatar/0.jpg`
            // if (res.data.avatar == '' || res.data.avatar == undefined) {
            //   _this.userInfoData.avatar = _this.default
            // } else {
            //   _this.userInfoData.avatar = res.data.avatar
            // }
					},(err)=>{
						console.log(err);
					});
				}else{
					_this.$router.push({
						path:'/login',
					})
				}
      },
      
      //返回
      back () {
        this.$router.go(-1)
      },

      //修改密码跳转
      change () {
        this.$router.push({
            path: `/password`,
            query: {
              userId: this.id
            }
        })
      },

      //我的收藏跳转
      myfavor () {
        this.$router.push({
            path: `/favor`,
            query: {
              userId: this.id
            }
        })
      },

      //保存
      save () {
        let _this = this
        _this.$http.get('/updateuserinfo', {
            params: {
                userid: _this.userInfoData.id,
                username: _this.userInfoData.username,
                gender: _this.userInfoData.gender,
                info: _this.userInfoData.info
            }
        }).then((res) => {
            console.log(res)
            alert('修改成功')
        }, (err) => {
            console.log(err)
        })
      },

      //登出
      logout () {
        sessionStorage.removeItem('userInfo')
        this.$router.push({
          path: `/home`
        })
      }
    },
    components: {
      Scroll,
      VueCoreImageUpload
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
    .toppic
      width: 100%
      height: 43%
      min-height: 300px
      .uercover
        position: absolute
        width: 100%
        height: 43%
        background-size: cover
      .userpic-wrapper
        z-index: 50
        width: 100%
        height: 100%
        text-align: center
        .userpic
          position: relative
          width: 135px
          height: 135px
          margin: 60px auto 0 auto
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100%
    .content
      width: 100%
      margin-top:100px
      margin: 0
      .content-wrapper
        padding: 20px
        .item
          display: flex
          padding: 5px
          box-sizing: border-box
          align-items: center
          .mint-cell-title
            display: inline-block
          .text
            flex: 0 0 83px
            width: 83px
          .user-input
              display: flex
              flex-direction: column
              justify-content: center
              flex: 1
              line-height: 20px
              overflow: hidden
              font-size: $font-size-medium
        .button
          width: 100%
          height: 35px
          margin: 5px
          line-height 35px
          font-size: $font-size-medium
          color: $color-theme
          background-color: $color-theme-d
          border: none
          border-radius: 10px
          
</style>