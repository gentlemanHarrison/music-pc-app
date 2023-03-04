<template>
  <div class="private-content" v-if="content.length">
    <div class="content-info" v-for="item in content" :key="item.id">
      <img :src="item.picUrl" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.private-content {
  display: flex;
  width: 95%;
  height: 40%;
  justify-content: space-around;
}
.content-info {
  width: 33%;
  padding: 5px 5px 10px 0;
}
.content-info img {
  width: 100%;
  height: 150px;
  border-radius: 10px;
}
.content-info p {
  font-size: 14px;
}
</style>
