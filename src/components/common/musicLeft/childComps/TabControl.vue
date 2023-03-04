<template>
  <div class="tab-control">
    <ul class="tab-list">
      <li
        v-for="(title, index) in titles"
        :key="index"
        :class="{ active: currentIndex === index && $route.path === title.link}"
        @click="tabClick(title.link, index)"
      >
        <img :src="title.image" />
        <span>{{ title.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    //路由跳转到对应的link上
    tabClick(link, index) {
      this.currentIndex = index;
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>
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
