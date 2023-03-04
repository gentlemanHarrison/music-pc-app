<template>
  <div class="recomment">
    <!-- 轮播图组件 -->
    <carousel :banners="banners" class="banners" />
    <h4 class="title" @click="$router.push('/songlist')">
      推荐歌单
      <i class="el-icon-arrow-right"></i>
    </h4>
    <!-- 音乐歌单组件 -->
    <MusicList :Lists="personalized" />
    <h4 class="title">独家放送</h4>
    <!-- 独家内容组件 -->
    <PrivateConent :content="privateContent" />
  </div>
</template>

<script>
import MusicList from "@/components/content/musicList/MusicList.vue";
import PrivateConent from "./childComps/PrivateConent.vue";
import {
  getBanner,
  getPersonalized,
  getPrivateContent,
} from "@/network/recomment.js";
import carousel from "@/components/common/carousel/carousel.vue";
export default {
  data() {
    return {
      banners: [],
      personalized: [],
      privateContent: [],
    };
  },
  mounted() {
    //获取轮播图数据
    getBanner().then((res) => {
      this.banners = res.data.banners;
    });
    //获取推荐歌单
    getPersonalized(10).then((res) => {
      this.personalized = res.data.result;
    });
    //获取私人电台
    getPrivateContent().then((res) => {
      this.privateContent = res.data.result;
    });
  },
  components: {
    MusicList,
    PrivateConent,
    carousel,
  },
};
</script>

<style scoped>
.recomment{
  width: 100%;
  position: relative;
  padding-top: 10px;
}
.banners {
  width: 95%;
}
.title {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
</style>
