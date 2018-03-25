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
                        <p class="name">作者：{{ item.author }}</p>
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
                        img: 'https://img3.doubanio.com/mpic/s2851336.jpg',
                        mangaName: '光之城',
                        desc: '對生活完全提不起勁的青年和一心只想賺大錢買回自己城市的青年，誰離夢想比較近？「有沒有道理，有沒有意義並不重要，重要的是相信什麽才會感到幸福。」',
                        author: '浅野一二0'
                    },
                    {
                        img: 'https://img3.doubanio.com/lpic/s3148401.jpg',
                        mangaName: 'Monster',
                        desc: '天马贤三是从日本渡海而来的年轻外科医生。目前在德国艾斯勒医院海尼曼医疗小组担任外科组长。天马出众的外科技巧使他深受外科主任的赏识，院长把自己的爱女爱玛许给了天马作未婚夫，并暗示了将来一定会让他荣升的想法。',
                        author: '浦泽直树'
                    },
                    {
                        img: 'https://img3.doubanio.com/mpic/s2959263.jpg',
                        mangaName: '缎带骑士',
                        desc: '被日本人誉为"漫画之神","不死虫","漫画之王"的手冢治虫,在众多的代表作中,《缎带骑士》无疑是最特殊的一部.由于它少女漫画的风格明确,与手冢一贯的作品大异奇趣,所以不仅受到手冢迷的欢迎,同时也博得众多女性读者的喜爱',
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
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              color: $color-text
</style>
