<template>
  <div class="img-container">
    <div v-if="loading && status=='loading'">
      <i class="el-icon-loading"></i>
    </div>
    <div v-else-if="loading && status=='error'">
      <i class="el-icon-picture-outline"></i>
    </div>
    <img
      v-if="loadable"
      :src="src"
      :style="imgStyle"
      @error="status='error'"
      @load="status='normal'"
      v-show="!loading || status=='normal'"
    >
  </div>
</template>
<script>
function lazyLoad() {}

export default {
  name: "InkImg",
  props: {
    src: String,
    imgStyle: Object,
    lazy: {
      //是否开启懒加载
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    src(nv) {
      this.status = "loading";
    }
  },
  data() {
    return {
      status: "loading",
      startLoad: false
    };
  },
  computed: {
    loadable() {
      if (this.lazy) return this.startLoad;
      return true;
    }
  },
  mounted() {
    if (this.lazy) {
      document.addEventListener("scroll", this.lazyLoad);
      this.lazyLoad();
    }
  },
  destroyed() {
    if (this.lazy) {
      document.removeEventListener("scroll", this.lazyLoad);
    }
  },
  methods: {
    lazyLoad() {
      var t =
        document.documentElement.clientHeight +
        (document.body.scrollTop || document.documentElement.scrollTop);

      if (this.$el.offsetTop < t) {
        this.startLoad = true;
        document.removeEventListener("scroll", this.lazyLoad);
      }
    }
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
