<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
                <img class="needsclick" @load="loadImage" :src="item.subpic">
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
                <img class="manga-img" :src="item1.mangapic" @click="toDetail(item1)">
                <p class="manga-text">{{ item1.manganame }}</p>
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
        tempList: [],
        discList: [
            {
                projectId: '1',
                title: '手冢治虫',
                comicList: [
                    {
                        mangaid: '1',
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
      this.getHomeData()
    },
    methods: {
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },

      //轮播数据
      getData (){
        let _this = this;
        this.recommends = []
        _this.$http.get('/test').then((res)=>{
          res.data.map(item => {
              let data = {}
              data.subpic = `http://localhost/qizipublic/public/static/subject/` + item.subpic
              _this.recommends.push(data)
            })
        },(err)=>{
          console.log(err);
        })
      },

      //主页数据
      getHomeData (){
        let _this = this;
        this.tempList = []
        _this.$http.get('/projectList').then((res)=>{
          _this.tempList = res.data
          console.log(_this.tempList)
          this.fommatHomeData()
        },(err)=>{
          console.log(err);
        })
      },

      //fomat
      fommatHomeData () {
        this.discList = []
        for (let i = 0; i < this.tempList.length;) {
          let count = 0
          let data = {}
          data.comicList = []
          for (let j = 0; j < this.tempList.length; j ++) {
            if (this.tempList[i].id == this.tempList[j].id) {
              count ++
              this.tempList[j].mangapic = `http://localhost/qizipublic/public/static/cover/` + this.tempList[j].mangapic
              this.tempList[j].manganame = this.tempList[j].manganame.split("(")[0]
              data.comicList.push(this.tempList[j])
            }
          }
          data.projectId = this.tempList[i].id
          data.title = this.tempList[i].projecttitle
          this.discList.push(data)
          i += count
          console.log(this.discList)
        }
      },

      //查看漫画详情
      toDetail (item1) {
        this.$router.push({
          path: `detail`,
          query: {
            mangaid: item1.mangaid
          }
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
            margin: 1% -1% 1% 3%
            padding: 0
            .manga-img
              display: block
              position: relative
              width: 100%
              height: 30%
              min-height: 100px !important
              background-color: #ededed
              border-radius: 2px
            .manga-text
              color: #000
              display: block
              line-height: 15px
              height: 15px
              padding-top: 5px
              overflow: hidden
              font-size: $font-size-small
</style>
