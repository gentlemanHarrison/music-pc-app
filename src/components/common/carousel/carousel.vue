<template>
  <!-- elment跑马灯封装组件 -->
  <el-carousel :interval="5000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <img :src="item.imageUrl" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    }
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>