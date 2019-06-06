<template>
  <div id="covers-container">
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <div>共 {{ covers.length }} 张

      <el-link :href="url.upload" target="_blank" type="primary" style="font-size:20px">上传图片</el-link>

    </div>
    <el-row :gutter="20">
      <el-col v-for="(cell,j) in covers" :key="j" :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
        <el-card :style="{cursor:album?'auto':'pointer'}" @click.native="showImg(cell)">
          <InkImg
            :src="cell.download_url"
            style="height:160px;line-height:160px"
            :imgStyle="{maxWidth:'100%',verticalAlign:'middle'}"
            lazy
          ></InkImg>
          <div style="padding: 5px;" class="text-ellipsis">
            <span :title="cell.name">{{cell.name}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialog.visible"
      width="30%"
      :show-close="ismobile"
      :lock-scroll="false"
      :fullscreen="ismobile"
    >
      <div v-if="dialog.visible">
        <InkImg :src="dialog.album.download_url" :imgStyle="{width:'100%'}"></InkImg>
        <div style="padding: 5px;" class="text-ellipsis">
          <el-link
            :href="dialog.album._links.html"
            target="_blank"
            type="primary"
            :title="dialog.album.name"
          >{{dialog.album.name}}</el-link>
          - {{ dialog.album.size |size }}
          <el-link :href="getDeleteUrl(dialog.album)" target="_blank" type="danger">删除</el-link>
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
      url:{
        upload:`https://github.com/${process.env.AUTHOR}/${process.env.REPO}/upload/master/${this.$route.params.album}`
      },
      covers: [],
      title: "墨盒的相册",
      album: null,
      ismobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      dialog: {
        visible: false,
        album: null
      }
    };
  },
  filters: {
    size(value) {
      return Math.floor(value / 1024) + "KB";
    }
  },
  watch: {
    title(nv) {
      document.title = nv;
    }
  },
  created() {
    document.title = this.$route.params.album;
    this.getImages();
  },
  methods: {
    getDeleteUrl(img) {
      return `https://github.com/${process.env.AUTHOR}/${
        process.env.REPO
      }/delete/${process.env.BRANCH}/${img.path}`;
    },
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
