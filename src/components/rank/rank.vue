<template>
    <div class="content">
        <scroll class="scroll" :data="rankList">
            <div>
                <div class="item" v-for="item in rankList">
                    <div class="icon">
                        <img width="108" height="144" v-lazy="item.img"/>
                    </div>
                    <div class="text">
                        <h2 class="name">漫画名：{{ item.mangaName }}</h2>
                        <p class="desc">作者：{{ item.author }}</p>
                        <p class="desc">简介：{{ item.desc }}</p>
                    </div>
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
                rankList: [
                    {
                        img: 'https://img3.doubanio.com/lpic/s3404982.jpg',
                        mangaName: '奇子',
                        desc: '昭和24年，从战争中复员的天外仁朗成为了谍报机关的工作人员，某次因命令杀害了共产主义小组的一名男性成员，而这名男性成员则是仁朗的妹妹天外志子的恋人。',
                        author: '手冢治虫'
                    },
                    {
                        img: 'https://img3.doubanio.com/lpic/s3404982.jpg',
                        mangaName: '奇子',
                        desc: '昭和24年，从战争中复员的天外仁朗成为了谍报机关的工作人员，某次因命令杀害了共产主义小组的一名男性成员，而这名男性成员则是仁朗的妹妹天外志子的恋人。',
                        author: '手冢治虫'
                    },
                    {
                        img: 'https://img3.doubanio.com/lpic/s3404982.jpg',
                        mangaName: '奇子',
                        desc: '昭和24年，从战争中复员的天外仁朗成为了谍报机关的工作人员，某次因命令杀害了共产主义小组的一名男性成员，而这名男性成员则是仁朗的妹妹天外志子的恋人。',
                        author: '手冢治虫'
                    },
                    {
                        img: 'https://img3.doubanio.com/lpic/s3404982.jpg',
                        mangaName: '奇子',
                        desc: '昭和24年，从战争中复员的天外仁朗成为了谍报机关的工作人员，某次因命令杀害了共产主义小组的一名男性成员，而这名男性成员则是仁朗的妹妹天外志子的恋人。',
                        author: '手冢治虫'
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
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 108px
            width: 108px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              color: $color-text
</style>
