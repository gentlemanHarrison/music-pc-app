<template>
  <div class="song-list" v-if="musicList.length">
    <el-table
      stripe
      :data="musicList"
      style="width: 100%; font-size: 12px"
      :row-class-name="tableRowClassName"
      @row-dblclick="handlerPlayMusic"
    >
      <el-table-column
        style="height: 60px"
        type="index"
        label=""
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="封面" width="100" align="center" v-if="show">
        <template slot-scope="{ row, $index }">
          <el-image
            lazy
            :src="row.pic"
            alt=""
            style="width: 40px; height: 40px; border-radius: 10%"
          >
            <!-- 占位加载图片区域 -->
            <div slot="placeholder" class="image-slot">
              <img
                :src="`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a0285b97e9ffa80121a0f7c379e4.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663089125&t=19b7453a29513d519d35b32accdd02a8`"
              />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="音乐标题" width="250" align="center">
        <template slot-scope="{ row, $index }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="歌手" width="250" align="center">
        <template slot-scope="{ row, $index }">
          {{ row.artist }}
        </template>
      </el-table-column>
      <el-table-column prop="album" label="专辑" width="200" align="center">
        <template slot-scope="{ row, $index }">
          {{ row.album }}
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="100" align="center">
        <template slot-scope="{ row, $index }">
          {{ row.time }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { playMusic } from "../../../mixin/playMusic.js";
export default {
  //mixins: [playMusic],
  data() {
    return {
      //歌单id
      id: null,
    };
  },
  props: {
    //歌单列表
    musicList: {
      type: Array,
      default() {
        return [];
      },
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapMutations(["updatePlayList", "updatePlayIndex"]),
    //处理音乐播放
    handlerPlayMusic(row) {
      this.updatePlayList(this.musicList);
      this.updatePlayIndex(row.index);
      //this.playMusic(row.index);
    },
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
  },
};
</script>

<style scoped>
.song-list {
  background-color: #fff;
  font-size: 12px;
  width: 100%;
}
.el-image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.el-image img {
  width: 100%;
  height:100%;
  border-radius: 5px;
}
</style>
