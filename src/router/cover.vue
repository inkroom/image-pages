<template>
  <div id="covers-container">
    <Row  :gutter="20">
      <Col v-for="(cell,j) in covers" :key="j"  :xs="24" :sm="12" :md="6" :lg="4" :xl="3" >
        <!-- <router-link :to="cell.name" @click="$store.commit('loading',true)"> -->
          <Card :style="{cursor:album?'auto':'pointer'}" @click.native="push(cell.name)" :bordered="false">
            <InkImg :src="getImgUrl(cell)" style="height:160px;line-height:160px;" :imgStyle="{maxWidth:'100%',verticalAlign:'middle'}"></InkImg>
            <div style="padding: 5px;" class="text-ellipsis name">
              <span :title="cell.name">{{cell.name}}</span>
            </div>
          </Card>
        <!-- </router-link> -->
      </Col>
    </Row>
  </div>
</template>
<script>
import InkImg from "@/components/album/InkImg.vue";


import axios from "axios";

export default {
  components: { InkImg },
  data() {
    return {
      limit: {
        col: 6, //每行最多6个,最好能和24整除
        span: 4
      },
      covers: [],
      album: null
    };
  },
  // watch: {
  //   title(nv) {
  //     document.title = nv;
  //   }
  // },
  created() {
    document.title = '墨明棋妙';
    this.getImages();
  },
  methods: {
    push(name){
      window.loading.start();
      console.log('设置loading')
      this.$router.push(encodeURIComponent(name))
    },
    getImgUrl(album) {
      // return `https://gitraw.inkroom.cn/${process.env.AUTHOR}/${
      //   process.env.REPO
      // }/${process.env.BRANCH}/${album.name}/${album.cover}`;
      if(album.url){
        return album.url;
      }
      return `${location.protocol}//image.inkroom.cn/raw/${album.name}/${album.cover}`;
    },
    getImages() {
      console.log("发送githu");
      let promise = null;

      // this.loadingInstance = Loading.service({
      //   text: "正在努力加载中..."
      // });

      //获取封面

      axios
        .get(
          // `https://gitraw.inkroom.cn/${process.env.AUTHOR}/${
          //   process.env.REPO
          // }/${process.env.BRANCH}/config.json`
          `${location.protocol}//image.inkroom.cn/raw/config.json?r=${Math.random()}`
        )
        .then(res => {
          console.log(res.data);
          res = res.data;
          // this.covers = [];
          // for (let i = 0; i < Math.floor(res.length / this.limit.col); i++) {
          //   let row = [];
          //   for (
          //     let j = i * this.limit.col;
          //     j < (i + 1) * this.limit.col;
          //     j++
          //   ) {
          //     row.push(res[j]);
          //   }
          //   this.covers.push(row);
          // }
          this.covers = res;
        })
        .catch(e => {
          console.error(e);
          
          this.$alert("相册暂不可用");
        }).finally(_=>{
          window.loading.hide();
        });
    }
  }
};
</script>
<style lang="less">
#covers-container {
  margin: 15px auto;
  width: 80%;
  a {
    outline: none;
    text-decoration: none;
  }
  .el-col,.ivu-col{
    margin-bottom: 15px;
  }
}
</style>
