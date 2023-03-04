<template>
  <div class="singers-list">
    <div class="singers" v-if="Areas.length">
      <div class="caregory-item">语种:</div>
      <div
        v-for="(area, index) in Areas"
        @click="AreaClick(index)"
        :class="{ active: Areacurrent === index }"
        class="caregory-item"
        :key="index"
      >
        {{ area.content }}
      </div>
    </div>
    <div class="singers" v-if="Types.length">
      <div class="caregory-item">分类:</div>
      <div
        v-for="(type, index) in Types"
        @click="TypeClick(index)"
        :class="{ active: Typecurrent === index }"
        class="caregory-item"
        :key="index"
      >
        {{ type.content }}
      </div>
    </div>
    <div class="singers" v-if="Initials.length">
      <div class="caregory-item">筛选:</div>
      <div
        v-for="(initial, index) in Initials"
        @click="InitialClick(index)"
        :class="{ active: Initialcurrent === index }"
        class="caregory-item"
        :key="index"
      >
        {{ initial.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Areas: {
      type: Array,
      default() {
        return [];
      },
    },
    Types: {
      type: Array,
      default() {
        return [];
      },
    },
    Initials: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      Areacurrent: 0,
      Typecurrent: 0,
      Initialcurrent: 0,
    };
  },
  methods: {
    AreaClick(index) {
      this.Areacurrent = index;
      this.$emit("AreaClick", index);
    },
    TypeClick(index) {
      this.Typecurrent = index;
      this.$emit("TypeClick", index);
    },
    InitialClick(index) {
      this.Initialcurrent = index;
      this.$emit("InitialClick", index);
    },
  },
};
</script>

<style scoped>
.singers-list {
  margin-left: 30px;
}
.singers {
  display: flex;
}
.caregory-item {
  padding: 5px;
  margin-right: 10px;
  font-size: 13px;
}
.active {
  color: #e00;
  background-color: #fcf6f5;
  border-radius: 10px;
  padding: 5px;
}
</style>
