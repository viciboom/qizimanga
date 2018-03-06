<template>
    <div class="content">
        <scroll class="scroll" :data="specialList">
            <div>
            <div class="img-wrapper" v-for="item in specialList">
                <img class="img" :src="item.img">
                <p class="title">{{ item.imgTitle}}</p>
            </div>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    export default {
        data () {
            return {
                specialList: [
                    {
                        img: 'https://images.dmzj.com/tuijian/750_480/180301yuanliantj1.jpg',
                        imgTitle: 'garo 关于猫汤'
                    },
                    {
                        img: 'https://images.dmzj.com/tuijian/750_480/180305xinwentj1.jpg',
                        imgTitle: '周刊新连载！'
                    },
                    {
                        img: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg',
                        imgTitle: '骑士小说大纲'
                    },
                ]
            }
        },
        created () {

        },
        methods: {

        },
        components: {
            Scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
    .content
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
      .scroll
        height: 100%
        overflow: hidden
      .img
        display: block
        width: 100%
        border-radius: 2px
      .title
        font-family: '微软雅黑'
        font-weight: 600
        font-size: $font-size-large
        line-height: 30px
        text-align: center
</style>
