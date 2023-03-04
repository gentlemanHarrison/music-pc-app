<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length">
    <div class="info-left">
      <img :src="baseInfo.img" alt="" />
    </div>
    <div class="info-center">
      <span class="song-list">歌单</span>
      <span class="info-name">{{ baseInfo.name }}</span>
      <div class="right-item">
        <img :src="baseInfo.avatar" />
        <span>{{ baseInfo.nickname }}</span>
        <span>创建时间: {{ getCreateTime }}</span>
      </div>
      <div class="middle">
        <el-row>
          <el-button type="danger" class="button" round>
            <i class="el-icon-video-play"></i>
            播放全部</el-button
          >
          <el-button plain class="button">
            <i class="el-icon-folder-add"></i>
            收藏({{ baseInfo.subscribedCount }})
          </el-button>
          <el-button plain class="button">
            <i class="el-icon-share"></i>
            分享({{ baseInfo.shareCount }})
          </el-button>
        </el-row>
      </div>
      <div class="info-tag">
        标签: <span class="tag-list">{{ getTags }}</span>
      </div>
      <div class="info-tag">
        简介:
        <span style="color: #aaa">{{ baseInfo.title }}</span>
      </div>
    </div>
    <div class="play">
      <div class="play-left">
        歌曲数
        <br />
        {{ baseInfo.trackCount }}
      </div>
      <div class="play-right">
        播放数
        <br />
        {{ getPlayCount }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../components/common/utils.js";
export default {
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getCreateTime() {
      return formatDate(new Date(this.baseInfo.createTime), "yyyy-MM-dd");
    },
    //歌曲标签美化
    getTags() {
      return this.baseInfo.tags && this.baseInfo.tags.join("/");
    },
    //格式化播放人数
    getPlayCount() {
      let count = this.baseInfo.playCount / 10000;
      return count.toFixed(2) + "万";
    },
  },
};
</script>

<style scoped>
.base-info {
  display: flex;
}
.info-left {
  margin: 20px 20px 0 0;
  width: 180px;
  height: 40px;
}
.info-left img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
.info-center {
  margin: 30px 20px;
}
.info-center .song-list {
  color: #e83c3c;
  font-weight: 600;
  font-size: 14px;
  border: 2px solid #e83c3c;
  padding: 5px 10px;
  border-radius: 10%;
}
.info-name {
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
}
.right-item {
  display: flex;
  margin-top: 15px;
  height: 30px;
}
.right-item img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.right-item span {
  font-size: 14px;
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
}
.middle {
  margin-top: 10px;
  display: flex;
}
.button {
  width: 150px;
}
.info-tag {
  margin-top: 10px;
  font-size: 13px;
  width: 450px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.tag-list {
  color: #00aaff;
}
.play {
  display: flex;
  height: 50px;
  font-size: 13px;
  margin-top: 20px;
  position: relative;
  right: -120px;
}
.play-left {
  border-right: 1px solid #dcdfe6;
  padding: 5px;
}
.play-right {
  padding: 5px;
}
</style>
