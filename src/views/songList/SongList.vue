<template>
  <div class="song-list">
    <!-- 顶部精品歌单区域 -->
    <TopList :toplist="topList"/>
    <HotPlayList :Hottags="tags" @itemClick="tagClick" />
    <MusicList :Lists="playLists" />
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
import TopList from "./childcomps/TopList.vue";
import HotPlayList from "./childcomps/HotPlayList.vue";
import MusicList from "@/components/content/musicList/MusicList.vue";
import {
  getHotPlaylist,
  getHighQuality,
  getPlayList,
} from "@/network/songList.js";
export default {
  data() {
    return {
      topList: {}, //顶部精选歌单
      tags: [], //标签栏
      playLists: [], //歌单
      offset: 1,
      cat: "华语",
      limit: 50,
      total: 0,
    };
  },
  created() {
    this._getHighQuality();
    this._getPlayList();
    //获取热门标签
    getHotPlaylist().then((res) => {
      this.tags = res.data.tags;
      //console.log(res)
    });
  },
  methods: {
    onPageChange(val) {
      //console.log(val)
      //保存页码
      this.offset = val;
      this._getPlayList();
      // 真实DOM都在document(所以不再一个vue文件内), 也是可以获取的
      document.querySelector(".song-list").scrollIntoView({
        behavior: "smooth",
      });
    },
    _getPlayList() {
      //获取热门歌单
      getPlayList(this.cat, this.limit, (this.offset - 1) * this.limit).then(
        (res) => {
          this.playLists = res.data.playlists;
          //console.log(this.playLists)
          //console.log(res)
          this.total = res.data.total;
        }
      );
    },
    //获取高质量顶部歌单
    _getHighQuality() {
      //顶部歌单
      getHighQuality(this.cat).then((res) => {
        //console.log(res)
        this.topList = res.data.playlists[0];
        //console.log(this.topList)
      });
    },
    //点击的item高亮
    tagClick(index) {
      this.cat = this.tags[index].name;
      this._getPlayList();
      this._getHighQuality();
      //console.log(this.cat)
    },
  },
  components: {
    HotPlayList,
    TopList,
    MusicList,
  },
};
</script>

<style scoped>
.song-list {
  width: 100%;
}
.pagination {
  padding-bottom: 30px;
  margin-left: 20%;
}
</style>
