<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.subpic">
                <img class="needsclick" @load="loadImage" :src="item.subpic">
              </a>
            </div>
          </slider>
        </div>
        <div v-for="item in discList" class="home-wrapper">
            <div class="part-title">
                <h2 class="part-text">{{ item.title }}</h2>
                <!-- <i class="icon-right_arrow_b"></i> -->
            </div>
            <ul class="content-wrapper">
              <li class="manga-wrapper" v-for="item1 in item.comicList">
                <img class="manga-img" :src="item1.mangaPic">
                <p class="manga-text">{{ item1.mangaName }}</p>
              </li>
            </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Slider from 'base/slider/slider'

  export default {
    data () {
      return {
        recommends: [],
        discList: [
            {
                title: '手冢治虫',
                comicList: [
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    },
                    {
                        mangaName: '怪物王女',
                        mangaPic: 'https://img3.doubanio.com/mpic/s2894690.jpg'
                    },
                    {
                        mangaName: '阿瓦斯',
                        mangaPic: 'https://img3.doubanio.com/mpic/s29592674.jpg'
                    }
                ]
            },
            {
                title: '浅野一二0',
                comicList: [
                    {
                        mangaName: 'SOLANIN',
                        mangaPic: 'https://img3.doubanio.com/mpic/s27206186.jpg'
                    },
                    {
                        mangaName: '光之城',
                        mangaPic: 'https://img3.doubanio.com/mpic/s2851336.jpg'
                    },
                    {
                        mangaName: 'I"s',
                        mangaPic: 'https://img1.doubanio.com/mpic/s2725548.jpg'
                    }
                ]
            }
        ]
      }
    },
    created () {
      this.getData()
    },
    methods: {
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      getData(){
        let _this = this;
        this.recommends = []
        _this.$http.get('/test').then((res)=>{
          _this.recommends = res.data
          console.log(res.data)
        },(err)=>{
          console.log(err);
        })
      }

    },
    components: {
      Slider,
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
      .home-wrapper
        width: 100%
        height: auto
        .part-title
          width: 100%
          height: 35px
          line-height: 35px
          background-color: $color-theme-d
          .part-text
            display: inline-block
            color: $color-theme
            margin-left: 10px
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
