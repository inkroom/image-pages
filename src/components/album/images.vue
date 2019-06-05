<template>
  <div id="covers-container">
    <el-row v-for="(row,i) in covers" :key="i" :gutter="20">
      <el-col v-for="(cell,j) in row" :key="j" :span="limit.span">
        <el-card :style="{cursor:album?'auto':'pointer'}" @click.native="showImg(cell)">
          <InkImg :src="cell.download_url" style="height:160px" :imgStyle="style"></InkImg>
          <div style="padding: 5px;" class="text-ellipsis">
            <span :title="cell.name">{{cell.name}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialog.visible" width="30%" :show-close="false" :lock-scroll="false">
      <div v-if="dialog.visible">
        <InkImg :src="dialog.album.download_url" :loading="false" :imgStyle="{width:'100%'}"></InkImg>
        <div style="padding: 5px;" class="text-ellipsis">
          <span :title="dialog.album.name">{{dialog.album.name}}</span>
        </div>
      </div>
    </el-dialog>
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
      style: "max-width:260px",
      limit: {
        col: 6, //每行最多6个,最好能和24整除
        span: 4
      },
      covers: [],
      title: "墨盒的相册",
      album: null,
      dialog: {
        visible: false,
        album: null
      }
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
        })
        .catch(e => {
          this.$alert(` ${this.$route.params.album} 暂不可用`);
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

      this.dialog.album = img;
      this.dialog.visible = true;

      // this.$alert(`<img src="${img.download_url}" style="width:100%"/>`, img.name, {
      //   dangerouslyUseHTMLString: true
      // })

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
