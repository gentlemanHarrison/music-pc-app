<template>
  <div
    class="singer-mv"
    v-if="mvs.length"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="isDisabled"
    :infinite-scroll-immediate="false"
    :infinite-scroll-delay="200"
  >
    <div
      v-for="(item, index) in mvs"
      :key="index"
      class="mv-list"
      @click="enterMvDetail(item.id)"
    >
      <!-- mv列表封面区域 -->
      <el-image :src="item.imgurl || item.cover" lazy>
        <p>{{ item.name }}</p>
        <!-- 占位加载图片区域 -->
        <div slot="placeholder" class="image-slot">
          <img
            :src="`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-df2597840c48e1bf6a4e67e1c5ceaf5d_b.gif&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663017323&t=db67e36e7cb0efe3402c184e25d5d875`"
          />
        </div>
      </el-image>
      <div class="mv-info">
        <p>{{ item.name }}</p>
        <p>{{ item.artistName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvs: {
      type: Array,
      default() {
        return [];
      },
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    noMore: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    enterMvDetail(id) {
      this.$router.push({
        path: "/mvdetail",
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
.singer-mv {
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 10px 0 10px 0;
}
.mv-list {
  padding: 5px;
  width: 33.3%;
  cursor: pointer;
}
.el-image {
  width: 100%;
  height: 180px;
  border-radius: 5px;
}
.el-image img {
  width: 100%;
  height: 180px;
  border-radius: 5px;
}
.mv-list p {
  width: 100%;
  height: 35px;
  font-size: 14px;
  overflow: hidden;
}
.mv-info p:nth-child(1) {
  width: 100%;
  padding-top: 5px;
  height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mv-info p:nth-child(2) {
  width: 100%;
  height: 20px;
  font-size: 12px;
  color: #aaa;
}
</style>
