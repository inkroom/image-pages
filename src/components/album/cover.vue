<template>
  <div id="covers-container">
    <!--  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration">{{ fit }}</span>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></el-image>
    </div>-->
    <el-row v-for="(row,i) in covers" :key="i" :gutter="20">
      <el-col v-for="(cell,j) in row" :key="j" :span="limit.span">
        <router-link :to="cell.name">
          <el-card :style="{cursor:album?'auto':'pointer'}">
            <InkImg :src="getImgUrl(cell)" style="height:160px"></InkImg>
            <!-- <div class="img-container" style>
            <img
              :src="cell.download_url || getImgUrl(cell.name+'/'+cell.name+'01.jpg')"
              alt="图片挂了"
              style="max-width:260px"
              @error="imgError"
            >
            </div>-->
            <!-- <el-image
            :src="cell.download_url || getImgUrl(cell.name+'/'+cell.name+'01.jpg')"
            style="width:100px;height:100px"
            fit="contain"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
            </el-image>-->
            <div style="padding: 14px;" class="text-ellipsis">
              <span>{{cell.name}}</span>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import InkImg from "./InkImg";

import { Loading } from "element-ui";
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
      title: "墨盒的相册",
      album: null
    };
  },
  watch: {
    title(nv) {
      document.title = nv;
    }
  },
  created() {
    document.title = `墨盒的相册`;
    this.getImages();
  },
  methods: {
    getImgUrl(album) {
      return `https://raw.githubusercontent.com/${process.env.AUTHOR}/${
        process.env.REPO
      }/${process.env.BRANCH}/${album.name}/${album.cover}`;
    },
    getImages() {
      console.log("发送githu");
      let promise = null;

      this.loadingInstance = Loading.service({
        text: "正在努力加载中..."
      });

      //获取封面

      axios
        .get(
          `https://raw.githubusercontent.com/${process.env.AUTHOR}/${
            process.env.REPO
          }/${process.env.BRANCH}/config.json`
        )
        .then(res => {
          console.log(res.data);
          res = res.data;
          this.covers = [];
          for (let i = 0; i < Math.floor(res.length / this.limit.col); i++) {
            let row = [];
            for (
              let j = i * this.limit.col;
              j < (i + 1) * this.limit.col;
              j++
            ) {
              row.push(res[j]);
            }
            this.covers.push(row);
          }
          this.loadingInstance.close();
        })
        .catch(e => {
          console.error(e);
          this.loadingInstance.close();
          this.$alert("相册暂不可用");
        });
    }
  }
};
</script>
<style lang="scss">
#covers-container {
  margin: 15px auto;
  width: 80%;

  .el-row {
    margin: 15px;
  }
}
</style>
