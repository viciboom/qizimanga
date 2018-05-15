<template>
  <div id="app">
    <m-header v-if="shownav"></m-header>
    <tab v-if="shownav"></tab>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import {mapGetters,mapActions} from 'vuex';
export default {
  computed:mapGetters(['loading','shownav']),
  watch:{
      $route(to,from){
        if(to.path.indexOf('detail')!=-1){
          this.$store.dispatch('hideNav');
        }else{
          this.$store.dispatch('showNav');
        }
        if(to.path == '/user' || to.path == '/comments' ||to.path == '/detail' || to.path == '/login' || to.path == '/reg' || to.path == '/password' || to.path == '/favor' || to.path == '/classifylist'){
          this.$store.dispatch('hideNav');
        }
      }
    },
  components: {
    MHeader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    html, body
      height: 100%
      #app
        height: 100%
</style>
