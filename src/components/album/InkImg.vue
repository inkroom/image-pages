<template>
  <div class="img-container">
    <InkElImage
      :style="imgStyle"
      :src="src | cdnSrc"
      :preview-src-list="srcList"
      :initialIndex="initialIndex"
      :lazy="lazy"
      fit="contain"
      referrerpolicy='no-referrer'
    >
      <div slot="placeholder">
        <i class="el-icon-loading"></i>
      </div>
      <div slot="error">
        <i class="el-icon-picture-outline"></i>
      </div>
    </InkElImage>
  </div>
</template>
<script>
import InkElImage from './image/main';
export default {
  name: "InkImg",
  components:{InkElImage},
  props: {
    src: String,
    imgStyle: Object,
    lazy: {
      //是否开启懒加载
      type: Boolean,
      default: false,
    },
    srcList: {
      type: Array,
      default: () => [],
    },
    initialIndex: Number
  },
  filters:{
    cdnSrc(src){
      return src;
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

  .el-image__inner {
    vertical-align: middle;
  }
  .el-icon-loading,
  .el-icon-picture-outline {
    font-size: 60px;
  }
}
</style>
