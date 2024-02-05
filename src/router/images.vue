<template>
  <div id="covers-container" >
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    <div>
      <span style="vertical-align: bottom; font-size: 20px; color: white;"
        >共 {{ covers.length }} 张</span>
      <a 
        href="javascript:void(0);"
        @click.native="home"
        style="font-size: 20px"
        class="el-link el-link--primary is-underline"
        >首页</a>
      <!-- <router-link
        :to="url.upload"
        target="_blank"
        type="primary"
        style="font-size: 20px"
        >上传图片</router-link> -->
    </div>
    <Row :gutter="20">
      <Col
        v-for="(cell, j) in covers"
        :key="j"
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        :xl="3"
      >
        <Card :style="{ cursor: album ? 'auto' : 'pointer' }"  @click="click(j)" :bordered="false">
          <InkImg
            :src="cell.download_url"
            :srcList="srcList"
            style="height: 160px; line-height: 160px"
            :imgStyle="{ maxWidth: '100%', verticalAlign: 'middle' }"
            :initialIndex="j"
            lazy
          ></InkImg>
          <div style="padding: 5px" class="text-ellipsis name">
            <span :title="cell.name">{{ cell.name }}</span>
          </div>
        </Card>
      </Col>
    </Row>
    <InkImagePreview
                v-model="imagePreviewModal"
                :preview-list="srcList"
                :initial-index="initialIndex"
                referrerPolicy='no-referrer'
            />
  </div>
</template>
<script>
import InkImg from "@/components/album/InkImg.vue";
import InkImagePreview from '@/components/album/image/image-preview.vue'

import axios from "axios";

export default {
  components: { InkImg,InkImagePreview },
  data() {
    return {
      imagePreviewModal:false,
      initialIndex:-1,
      style: "max-width:260px",
      limit: {
        col: 6, //每行最多6个,最好能和24整除
        span: 4,
      },
      url: {
        upload: `https://github.com/${import.meta.env.AUTHOR}/${
          import.meta.env.REPO
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
         r.download_url.indexOf('@1e_1c.webp')!=-1?r.download_url.replace('@1e_1c.webp','') : 
          // `https://gitraw.inkroom.cn/${process.env.AUTHOR}/${process.env.REPO}/${process.env.BRANCH}/${encodeURI(r.path)}`
          `${location.protocol}//image.inkroom.cn/raw/${encodeURI(r.path)}`
      );
    },
  },
  unmounted() {
    window.removeEventListener("popstate", this.popstate);
  },
  created() {
    document.title = `${this.title} - ${this.$route.params.album}`;
    this.getImages();
  },
  methods: {
    click(index){
      this.initialIndex = index;
      this.imagePreviewModal = true;
    },
    home() {
      window.loading.hide();
      this.$router.push("/");
    },
    getImages() {
      // 首先请求使用了图床的列表，图床经过压缩的
      axios
        .get(
          `${location.protocol}//image.inkroom.cn/raw/list/${
            this.$route.params.album
          }.list?r=${Math.random()}`
        )
        .then((res) => {
          this.covers = res.data
            .split("\n")
            .filter((r) => !!r && r.length > 1)
            .map((r) => {
              // 一般 长这样 99976123_p0.jpg-{"success":true,"result":["https://i0.hdslb.com/bfs/album/82d43c529124f997e3771644dbba91a3ad1c8a31.jpg"]}
              // 没有缩略图的就 长这样 99976123_p0.jpg
              var rs = r.split("-");
              var j = `${location.protocol}//image.inkroom.cn/raw/${encodeURI(
                this.$route.params.album
              )}/${encodeURI(r)}`;
              if (rs.length > 1) {
                j = JSON.parse(rs[rs.length - 1]).result[0]; // 文件名中可能包括 分隔符，但是缩略图的图床里一般不会有，所以可以正常使用
              }

              return {
                path: `${this.$route.params.album}/${
                  r.indexOf("{") == -1
                    ? r
                    : r.substr(
                        0,
                        r.lastIndexOf("{") - 1
                      )
                }`,
                name: rs[0].substr(0, r.lastIndexOf(".")),
                download_url: j,
              };
            });
        })
        .catch((e) => {
          console.log("降级了", e);
          // 没有的话降级使用原图
          return axios
            .get(
              // `https://gitapi.inkroom.cn/repos/${process.env.AUTHOR}/${process.env.REPO}/contents/${this.$route.params.album}`
              `${location.protocol}//image.inkroom.cn/list/${
                this.$route.params.album
              }/list?r=${Math.random()}`
            )
            .then((res) => {
              // res = res.data.filter((r) =>
              //   // /\.(jpg|jpeg|gif|bmp|png)$/.test(r.download_url)
              //   /\.(jpg|jpeg|gif|bmp|png)$/.test(r)
              // );
              this.covers = res.data.split("\r\n").map((r) => {
                return {
                  path: `${this.$route.params.album}/${r}`,
                  name: r.substr(0, r.lastIndexOf(".")),
                  download_url: `${
                    location.protocol
                  }//image.inkroom.cn/raw/${encodeURI(
                    this.$route.params.album
                  )}/${encodeURI(r)}`,
                };
              });
            });
        })
        .catch((e) => {
          this.$alert(` ${this.$route.params.album} 暂不可用`);
          console.error(e);
        })
        .finally((_) => {
          console.log(this.covers);
          window.loading.hide();
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
<style lang="less">
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
