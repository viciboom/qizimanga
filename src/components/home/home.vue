<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div v-for="item in discList" class="home-wrapper">
            <div class="part-title">
                <h2 class="part-text">{{ item.title }}</h2>
                <i class="icon-right_arrow_b"></i>
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
//   import {getRecommend, getDiscList} from 'api/recommend'
//   import {ERR_OK} from 'api/config'

  export default {
    data () {
      return {
        recommends: [
            {
                linkUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg',
                picUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg'
            },
            {
                linkUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg',
                picUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg'
            },
            {
                linkUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg',
                picUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg'
            },
            {
                linkUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg',
                picUrl: 'https://images.dmzj.com/tuijian/750_480/180205youxizhongxintj1.jpg'
            }
        ],
        discList: [
            {
                title: '远古巨鱼',
                comicList: [
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    },
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    },
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    }
                ]
            },
            {
                title: '手冢治虫',
                comicList: [
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    },
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    },
                    {
                        mangaName: '奇子',
                        mangaPic: 'https://img3.doubanio.com/lpic/s3404982.jpg'
                    }
                ]
            }
        ]
      }
    },
    created () {

    },
    methods: {
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
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
          .icon-right_arrow_b
            display: inline-block
            margin-left: 70%
            color: $color-theme
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
