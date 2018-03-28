<template>
  <div class="m-header">
    <router-link v-if="status" tag="div" class="mine" to="/user">
      <i class="icon-home3 icon"></i>
    </router-link>
    <router-link v-if="!status" tag="div" class="mine" to="/login">
      <i class="icon-home3 icon"></i>
    </router-link>
    <h1 class="text">奇子 MANGA</h1>
    <router-link tag="div" class="mine" to="/search">
      <i class="icon-search2 icon"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      data () {
        return {
          userInfo: '',
          status: false
        }
    },
    created () {
      this.userInfo = window.sessionStorage.userInfo
      if (this.userInfo == '' || this.userInfo == undefined) {
        this.status = false
      } else {
        this.status = true
      }
      console.log(this.status)
      console.log(this.userInfo)
    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    display: flex
    height: 44px
    width: 80%
    margin: 0 auto
    text-align: center
    color: $color-theme-d
    font-size: 0
    .text
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      flex: 1
      position: relative
      top: 0
      right: 0
      .icon
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme-d
</style>
