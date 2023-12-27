<template>
  <div class="img-container">


    <!-- <el-icon class="el-icon-loading" v-if="isLoading"><el-icon-loading /></el-icon> -->
    <Image
      :style="imgStyle"
      :src="src"
      :preview-list="srcList"

      :initial-index="initialIndex"
      :lazy="lazy"
      fit="contain"
      referrer-policy='no-referrer'
      @on-click="click"
      @load="load"
      @error="load"
    >
      <template #placeholder>
       
        <Spin fix>
          <Icon type="ios-loading" class="el-icon-loading"></Icon> 
          <!-- 必须有一个其他元素， -->
          <div style="display: none;">Loading</div>
        </Spin>
      </template>
      <template #error>
        <Icon type="ios-image-outline" size="64" class="el-icon-picture-outline" />
        <!-- <el-icon class="el-icon-picture-outline"><PictureFilled /></el-icon>  -->
      </template>
    </Image> 

  </div>
</template>
<script>
export default {
  name: "InkImg",
  // components:{InkElImage},
  data(){return {
    isLoading:true,realImgStyle:{},imagePreviewModal:false
  }},
  mounted(){
    // this.imgStyle.display='none';
  },
  methods:{
    load(){
      
      this.isLoading = false;

      this.realImgStyle = Object.assign(this.realImgStyle,this.imgStyle);
      // delete this.realImgStyle.display;
      console.log('load success',this.isLoading,this.realImgStyle)
      // loading.value = false;
    },
    click(){
      this.imagePreviewModal = true;
      console.log('click')

    }
  },
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
    font-size: 90px;
    text-align: center;
    vertical-align: middle;
 
  }
  .ivu-spin-show-text .ivu-spin-dot, .ivu-spin-text{
    display: none;/* 屏蔽默认的样式 */
  }
  .el-icon-loading{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

}
</style>
