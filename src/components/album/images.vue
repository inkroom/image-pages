<template>
  <div id="covers-container" v-if="!$store.state.loading">
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    <div>
      <span style="vertical-align: bottom; font-size: 20px"
        >共 {{ covers.length }} 张</span
      >

      <el-link
        @click.native="home"
        style="font-size: 20px"
        class="el-link el-link--primary is-underline"
        >首页</el-link
      >
      <el-link
        :href="url.upload"
        target="_blank"
        type="primary"
        style="font-size: 20px"
        >上传图片</el-link
      >
    </div>
    <el-row :gutter="20">
      <el-col
        v-for="(cell, j) in covers"
        :key="j"
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        :xl="3"
      >
        <el-card :style="{ cursor: album ? 'auto' : 'pointer' }">
          <InkImg
            :src="cell.download_url"
            :srcList="srcList"
            style="height: 160px; line-height: 160px"
            :imgStyle="{ maxWidth: '100%', verticalAlign: 'middle' }"
            lazy
          ></InkImg>
          <div style="padding: 5px" class="text-ellipsis name">
            <span :title="cell.name">{{ cell.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import InkImg from "./InkImg";

import axios from "axios";

export default {
  components: { InkImg },
  data() {
    return {
      style: "max-width:260px",
      limit: {
        col: 6, //每行最多6个,最好能和24整除
        span: 4,
      },
      url: {
        upload: `https://github.com/${process.env.AUTHOR}/${
          process.env.REPO
        }/upload/master/${decodeURIComponent(this.$route.params.album)}`,
      },
      covers: [],
      title: "墨明棋妙",
      album: null,
      ismobile:
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
    };
  },
  watch: {
    title(nv) {
      document.title = this.title + " - " + nv;
    },
  },
  computed: {
    srcList() {
      return this.covers.map(
        (r) =>
          // `https://gitraw.inkroom.cn/${process.env.AUTHOR}/${process.env.REPO}/${process.env.BRANCH}/${encodeURI(r.path)}`
          `http://image.inkroom.cn/raw/${encodeURI(r.path)}`
      );
    },
  },
  destroyed() {
    window.removeEventListener("popstate", this.popstate);
  },
  created() {
    document.title = `${this.title} - ${this.$route.params.album}`;
    this.getImages();
  },
  methods: {
    home() {
      this.$store.commit("loading", true);
      this.$router.push("/");
    },
    getImages() {
      axios
        .get(
          // `https://gitapi.inkroom.cn/repos/${process.env.AUTHOR}/${process.env.REPO}/contents/${this.$route.params.album}`
          `http://image.inkroom.cn/list/${this.$route.params.album}/list?r=${Math.random()}`
        )
        .then((res) => {
          // res = res.data.filter((r) =>
          //   // /\.(jpg|jpeg|gif|bmp|png)$/.test(r.download_url)
          //   /\.(jpg|jpeg|gif|bmp|png)$/.test(r)
          // );
          this.covers = res.data.split("\r\n").map((r) => {
            return {
              path:`${this.$route.params.album}/${r}`,
              name: r.substr(0, r.lastIndexOf(".")),
              download_url: `http://image.inkroom.cn/raw/${this.$route.params.album}/${r}`,
            };
          });
        })
        .catch((e) => {
          this.$alert(` ${this.$route.params.album} 暂不可用`);
          console.error(e);
        })
        .finally((_) => {
          //  this.loadingInstance.close();
          this.$store.commit("loading", false);
        });
    },
    popstate() {
      history.pushState(null, null, document.URL);
      this.dialog.visible = false;

      window.removeEventListener("popstate", this.popstate);

      return false;
    },
  },
};
</script>
<style lang="scss">
#covers-container {
  .order-i {
    position: absolute;
    top: 40%;
    font-size: 45px;
    border: 1px solid;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);

    &:last-of-type {
      right: 0;
    }
  }

  .rotate {
    top: 0;
    right: 0;
  }
}
</style>
