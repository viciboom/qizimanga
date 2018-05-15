<template>
  <div class="wrapper">
    <div v-for="item in contentList" class="img-wrapper">
        <img :src="item.mangapic" class="img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'

  export default {
    data () {
        return {
            partid: '',
            manganame: '',
            contentList: []
        }
    },
    created () {
        this.$store.dispatch('hideNav')
        this.partid = this.$route.query.partid
        this.manganame = this.$route.query.manganame
        this.getMangaContentListData()
    },
    methods: {
            //获取漫画章节列表
            getMangaContentListData () {
                let _this = this
                _this.$http.get('/contentlist', {
                    params: {
                        partid: _this.partid
                    }
                }).then((res) => {
                    let allUrl = res.data[0].pic
                    let temp = []
                    temp = allUrl.split(";")
                    for (let i = 0; i <= temp.length - 2; i ++) {
                        let data = {}
                        data.mangapic = `http://localhost/manga/` + _this.manganame + `/` + res.data[0].partname + `/` + temp[i]
                        console.log(temp[i])
                        _this.contentList.push(data)
                    }
                    console.log(_this.contentList)
                    
                    // res.data.map(item => {
                    //     let data = {}
                    //     data.classifyPic = `http://localhost/cover/` + item.pic
                    //     _this.contentList.push(data)
                    // })
                }, (err) => {
                    console.log(err)
                })
            },
    },
    components: {

    },
    computed:mapGetters(['loading','shownav']),
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .wrapper
    width: 100%
    .img-wrapper
      width: 100%
      .img
        width: 100%
</style>