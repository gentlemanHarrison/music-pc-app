<template>
  <div class="singers" v-loading="isLoading">
    <!-- 歌单分类列表 -->
    <SingersList
      :Areas="areas"
      :Types="types"
      :Initials="initials"
      @AreaClick="areaClick"
      @TypeClick="typeClick"
      @InitialClick="initialClick"
    />
    <!-- 歌手列表 -->
    <SingerItem :Lists="artistsList"
     @loadMore="loadMore" 
    :isDisabled="isDisabled"
    :loading="loading"
    :noMore="noMore"/>
  </div>
</template>

<script>
import SingersList from "./childComps/SingersList.vue";
import SingerItem from "@/components/content/singerItem/SingerItem.vue";
import { getSingers } from "@/network/singers.js";
import { areas, types, initials } from "./data.js";
export default {
  data() {
    return {
      areas, //语种
      types, //歌手类型
      initials, //根据歌手名字开头头个字母查询
      limit: 30,
      offset: 1,
      currentArea: -1,
      currentType: -1,
      currentinitial: -1,
      artistsList: [],
      // total: 1000,
      isLoading: true,
      isMore: false,
      isDisabled:false,
      loading:false,
      noMore:false
    };
  },
  mounted() {
    //this._getSingers();
  },
  methods: {
    async _getSingers() {
      //获取歌手列表
      const res = await getSingers(
        this.limit,
        (this.offset - 1) * this.limit,
        this.currentType,
        this.currentArea,
        this.currentinitial
      );
      this.isMore = res.data.more;
      if (this.isMore) {
        this.offset++;
        //合并请求的歌手列表数据
        this.artistsList = [...this.artistsList, ...res.data.artists];
        this.isLoading = false;
        //console.log(this.artistsList);
      } else {
        this.isDisabled = true
        this.loading = false
        this.noMore = true
        return
      }
    },
    areaClick(index) {
      //console.log('--')
      this.artistsList = []
      this.currentArea = this.areas[index].value;
      this._getSingers();
    },
    typeClick(index) {
      //console.log('--')
      this.artistsList = []
      this.currentType = this.types[index].value;
      this._getSingers();
    },
    initialClick(index) {
      //console.log('--')
      this.artistsList = []
      this.currentinitial = this.initials[index].value;
      this._getSingers();
    },
    //上拉加载更多
    loadMore() {
      //console.log("到底了");
       this.loading = true
      this._getSingers();
    },
  },
  components: {
    SingersList,
    SingerItem,
  },
};
</script>

<style scoped>
.singers {
  width: 100%;
}
</style>
