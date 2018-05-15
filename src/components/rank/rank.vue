<template>
    <div class="content">
        <scroll class="scroll" :data="rankList">
            <div>
                <div class="item" v-for="(item, index) in rankList" @click="toDetail(item)">
                    <div class="rank">
                        <div>{{ index + 1 }}</div>
                    </div>
                    <div class="icon">
                        <img width="108" height="144" v-lazy="item.mangapic"/>
                    </div>
                    <div class="text">
                        <h2 class="name">漫画名：{{ item.manganame }}</h2>
                        <p class="name">作者：{{ item.author }}</p>
                        <p class="desc">简介：{{ item.info }}</p>
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
                rankList: []
            }
        },
        created () {
            this.getRankListData()
        },
        methods: {
            //获取榜单列表数据
            getRankListData () {
                let _this = this
                this.rankList = []
                _this.$http.get('/ranklist').then((res)=>{
                    res.data.map(item => {
                    let data = {}
                    data.mangapic = `http://localhost/qizipublic/public/static/cover/` + item.mangapic
                    data.manganame = item.manganame.split("(")[0]
                    data.mangaid = item.id
                    data.author = item.author
                    data.info = item.info
                    data.hit = item.hit
                    _this.rankList.push(data)
                    })
                },(err)=>{
                    console.log(err);
                })
            },

            //查看漫画详情
            toDetail (item) {
                this.$router.push({
                    path: `detail`,
                    query: {
                        mangaid: item.mangaid
                    }
                })
            }
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
          .rank
            flex: 0 0 18px
            width: 18px
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
