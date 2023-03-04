<template>
  <div class="mv" v-loading="isLoading">
    <div class="mv-all">
      <span
        v-for="(item, index) in Allarea"
        class="mv-item"
        @click="mvItemClick(index)"
        :class="{ active: currentIndex === index }"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
    <div class="mv-list">
      <mvList
        :mvs="mvs"
        @loadMore="loadMore"
        :isDisabled="isDisabled"
        :loading="loading"
        :noMore="noMore"
      />
    </div>
  </div>
</template>

<script>
import mvList from "../../components/content/mvList/mvList.vue";
import { getMvAll } from "../../network/mv.js";
export default {
  data() {
    return {
      Allarea: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      offset: 1,
      currentIndex: 0,
      area: "全部",
      mvs: [],
      total: 1,
      limit: 30,
      isLoading: true,
      isMore: false,
      isDisabled: false,
      loading: false,
      noMore: false,
    };
  },
  mounted() {
    this._getMvAll();
  },
  methods: {
    mvItemClick(index) {
      this.currentIndex = index;
      this.area = this.Allarea[index];
      this.mvs = []
      this._getMvAll();
    },
    //获取所有MV
    async _getMvAll() {
      const res = await getMvAll(
        this.area,
        this.limit,
        (this.offset - 1) * this.limit
      );
      console.log(res)
      this.isMore = res.data.hasMore;
      //如果还有更多
      if (this.isMore) {
        this.offset++;
        //合并请求的歌手列表数据
        this.mvs = [...this.mvs, ...res.data.data];
        //隐藏加载动画
        this.isLoading = false;
      } else {
        this.isDisabled = true;
        this.loading = false;
        this.noMore = true;
        return;
      }
    },
    //上拉加载更多
    loadMore() {
      //console.log("到底了");
      this.loading = true;
      this._getMvAll();
    },
  },
  components: {
    mvList,
  },
};
</script>

<style scoped>
.mv {
  width: 100%;
}
.mv-all {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 95%;
}
.mv-item {
  color: #909399;
  padding: 10px;
  font-size: 15px;
}
.active {
  border-bottom: 3px solid #e00;
  color: #e00;
}
.mv-list {
  width: 100%;
  margin-bottom: 20px;
}
</style>
