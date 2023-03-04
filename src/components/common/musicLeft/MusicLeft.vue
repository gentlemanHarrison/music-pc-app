<template>
  <div class="music-left">
    <!-- <TabControl :titles="titlesList" /> -->
    <div class="tab-control">
    <ul class="tab-list">
      <li
        v-for="(title, index) in titlesList"
        :key="index"
        :class="$route.path=== title.link?'active':''"
        @click="tabClick(title.link, index)"
      >
      <!-- :class="{ active: tabCurrentIndex === index || $route.path === title.link}" -->
        <img :src="title.image" />
        <span>{{ title.name }}</span>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
//import TabControl from "./childComps/TabControl.vue";
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      titlesList: [
        {
          name: "个性推荐",
          image: require("@/assets/img/musicLeft/comment.svg"),
          link: "/recomment",
        },
        {
          name: "歌单",
          image: require("@/assets/img/musicLeft/musicList.svg"),
          link: "/songlist",
        },
        {
          name: "排行榜",
          image: require("@/assets/img/musicLeft/list.svg"),
          link: "/ranklist",
        },
        {
          name: "歌手",
          image: require("@/assets/img/musicLeft/songers.svg"),
          link: "/singers",
        },
        {
          name: "MV",
          image: require("@/assets/img/musicLeft/MV.svg"),
          link: "/mv",
        },
        {
          name: "最新音乐",
          image: require("@/assets/img/musicLeft/new.svg"),
          link: "/newmusic",
        },
      ],
      //currentIndex: 0,
    };
  },
  // computed:{
  //   ...mapState(['tabCurrentIndex'])
  // },
   methods: {
    //...mapMutations(['updateTabCurrentIndex']),
    //路由跳转到对应的link上
    tabClick(link, index) {
      this.$router.push(link);
      //this.updateTabCurrentIndex(index)
    },
  },
  components: {
    // TabControl,
  },
};
</script>

<style scoped>
.music-left {
  width: 16%;
  background-color: #ededed;
  overflow: hidden;
  height:calc(100% - 60px);
}
.tab-control {
  height: 100%;
  width: 100%;
}
.tab-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.tab-list li {
  padding: 20px;
  font-size: 13px;
  width: 100%;
  height: 12%;
}
.active {
  border-left: 5px solid #e00;
  color: #e00;
}
span {
  margin-left: 15px;
  font-size: 15px;
}
img {
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
</style>
