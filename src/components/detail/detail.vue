<template>
    <div class="content">
        <div class="scroll">
            <div class="header">
                <i class="icon-undo" @click="back()"></i>
                详情
            </div>
            <div class="item">
                <div class="icon">
                    <img width="108" height="144" v-lazy="info.mangaCover"/>
                </div>
                <div class="text">
                    <h2 class="name">漫画名：{{ info.name }}</h2>
                    <p class="name">作者：{{ info.author }}</p>
                    <p class="desc">简介：{{ info.info }}</p>
                </div>
            </div>
            <div class="btn-wrapper">
                <button class="btn" @click="toComment()">评论漫画</button>
                <button v-if="mangacheck == 0" class="btn" @click="addFavor()">加入收藏</button>
                <button v-if="mangacheck == 1" class="btn" @click="concelFavor()">取消收藏</button>
            </div>
            <div class="part-title">
                <h2 class="part-text">章节列表</h2>
            </div>
            <div class="part-wrapper">
                <mt-button type="default" class="part-content" v-for="item in partList" @click="read(item)">{{ item.partname }}</mt-button>
            </div>
            <div class="part-title">
                <h2 class="part-text">漫画评论</h2>
            </div>
            <div class="comment-wrapper">
                <div class="comment-content" v-for="item in commentList">
                    <div class="user-avatar">
                        <img width="60" height="60" v-lazy="item.avatar"/>
                    </div>
                    <div class="user-text-wrapper">
                        <p class="user-time">{{ item.username }} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{{ item.createtimeData }}</p>
                        <p class="user-text">{{ item.commentcontent }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import {mapGetters,mapActions} from 'vuex';
    import {formatDate} from 'common/js/dom.js'
    export default {
        data () {
            return {
                userid: '',
                partid: '',
                mangaid: '',
                manganame: '',
                mangacheck: '',
                info: {},
                partList: [],
                commentList:[],
                hit: ''
            }
        },
        created () {
            this.$store.dispatch('hideNav')
            let obj
            if(window.sessionStorage.userInfo){
                obj = JSON.parse(window.sessionStorage.userInfo)
                this.userid = obj.id
            } else {
                this.mangacheck = 0
            }
            this.mangaid = this.$route.query.mangaid
            this.getMangaDetaiData()
            this.getMangaPartListData()
            this.getMangaCommentListData()
            this.mangaHit()
            this.checkMangaFavor()
        },
        methods: {
            //返回
            back () {
                this.$router.go(-1)
            },

            //获取漫画详情数据
            getMangaDetaiData () {
                let _this = this
                _this.$http.get('/mangadetail', {
                    params: {
                        mangaid: _this.mangaid
                    }
                }).then((res) => {
                    _this.info = res.data[0]
                    _this.info.mangaCover = `http://localhost/qizipublic/public/static/cover/` + res.data[0].mangapic
                    _this.info.name = res.data[0].manganame.split("(")[0]
                    _this.manganame = res.data[0].manganame
                    console.log(_this.manganame)
                }, (err) => {
                    console.log(err)
                })
            },


            //原浏览量
            mangaHit () {
                let _this = this
                _this.$http.get('/hit', {
                    params: {
                        mangaid: _this.mangaid
                    }
                }).then((res) => {
                    _this.hit = res.data[0].hit
                    if (_this.hit == null) {
                        _this.hit = 0
                    }
                    this.updateMangaHit()
                }, (err) => {
                    console.log(err)
                })
            },
            //漫画浏览量 + 1
            updateMangaHit () {
                let _this = this
                _this.$http.get('/updatehit', {
                    params: {
                        mangaid: _this.mangaid,
                        hit: _this.hit
                    }
                }).then((res) => {
                    console.log(res)
                }, (err) => {
                    console.log(err)
                })
            },

            //获取漫画章节列表
            getMangaPartListData () {
                let _this = this
                _this.$http.get('/partlist', {
                    params: {
                        mangaid: _this.mangaid
                    }
                }).then((res) => {
                    _this.partList = res.data
                    _this.partid = _this.partList[0].id
                }, (err) => {
                    console.log(err)
                })
            },

            //获取漫画评论列表
            getMangaCommentListData () {
                let _this = this
                _this.$http.get('/commentlist', {
                    params: {
                        mangaid: _this.mangaid
                    }
                }).then((res) => {
                    // _this.commentList = res.data
                    res.data.map(item => {
                        let data = {}
                        data.createtimeData = item.createtime.split('T')[0]
                        //  + ` ` + item.createtime.split('T')[1].split('.')[0]
                        data.avatar = `http://localhost/qizipublic/public/static/avatar/0.jpg`
                        data.username = item.username
                        data.commentcontent = item.commentcontent
                        _this.commentList.push(data)
                    })
                }, (err) => {
                    console.log(err)
                })
            },

            //添加漫画收藏
            addFavor () {
                if(window.sessionStorage.userInfo){
                    let _this = this
                    _this.$http.post('/addfavor', {
                        mangaid: _this.mangaid,
                        userid: _this.userid
                    }).then((res) => {
                        if (res.status == 200) {
                            if (res.data.status == '1') {
                                alert('添加收藏成功')
                                _this.mangacheck = 1
                            } else {
                                alert('服务器出错')
                            }
                        }
                    })
                } else {
                    this.$router.push({
						path:'/login',
					})
                }
            },

            //取消漫画收藏
            concelFavor () {
                let _this = this
                _this.$http.post('/concelfavor', {
                    mangaid: _this.mangaid,
                    userid: _this.userid
                }).then((res) => {
                    if (res.status == 200) {
                        if (res.data.status == '1') {
                            alert('取消收藏成功')
                            _this.mangacheck = 0
                        } else {
                            alert('服务器出错')
                        }
                    }
                })
            },

            //判断漫画是否已收藏
            checkMangaFavor () {
                let _this = this
                _this.$http.get('/checkfavor', {
                    params: {
                        mangaid: _this.mangaid,
                        userid: _this.userid
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        if (res.data.status == '1') {
                            _this.mangacheck = 1
                            console.log(_this.mangacheck)
                        } else {
                            _this.mangacheck = 0
                            console.log(_this.mangacheck)
                        }
                    }
                })
            },

            //进入评论页
            toComment () {
                if(window.sessionStorage.userInfo){
                    this.$router.push({
                        path: `comments`,
                        query: {
                            mangaid: this.mangaid,
                            userid: this.userid
                        }
                    })
                } else {
                    this.$router.push({
						path:'/login',
					})
                }
            },

            // //点击阅读按钮
            // readFirst () {
            //     this.$router.push({
            //         path: `content`,
            //         query: {
            //             partid: this.partid,
            //             manganame: this.manganame
            //         }
            //     })
            // },

            //按章节阅读
            read (item) {
                this.$router.push({
                    path: `content`,
                    query: {
                        partid: item.id,
                        manganame: this.manganame
                    }
                })
            }
        },
        components: {
            Scroll
        },
        computed:mapGetters(['loading','shownav']),
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
    .content
      width: 100%
      .scroll
        height: 100%
        overflow: hidden
        .header
          height: 44px
          margin: 0 auto
          padding-right: 10px
          text-align: center
          color: $color-theme-d
          font-size: 18px
          line-height: 44px
          border-bottom: 1px solid $color-theme-d
          .icon-undo
            float: left
            height: 44px
            line-height: 44px
            padding-left: 10px
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 10px 20px 20px 20px
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
              overflow : hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-line-clamp: 4
              -webkit-box-orient: vertical
              color: $color-text
        .btn-wrapper
          text-align: center
          .btn
            width: 130px
            height: 35px
            margin: 5px
            line-height 35px
            font-size: $font-size-medium
            color: $color-theme
            background-color: $color-theme-d
            border: none
            border-radius: 10px
        .part-title
          width: 100%
          height: 35px
          line-height: 35px
          background-color: $color-theme-d
          .part-text
            display: inline-block
            color: $color-theme
            margin-left: 10px
        .part-wrapper
          padding: 5px
          .part-content
            display: inline-block
            width: 30%
            height: 25px
            margin: 3px 6px
            line-height: 25px
            font-size: $font-size-medium
            background-color: #fff
            border: 1px solid #000
            border-radius: 5px
            overflow : hidden
    .comment-wrapper
      width: 100%
      .comment-content
        display: flex
        background-color: #F8F8FF
        box-sizing: border-box
        align-items: center
        padding: 10px
        .user-avatar
          flex: 0 0 60px
        .user-text-wrapper
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          margin-left: 8px
          .user-time
            color: $color-text
          .user-text
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            color: $color-text
</style>
