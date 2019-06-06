<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
#covers-container {
  margin: 15px auto;
  width: 80%;

  .el-col {
    margin-top: 15px;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #3b414a;
  margin-top: 60px;
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

.el-loading-mask{
  background-color: #3b4048 !important;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
