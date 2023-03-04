<template>
  <div class="album-container">
    <!-- 歌手热门50首 -->
    <div class="singer-album" v-if="musicList.length">
      <div class="album">
        <div class="album-left">
          <img :src="musicList[0].pic" />
        </div>
        <div class="album-right">
          <p>热门50首</p>
          <AlbumMusicList :musicList="musicList" />
        </div>
      </div>
      <!-- 热门专辑区域 -->
      <div class="hot-album" v-if="hotAlbums.length">
        <div v-for="(item, index) in hotAlbums" :key="index" class="album-item">
          <div class="item-left"><img :src="item.picUrl" /></div>
          <div class="item—right">
            <p>{{ item.name }}</p>
            <AlbumMusic :id="item.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumMusic from "./AlbumMusic.vue";
import AlbumMusicList from "@/components/content/AlbumMusicList/AlbumMusicList.vue";
export default {
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
    hotAlbums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    AlbumMusic,
    AlbumMusicList
  }
};
</script>

<style scoped>
.album-container {
  display: flex;
  flex-direction: column;
}
.singer-album {
  margin-top: 10px;
  width: 90%;
}
.singer-album img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
.album {
  display: flex;
}
.album-left img{
  border-radius: 5px;
}
.album-right {
  height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}
.album-right p {
  margin-left: 30px;
}
.album-item {
  display: flex;
  margin-top: 40px;
}
.album-item img {
  width: 150px;
  height: 150px;
}
.item-right {
  height: 400px;
  overflow-y: scroll;
  margin-top: 10px;
}
.item—right p {
  margin-left: 30px;
}
</style>
