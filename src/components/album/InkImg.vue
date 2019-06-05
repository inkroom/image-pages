<template>
  <div class="img-container">
    <div v-if="status=='loading'">
      <i class="el-icon-loading"></i>
    </div>
    <div v-else-if="status=='error'">
      <i class="el-icon-picture-outline"></i>
    </div>
    <img
      :src="src"
      style="max-width:260px"
      @error="status='error'"
      @load="status='normal'"
      v-show="status=='normal'"
    >
  </div>
</template>
<script>
export default {
  name: "InkImg",
  props: {
    src: String
  },
  watch: {
    src(nv) {
      this.status = "loading";
    }
  },
  data() {
    return {
      status: "loading"
    };
  }
};
</script>

<style lang="scss">
.img-container {
  width: 100%;
  //   height: 160px;
  text-align: center;
  overflow: hidden;

  .el-icon-loading,
  .el-icon-picture-outline {
    font-size: 60px;
  }
}
</style>
