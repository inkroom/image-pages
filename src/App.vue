<template>
  <router-view v-show="!show_view"/>
  <div style="text-align:center;margin:15px;" v-show="!show_view"><a type="primary" href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备17000680号</a>  @copyright 墨盒</div>
</template>


<script>

export default{
  created(){
    // window.sta
  },
  data(){
    return {
      hide_view:window.loading_status
    }
  }

  // computed:{
  //   show_view(){
  //     console.log('ddd',window.loading)
  //     return !window.loading_status;
  //   }
  // }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  color: white;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
