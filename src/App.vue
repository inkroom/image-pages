<template>
  <div id="app">
    <router-view/>

    <div style="text-align:center;margin:15px;">蜀ICP备17000680号  @copyright 墨盒</div>
  </div>
</template>

<script>
export default {
  name: "App"
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
