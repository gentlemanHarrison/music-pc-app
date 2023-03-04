<template>
  <!-- 歌手列表 -->
  <div class="singer-list" 
  v-infinite-scroll="load"
  :infinite-scroll-disabled="isDisabled"
  :infinite-scroll-immediate="false"
  :infinite-scroll-delay="200"
  >
    <div
      class="item-list"
      v-for="(item, index) in Lists"
      :key="index"
      @click="enterSongerDetail(item.id)"
    >
      <el-image :src="item.picUrl" lazy>
        <div slot="placeholder" class="image-slot">
          <img :src="`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-df2597840c48e1bf6a4e67e1c5ceaf5d_b.gif&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663017323&t=db67e36e7cb0efe3402c184e25d5d875`"/>
        </div>
      </el-image>
      <div><p>{{ item.name }}</p></div>
    </div>
    <p v-show="loading" style="margin-left:40%;font-size:13px">加载中...</p>
    <p v-if="noMore" style="margin-left:40%;font-size:13px">没有更多了</p>
  </div>
</template>

<script>
export default {
  props: {
    Lists: {
      type: Array,
      default() {
        return [];
      },
    },
    isDisabled:{
      type:Boolean,
      default:false
    },
    loading:{
      type:Boolean,
      default:false
    },
    noMore:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    enterSongerDetail(id) {
      // console.log(id)
      //跳转到歌曲详情页
      this.$router.push({
        path: "/singerdetail",
        query: { id },
      });
    },
    //传给父组件上拉加载更多的方法
    load() {
      this.$emit("loadMore");
    },
  },
};
</script>

<style scoped>
.singer-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px 0 20px 20px;
}
.item-list {
  width: 18%;
  padding: 5px;
  margin:5px;
  cursor: pointer;
}
.item-list img {
  width: 100%;
  height: 170px;
  border-radius: 5px;
}
.el-image {
  width: 100%;
  height: 170px;
  border-radius: 5px;
}
.item-list p {
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
