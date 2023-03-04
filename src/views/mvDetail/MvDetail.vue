<template>
  <div class="mv-detail">
    <mvInfo :mvInfo="MvInfo" :mvUrl="MVUrl" />
    <p>相似MV</p>
    <br />
    <SimiMv :simiMv="Mvs" />
    <p>评论</p>
    <DetailComment :detailComments="MVComments" />
    <el-pagination
      background
      :current-page.sync="offset"
      :page-size="limit"
      :total="total"
      @current-change="onPageChange"
      class="pagination"
	  layout="prev, pager, next,jumper"
    />
  </div>
</template>

<script>
import {
  getMvDetail,
  getMVUrl,
  getSimiMv,
  getMVComment,
} from "../../network/mv.js";

import mvInfo from "./childComps/mvInfo.vue";
import SimiMv from "./childComps/SimiMv.vue";
import DetailComment from "../musicListDetail/childComps/DetailComment.vue";
export default {
  data() {
    return {
      mvid: null,
      MvInfo: {},
      MVUrl: null,
      MVComments: [],
      Mvs: [],
      limit: 10,
      offset: 1,
      total: 0,
    };
  },
  created() {
    this.mvid = this.$route.query.id;
    this._getMVdata();
    this._getMVComment();
  },
  watch: {
    //监听路由的变化
    $route(nval) {
      //获取路由改变后的mvid
      this.mvid = nval.query.id;
      //mvid一旦改变，立即再次获取mv数据
      this._getMVdata();
      //console.log(nval)
    },
    //监听mvid的改变,一旦改变，立即再次调用评论接口
    mvid() {
      this._getMVComment();
    },
  },
  methods: {
    //分页
    onPageChange(val) {
      this.offset = val;
      this._getMVComment();
    },
    _getMVComment() {
      getMVComment(this.mvid, this.limit, (this.offset - 1) * this.limit).then(
        (res) => {
          this.MVComments = res.data.comments;
          this.total = res.data.total;
          //console.log(res)
        }
      );
    },
    _getMVdata() {
      getMvDetail(this.mvid).then((res) => {
        this.MvInfo = res.data.data;
        //console.log(this.MvInfo)
      });
      getMVUrl(this.mvid).then((res) => {
        this.MVUrl = res.data.data.url;
        //console.log(res.data.data.url)
      });
      getSimiMv(this.mvid).then((res) => {
        this.Mvs = res.data.mvs;
        //console.log(res)
      });
    },
  },
  components: {
    mvInfo,
    SimiMv,
    DetailComment,
  },
};
</script>

<style scoped>
.mv-detail {
  position: fixed;
  left: 260px;
  top: 60px;
  bottom: 60px;
  height: calc(100vh -120px);
  width: 80%;
  overflow-y: scroll;
}
.pagination {
  margin: 20px 0 10px 220px;
}
</style>
