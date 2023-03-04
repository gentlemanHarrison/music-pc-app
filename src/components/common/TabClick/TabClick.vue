<!--  -->
<template>
  <div class="list">
    <div
      v-for="(item, index) in list"
      class="list-item"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
      :key="index"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabClick",
  props: {
    list:{
        type:Array,
        default(){
            return []
        },
    },
    currentIndex:{
        type:Number,
        default: 0
    }
  },
  created(){
    console.log(this.currentIndex)
  },
  methods: {
    itemClick(index) {
      //   this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style scoped>
.list {
  display: flex;
  width: 95%;
}
.list-item {
  margin: 10px 25px 10px 0;
  padding: 5px 0;
  font-size: 13px;
}
.active {
  border-bottom: 3px solid #e00;
  font-weight: bold;
  font-size: 15px;
}
</style>
