<template>
  <div class="hot-album" v-if="hotAlbums.length">
    <div v-for="(item, index) in hotAlbums" :key="index" class="album-item">
      <div class="item-left"><img :src="item.picUrl" /></div>
      <div class="item—right">
        <p>{{ item.name }}</p>
        <AlbumMusic :id="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
import AlbumMusic from "./AlbumMusic.vue";
export default {
  props: {
    hotAlbums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    AlbumMusic,
  },
};
</script>

<style scoped>
.album-item {
  display: flex;
  margin-top: 10px;
}
.album-item {
  padding: 30px;
}
.album-item img {
  width: 200px;
  height: 200px;
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
