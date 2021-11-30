<template>
  <div id="app">
    <router-view/>

    <div style="text-align:center;margin:15px;" v-if="!$store.state.loading"><el-link type="primary" href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备17000680号</el-link>  @copyright 墨盒</div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "App",
  watch:{
    "$store.loading"(nv,ov){
      if(nv){//开始loading

        console.log('开始loading--wacht')
        // this.loadingInstance = Loading.service({
        //   text: "正在努力加载中..."
        // });

      }else{//关闭loading
      console.log('关闭loading--watch')
        // this.loadingInstance &&  this.loadingInstance.close();
      }
    }
  }
};
</script>

<style lang="scss">
#covers-container {
  $margin-size: 15px;

  margin: auto;
  width: 80%;
  padding-top: $margin-size;
  .el-col {
    margin-bottom: $margin-size;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #3b4048;
  height: 100%;
  .name{
    line-height: 20px;
  }
}

* {
  margin: 0;
  padding: 0;
}
html,
body {
  /* 总有莫名其妙的css被打包进去 */
  width: 100% !important;
  height: 100% !important;
  background-color: #3b4048 !important;
}

.el-loading-mask {
  background-color: #3b4048 !important;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
