<template>
  <div id="covers-container">
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    <div>
      共 {{ covers.length }} 张
      <router-link to="/" style="font-size:20px;" class="el-link el-link--primary is-underline">首页</router-link>
      <el-link :href="url.upload" target="_blank" type="primary" style="font-size:20px">上传图片</el-link>
    </div>
    <el-row :gutter="20">
      <el-col v-for="(cell,j) in covers" :key="j" :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
        <el-card :style="{cursor:album?'auto':'pointer'}" @click.native="showImg(j)">
          <InkImg
            :src="cell.download_url"
            style="height:160px;line-height:160px"
            :imgStyle="{maxWidth:'100%',verticalAlign:'middle'}"
            :s.sync="cell.status"
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
      <div v-if="dialog.visible" style="position:relative">
        <i
          @click="prev"
          v-show="dialog.album.status =='normal' && dialog.index!=0"
          class="el-icon-arrow-left order-i"
        ></i>
        <InkImg :src="dialog.album.download_url" :imgStyle="{width:'100%'}" :s.sync="dialog.album.status" :loading="dialog.album.status!='normal'"></InkImg>
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
        <i
          @click="next"
          v-show="dialog.album.status =='normal' && dialog.index!=covers.length-1"
          class="el-icon-arrow-right order-i"
        ></i>
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
      url: {
        upload: `https://github.com/${process.env.AUTHOR}/${
          process.env.REPO
        }/upload/master/${this.$route.params.album}`
      },
      covers: [],
      title: "墨盒相册",
      album: null,
      ismobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      dialog: {
        visible: false,
        album: null,
        index: -1,
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
      document.title = "墨盒相册 - "+ nv;
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.popstate);
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
          this.covers = res;
          this.loadingInstance.close();
        })
        .catch(e => {
          this.$alert(` ${this.$route.params.album} 暂不可用`);
          this.loadingInstance.close();
        });
    },
    popstate() {
      history.pushState(null, null, document.URL);
      this.dialog.visible = false;

      window.removeEventListener("popstate", this.popstate);

      return false;
    },
    showImg(index) {
      window.addEventListener("popstate", this.popstate);
      this.dialog.index = index;
      this.dialog.album = this.covers[index];
      this.dialog.visible = true;
    },
    next() {
      if (this.dialog.index != this.covers.length - 1) {
        this.dialog.index++;
        this.dialog.album = this.covers[this.dialog.index];
        this.dialog.visible = true;
      }
    },
    prev() {
      if (this.dialog.index != 0) {
        this.dialog.index--;
        this.dialog.album = this.covers[this.dialog.index];
        this.dialog.visible = true;
      }
    }
  }
};
</script>
<style lang="scss">
.order-i {
  position: absolute;
  top: 40%;
  font-size: 30px;
  border: 1px solid;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);

  &:last-of-type{
    right: 0;
  }
}
</style>
