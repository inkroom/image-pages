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
        <el-card :style="{cursor:album?'auto':'pointer'}" @click.native="showImg(cell)">
          <InkImg :src="cell.download_url" style="height:160px"></InkImg>
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
          <div style="padding: 14px;" text-ellipsis>
            <span>{{cell.name}}</span>
          </div>
        </el-card>
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
      album: null,
      loading: true
    };
  },
  watch: {
    title(nv) {
      document.title = nv;
    },
    loading(nv, ov) {
      if (nv) {
        this.loadingInstance = Loading.service({
          text: "正在努力加载中..."
        });
      } else {
        this.loadingInstance.close();
      }
    }
  },
  created() {
    document.title = this.$route.params.album;
    this.getImages();
  },
  methods: {
    getImgUrl(path) {
      return `https://raw.githubusercontent.com/${process.env.AUTHOR}/${
        process.env.REPO
      }/${process.env.BRANCH}/${path}`;
    },
    getImages() {
      console.log("发送githu");
      let promise = null;

      this.loadingInstance = Loading.service({
        text: "正在努力加载中..."
      });

      //获取封面

      // if (this.album) {
      //   promise = axios.get(
      //     `https://api.github.com/repos/${process.env.AUTHOR}/${
      //       process.env.REPO
      //     }/contents/${this.album}`
      //   );
      // } else {
      //   promise = axios.get(
      //     `https://api.github.com/repos/${process.env.AUTHOR}/${
      //       process.env.REPO
      //     }/contents/`
      //   );
      // }
      axios
        .get(
          `https://api.github.com/repos/${process.env.AUTHOR}/${
            process.env.REPO
          }/contents/${this.$route.params.album}`
        )
        .then(res => {
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
        }).catch(e=>{
          this.$alert(` ${this.$route.params.album } 暂不可用`)
          this.loadingInstance.close();
        });
    },
    showImg(img) {
        console.debug("开始请求");

        const h = this.$createElement;
        // this.$msgbox({
        //   title: "消息",
        //   message: h("img", { src: img.download_url,alt:'测试' })
        // });

        this.$alert(`<img src="${img.download_url}" style="width:100%"/>`, img.name, {
          dangerouslyUseHTMLString: true
        })

        // this.getImages();
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
