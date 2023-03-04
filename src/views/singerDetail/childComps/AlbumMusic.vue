<template>
  <div>
    <AlbumMusicList :musicList="musicList" />
  </div>
</template>

<script>
import { getAlbum } from "../../../network/singers.js";
import AlbumMusicList from "../../../components/content/AlbumMusicList/AlbumMusicList.vue";
import {formatDate} from '@/components/common/utils.js'
export default {
  data() {
    return {
      musicList: [], //专辑歌曲
    };
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  mounted() {
    //获取歌手专辑歌曲
    getAlbum(this.id).then((res) => {
      let songs = res.data.songs;
      this.musicList = songs.map((item) => {
        return {
          id: item.id,
          name: item.name,
          album: item.al.name,
          artist: item.ar[0].name,
          pic: item.al.picUrl,
          time: formatDate(new Date(songs[0].dt), "mm:ss"),
        };
      });
    });
   
  },
  components: {
    AlbumMusicList,
  },
};
</script>

<style scoped>
</style>
