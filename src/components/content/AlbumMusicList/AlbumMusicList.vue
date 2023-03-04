<template>
  <!-- 歌手专辑音乐列表 -->
  <div class="song-list" v-if="list.length">
    <el-table :show-header="false" :data="list.slice(0,showMax)" stripe style="width: 100%"
    :row-class-name="tableRowClassName"
      @row-dblclick="handlerPlayMusic">
      <el-table-column
        type="index"
        width="50"
        style="color: #ccc"
      ></el-table-column>
      <el-table-column width="50">
        <template>
          <img src="../../../assets/img/detail/love.svg" id="img" />
        </template>
      </el-table-column>
      <el-table-column prop="name" width="500"> </el-table-column>
      <el-table-column prop="time" width="100"> </el-table-column>
    </el-table>
    <div @click="showMore" class="show-more"  v-show="list.length>10 && isOpen">查看更多{{list.length}}首></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showMax: 10,
      isOpen: true,
    };
  },
  computed: {
    list() {
      return this.musicList;
    },
  },
  methods: {
    ...mapMutations(["updatePlayList", "updatePlayIndex"]),
    //处理音乐播放
    handlerPlayMusic(row) {
      //更新vuex的播放列表
      this.updatePlayList(this.musicList);
      //更新vuex的播放索引
      this.updatePlayIndex(row.index);
      //this.playMusic(row.index);
    },
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    //查看更多歌曲
    showMore() {
      this.showMax += this.list.length;
      this.isOpen = false
    }
  },
};
</script>

<style scoped>
.song-list {
  margin-left: 28px;
  margin-top: 10px;
  background-color: #fff;
  font-size: 12px;
}
>>> .el-table__body tr,
>>> .el-table__body td {
  padding: 5px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
#img {
  width: 18px;
  height: 18px;
}
.show-more {
  float: right;
  color: #ccc;
}
</style>
