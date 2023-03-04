<template>
  <div class="singer-detail" v-loading="loading">
    <!-- 歌手信息组件 -->
    <SingerInfo :singerInfo="SingerInfo" :singerDesc="SingerDesc" />
    <!-- 导航组件 -->
    <TabClick :list="list" @tabClick="tabClick"  :currentIndex="currentIndex"/>
    <!-- 歌手专辑 -->
    <div v-show="currentIndex === 0">
      <!-- 歌手50首热门歌曲 -->
      <SingerAlbum :musicList="musicList" :hotAlbums="hotAlbums" />
    </div>
    <!-- 歌手MV-->
    <div v-show="currentIndex === 1" class="singer-mv">
      <mvList :mvs="MVS" />
    </div>
    <!-- 歌手详情-->
    <div v-show="currentIndex === 2">3</div>
    <!-- 相似歌手-->
    <div v-show="currentIndex === 3">4</div>
  </div>
</template>

<script>
import SingerInfo from "./childComps/SingerInfo.vue";
import SingerAlbum from "./childComps/SingerAlbum.vue";
import mvList from "../../components/content/mvList/mvList.vue";
import { formatDate } from "@/components/common/utils.js";
import {
  getTopSong,
  getSingerDesc,
  getSongerstMv,
  getSingerAlbum,
} from "../../network/singers.js";
export default {
  name: "SingerDetail",
  data() {
    return {
      id: null,
      SingerInfo: {},
      SingerDesc: {},
      list: ["专辑", "MV", "歌手详情", "相似歌手"],
      currentIndex: 0,
      musicList: [],
      hotAlbums: [],
      MVS: [],
      loading: false
    };
  },
  created() {
    this.id = this.$route.query.id;
    //歌手热门50首
    getTopSong(this.id).then((res) => {
      const songs = res.data.songs;
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
      //隐藏加载动画
      this.loading = false;
    });
    //歌手描述
    getSingerDesc(this.id).then((res) => {
      //console.log(res)
      this.SingerDesc = res.data;
    });
    //歌手mv
    getSongerstMv(this.id).then((res) => {
      this.MVS = res.data.mvs;
      //console.log(this.MVS)
    });
    //歌手热门专辑
    getSingerAlbum(this.id).then((res) => {
      this.SingerInfo = res.data.artist;
      this.hotAlbums = res.data.hotAlbums;
      //console.log(res)
    });
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
    },
  },
  components: {
    SingerInfo,
    SingerAlbum,
    mvList,
  },
};
</script>

<style scoped>
.singer-detail {
 width:100%;
}
.singer-info-list {
  display: flex;
}
.list-item {
  padding: 10px 20px;
  margin-left: 20px;
}
.active {
  border-bottom: 3px solid #e00;
}
.singer-mv {
  width: 90%;
}
</style>
