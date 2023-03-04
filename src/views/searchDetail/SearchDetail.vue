<template>
  <div class="search-detail" v-loading="loading">
    <div class="search-data">
      <h2>搜索&nbsp;{{ keywords }}</h2>
      <span>找到{{ total }}个结果</span>
    </div>
    <div class="search-title">
      <p
        v-for="(item, index) in title"
        @click="titleClick(index)"
        :class="{ active: currentIndex === index }"
        :key="index"
      >
        {{ item }}
      </p>
    </div>
    <!-- 单曲 -->
    <div v-show="currentIndex === 0">
      <DetailSongList :musicList="musicList" :show="false" />
    </div>
    <!-- 歌单 -->
    <div v-show="currentIndex === 1">
      <MusicList :Lists="lists" />
    </div>
    <!-- MV -->
    <div v-show="currentIndex === 2">
      <mvList :mvs="mvs" />
    </div>
    <el-pagination
      background
      :current-page.sync="offset"
      :page-size="limit"
      :total="total"
      @current-change="onPageChange"
      class="pagination"
      layout="prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import DetailSongList from "../musicListDetail/childComps/DetailSongList.vue";
import MusicList from "../../components/content/musicList/MusicList.vue";
import mvList from "../../components/content/mvList/mvList.vue";
import { getSearchResult } from "../../network/search.js";
// import { getSongsDetail, songDetail } from "../../network/ListDetail.js";
import { formatDate } from "@/components/common/utils.js";
export default {
  name: "SearchDetail",
  data() {
    return {
      title: ["单曲", "歌单", "MV"],
      keywords: null,
      currentIndex: 0,
      limit: 10,
      type: 1,
      offset: 1,
      musicList: [], //歌曲列表
      total: 1,
      lists: [], //歌单
      mvs: [],
      songCount: 0,
      loading: true,
      id: "",
    };
  },
  created() {
    this.keywords = this.$route.query.q;
    this._getSearchResult();
  },
  watch: {
    keywords() {
      this._getSearchResult();
    },
    type() {
      this._getSearchResult();
    },
    $route() {
      this.keywords = this.$route.query.q;
      this._getSearchResult();
    },
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      if (index == 0) {
        this.type = 1;
      }
      if (index == 1) {
        this.type = 1000;
      }
      if (index == 2) {
        this.type = 1004;
      }
    },
    _getSearchResult() {
      this.musicList = [];
      getSearchResult(
        this.keywords,
        this.limit,
        (this.offset - 1) * this.limit,
        this.type
      ).then(async (res) => {
          //console.log(res)
        //单曲数据
        if (this.type === 1) {
         this.total = res.data.result.songCount;
          let songs = res.data.result.songs;
          //整理歌单歌曲详情数据
          this.musicList = songs.map((item) => {
            return {
              id: item.id,
              name: item.name,
              album: item.album.name,
              artist: item.artists[0].name,
              pic: item.artists[0].img1v1Url,
              time: formatDate(new Date(item.duration), "mm:ss"),
            };
          });
        }
        // 歌单数据
        if (this.type === 1000) {
          this.total = res.data.result.playlistCount;
          this.lists = res.data.result.playlists;
        }
        // MV数据
        if (this.type === 1004) {
          this.total = res.data.result.mvCount;
          this.mvs = res.data.result.mvs;
        }
      });
      //隐藏加载动画
      this.loading = false;
    },
    //分页
    onPageChange(val) {
      this.offset = val;
      this._getSearchResult();
    },
  },
  components: {
    DetailSongList,
    MusicList,
    mvList,
  },
};
</script>

<style scoped>
.search-detail {
  position: fixed;
  left: 250px;
  top: 60px;
  bottom: 60px;
  height: calc(100% -120px);
  width: 81%;
  overflow-y: scroll;
}
.search-data {
  display: flex;
  margin-top: 10px;
}
.search-data span {
  margin-top: 10px;
}
.search-title {
  margin-top: 20px;
  font-size: 15px;
  display: flex;
  font-weight: bold;
}
.search-title p {
  margin-right: 10px;
  text-align: center;
  padding: 5px;
}
.active {
  border-bottom: 2px solid #e00;
}
.pagination {
  margin-top: 20px;
  padding-bottom: 30px;
  margin-left: 20%;
}
</style>
