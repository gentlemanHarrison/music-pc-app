<template>
  <div class="new-music" v-loading="loading">
    <div class="music-all">
      <span
        v-for="(item, index) in Allarea"
        :key="item.value"
        class="music-item"
        @click="musicItemClick(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ item.content }}
      </span>
    </div>
    <div class="music-list">
      <DetailSongList :musicList="musicList" />
    </div>
  </div>
</template>

<script>
import { getNewMusic } from "../../network/newMusic.js";
import DetailSongList from "../musicListDetail/childComps/DetailSongList.vue";
import { formatDate } from "../../components/common/utils";
export default {
  data() {
    return {
      Allarea: [
        { value: 0, content: "全部" },
        { value: 7, content: "华语" },
        { value: 96, content: "欧美" },
        { value: 16, content: "韩国" },
        { value: 8, content: "日本" },
      ],
      musicList: [],
      currentIndex: 0,
      currentArea: 0,
      loading:true
    };
  },
  created() {
    this._getNewMusic();
  },
  methods: {
    musicItemClick(index) {
      this.currentIndex = index;
      this.currentArea = this.Allarea[index].value;
      this._getNewMusic();
    },
    _getNewMusic() {
      this.musicList = [];
      getNewMusic(this.currentArea).then((res) => {
        let list = res.data.data;
        //console.log(list);
        //整理歌单歌曲详情数据
        this.musicList = list.map((item) => {
          return {
            id: item.id,
            name: item.name,
            album: item.name,
            artist: item.artists[0].name,
            pic: item.album.picUrl,
            time: formatDate(new Date(item.duration), "mm:ss"),
          };
        });
      });
      this.loading = false
    },
  },
  components: {
    DetailSongList,
  },
};
</script>

<style scoped>
.new-music{
  width: 100%;
}
.music-all {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 95%;
}
.music-item {
  color: #909399;
  padding: 5px;
  margin-right: 10px;
  font-size: 15px;
}
.active {
  border-bottom: 3px solid #e00;
  color: #e00;
}
</style>