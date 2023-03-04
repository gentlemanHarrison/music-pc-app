<template>
  <div class="detail-collect" v-if="detailSubs.length">
    <div
      class="collecter-item"
      v-for="(item, index) in detailSubs"
      :key="index"
    >
	<div class="collecter-img"> <img :src="item.avatarUrl" alt="" /></div>
     <p>{{ item.nickname }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailSubs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-collect {
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 20px;
  flex-wrap: wrap;
}
.collecter-item {
	padding: 10px;
  display: flex;
  width: 50%;
}
.collecter-item p{
  font-size: 13px;
  display: flex;
  align-items: center;
  padding: 5px;
}
.collecter-img {
  width: 100px;
  height: 100px;
}
.collecter-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>