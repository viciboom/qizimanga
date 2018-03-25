<template>
    <div class="content">
        <scroll class="scroll" :data="classifyList">
            <div>
                <ul class="content-wrapper">
                    <li class="manga-wrapper" v-for="item in classifyList">
                        <img class="manga-img" :src="item.classifyPic">
                        <p class="manga-text">{{ item.classifyName }}</p>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    export default {
        data () {
            return {
                classifyList: [
                    {
                        classifyPic: require('@/assets/qingnian.jpg'),
                        classifyName: '青年',
                        classifyId: '0'
                    },
                    {
                        classifyPic: require('@/assets/shaonian.jpg'),
                        classifyName: '少年',
                        classifyId: '1'
                    },
                    {
                        classifyPic: require('@/assets/shaonv.jpg'),
                        classifyName: '少女',
                        classifyId: '2'
                    },
                    {
                        classifyPic: require('@/assets/maoxian.jpg'),
                        classifyName: '冒险',
                        classifyId: '3'
                    },
                    {
                        classifyPic: require('@/assets/mofa.jpg'),
                        classifyName: '魔法',
                        classifyId: '4'
                    },
                    {
                        classifyPic: require('@/assets/lianai.jpg'),
                        classifyName: '恋爱',
                        classifyId: '5'
                    },
                    {
                        classifyPic: require('@/assets/gaoxiao.jpg'),
                        classifyName: '搞笑',
                        classifyId: '6'
                    },
                    {
                        classifyPic: require('@/assets/oumei.jpg'),
                        classifyName: '欧美',
                        classifyId: '7'
                    },
                    {
                        classifyPic: require('@/assets/xuanyi.jpg'),
                        classifyName: '悬疑',
                        classifyId: '8'
                    },
                    {
                        classifyPic: require('@/assets/zhentan.jpg'),
                        classifyName: '侦探',
                        classifyId: '9'
                    },
                    {
                        classifyPic: require('@/assets/meishi.jpg'),
                        classifyName: '美食',
                        classifyId: '10'
                    },
                    {
                        classifyPic: require('@/assets/kehuan.jpg'),
                        classifyName: '科幻',
                        classifyId: '11'
                    }
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
        .content-wrapper
          margin: 0
          .manga-wrapper
            display: inline-block
            width: 30%
            margin: 1% -1% 0% 3%;
            padding: 0
            .manga-img
              display: block
              position: relative
              width: 100%
              min-height: 100px !important
              background-color: #ededed
              border-radius: 2px;
            .manga-text
              color: #000;
              display: block;
              line-height: 15px;
              height: 15px;
              padding-top: 5px;
              overflow: hidden;
              font-size: $font-size-small
</style>
