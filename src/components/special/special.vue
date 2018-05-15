<template>
    <div class="content">
        <scroll class="scroll" :data="specialList">
            <div>
            <div class="img-wrapper" v-for="item in specialList">
                <img class="img" :src="item.subpic" @click="toDetail(item)">
                <p class="title">{{ item.subjectname}}</p>
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
                specialList: []
            }
        },
        created () {
            this.getSpecialList()
        },
        methods: {
            getSpecialList () {
                let _this = this;
                this.specialList = []
                _this.$http.get('/special').then((res)=>{
                        res.data.map(item => {
                        let data = {}
                        data.subpic = `http://localhost/qizipublic/public/static/subject/` + item.subpic
                        data.subjectname = item.subjectname
                        data.id = item.id
                        _this.specialList.push(data)
                    })
                },(err)=>{
                    console.log(err);
                })
            },
            toDetail (item) {
                this.$router.push({
                    path: `article`,
                    query: {
                        id: item.id
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
