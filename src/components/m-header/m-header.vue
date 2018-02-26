<template>
  <div class="m-header">
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-home3 icon"></i>
    </router-link>
    <h1 class="text">奇子 MANGA</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-search2 icon"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
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
