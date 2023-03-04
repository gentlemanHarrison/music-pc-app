<template>
  <div class="list-detail" v-loading="loading">
    <!-- 歌曲基本信息组件 -->
    <BaseInfo :baseInfo="baseInfo" />
    <!-- 导航组件 -->
    <TabClick :list="list" @tabClick="tabClick"  :currentIndex="currentIndex"/>
    <div v-show="currentIndex === 0">
      <!-- 音乐歌单歌曲详情 -->
      <DetailSongList :musicList="musicList"/>
    </div>
    <div v-show="currentIndex === 1">
      <!-- 评论详情 -->
      <DetailComment :detailComments="comments" ref="recomments" />
      <!-- 分页器 -->
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
    <div v-show="currentIndex === 2">
      <!-- 收藏者详情 -->
      <DetailCollect :detailSubs="subs" />
    </div>
  </div>
</template>

<script>
import BaseInfo from "./childComps/BaseInfo.vue";
import DetailSongList from "./childComps/DetailSongList.vue";
import DetailComment from "./childComps/DetailComment.vue";
import DetailCollect from "./childComps/DetailCollect.vue";
import { formatDate } from "../../components/common/utils";
import {
  getMusicListDetail,
  getSongsDetail,
  getRecomment,
  getSubs,
} from "../../network/ListDetail.js";
export default {
  name:"MusicListDetail",
  data() {
    return {
      id: null,
      baseInfo: {},
      list: [],
      currentIndex: 0,
      musicList: [],
      comments: [],
      subs: [],
      limit: 30,
      offset: 1,
      total: 0,
      loading: true,
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    //获取歌单详情
    getMusicListDetail(this.id).then((res) => {
      const result = res.data.playlist;
      //console.log(result)
      //整理歌单基本信息
      this.baseInfo = {
        img: result.coverImgUrl || "",
        title: result.description,
        name: result.name,
        shareCount: result.shareCount,
        subscribedCount: result.subscribedCount,
        playCount: result.playCount,
        trackCount: result.trackCount,
        tags: result.tags,
        createTime: result.createTime,
        avatar: result.creator.avatarUrl,
        nickname: result.creator.nickname,
      };
      //获取评论的数量
      this.recommendsCount = result.commentCount;
      let commentCount = "评论(" + this.recommendsCount + ")";
      this.list = ["歌曲列表", commentCount, "收藏者"];
    }),
      this._getRecomment();
    this._getSongsDetail();
    //获取收藏者
    getSubs(this.id, 30).then((res) => {
      //console.log(res)
      this.subs = res.data.subscribers;
    });
  },
  methods: {
    //获取歌单歌曲详情数据
    async _getSongsDetail() {
      const { data: result } = await getSongsDetail(this.id);
      //console.log(result);
      let songs = result.songs;
      //整理歌单歌曲详情数据
      this.musicList = songs.map((item) => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          artist: item.ar[0].name,
          pic: item.al.picUrl,
          time: formatDate(new Date(item.dt), "mm:ss"),
        };
      });
      //console.log(this.musicList)
      //隐藏加载动画
      this.loading = false;
    },
    //分页
    onPageChange(val) {
      this.offset = val;
      this._getRecomment();
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector(".selcet-comment").scrollIntoView({
        behavior: "smooth",
      });
    },
    //获取歌曲评论
    _getRecomment() {
      getRecomment(this.id, this.limit, (this.offset - 1) * this.limit).then(
        (res) => {
          //console.log(res)
          this.comments = res.data.comments;
          this.total = res.data.total;
        }
      );
    },
    tabClick(index) {
      this.currentIndex = index;
    },
  },
  components: {
    BaseInfo,
    DetailSongList,
    DetailComment,
    DetailCollect,
  },
};
</script>

<style scoped>
.list-detail {
  height: calc(100% -60px);
  width: 100%;
}
.pagination {
  margin: 20px 0 10px 220px;
}
</style>
