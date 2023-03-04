<template>
  <!-- v-show="duration!=0" -->
  <div class="play-fun">
    <!-- 播放的基本信息 -->
    <PlayInfo :songInfo="playList[playIndex]" @click.native="openLyric" />
    <!-- 歌词抽屉 -->
    <PlayLyr
      v-show="isOpenlyric === true"
      :isPlay="isPlay"
      :songInfo="playList[playIndex]"
      :allKeys="allKeys"
    />
    <!-- :currentTime="currentTime" -->
    <!-- 播放图标区域 -->
    <div class="play-icon">
      <img src="../assets/img/footer/up.svg" @click="preMusic" />
      <!-- 播放暂停切换 -->
      <img :src="isPlay ? pauseImg : playImg" @click="paly_pause" />
      <img src="../assets/img/footer/down.svg" @click="nextMusic" />
    </div>
    <!-- 当前播放时长 -->
    <div class="play-currentTime">{{ getCurrentTime }}</div>

    <!-- 音乐进度条 -->
    <div class="playSlider">
      <el-slider
        v-model="percent"
        :show-tooltip="false"
        @change="changeMusicDuration"
        @mousedown="isDrag == true"
        @mouseup="isDrag == false"
        :disabled="duration == 0"
      >
      </el-slider>
    </div>
    <!-- 音乐总时长 -->
    <div class="play-duration">{{ getDuration }}</div>
    <!-- 音乐音量 -->
    <div class="volume-icon" @click="toggleMuted">
      <img src="../assets/img/footer/volumeOpen.svg" v-if="!isMuted" />
      <img src="../assets/img/footer/volumeClose.svg" v-else />
    </div>
    <!-- 音量进度条 -->
    <div class="play-volume">
      <el-slider
        v-model="volumePercent"
        :show-tooltip="false"
        @change="changeVolume"
      >
      </el-slider>
    </div>
    <!-- 播放模式区域 -->
    <div class="play-switch" @click="toggleSchema">
      <el-tooltip
        class="shunxuItem"
        effect="dark"
        content="顺序播放"
        placement="top"
        v-show="schemaIndex == 0"
      >
        <img src="../assets/img/footer/shunxu.svg" />
      </el-tooltip>
      <el-tooltip
        class="randomItem"
        effect="dark"
        content="随机播放"
        placement="top"
        v-show="schemaIndex == 1"
      >
        <img src="../assets/img/footer/random.svg" />
      </el-tooltip>
      <el-tooltip
        class="loopItem"
        effect="dark"
        content="单曲循环"
        placement="top"
        v-show="schemaIndex == 2"
      >
        <img src="../assets/img/footer/loop.svg" />
      </el-tooltip>
    </div>

    <!-- 音乐列表图标区域 -->
    <div class="play-list">
      <el-tooltip effect="dark" content="播放列表" placement="top">
        <img
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px"
          src="../assets/img/musicLeft/musicList.svg"
        />
      </el-tooltip>
      <!-- 音乐列表抽屉 -->
      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        :modal-append-to-body="false"
        :modal="false"
      >
        <h3 class="title">播放列表</h3>
        <!-- 抽屉的音乐列表 -->
        <DetailSongList :musicList="playList" />
      </el-drawer>
    </div>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`"
      autoplay
      ref="audio"
      @timeupdate="audioTimeUpdate()"
      @play="musicLoad()"
      @playing="musicPlay()"
      @ended="musicEnd()"
      :loop="schemaIndex === 2 ? true : false"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import PlayInfo from "./childComps/PlayInfo.vue";
import { getLyric } from "../network/ListDetail.js";
import { formatDate } from "@/components/common/utils.js";
import DetailSongList from "../views/musicListDetail/childComps/DetailSongList.vue";
import PlayLyr from "./childComps/PlayLyr.vue";
export default {
  name: "PlayFun",
  data() {
    return {
      isPlay: false, //是否播放
      playImg: require("../assets/img/footer/play.svg"), //播放图片
      pauseImg: require("../assets/img/footer/pause.svg"), //暂停图片
      currentTime: 0, //当前音乐播放时间
      duration: 0, //当前音乐总时间
      percent: 0, //音乐时长百分比
      volumePercent: 100, //音量总百分比
      isDrag: false, //是否拖拽
      isMuted: false, //是否关闭声音
      preVolumePercent: 0, //当前音量百分比
      schemaIndex: 0, //默认0是顺序播放，1是随机播放 2是单曲循环
      drawer: false, //是否打开播放的歌单
      isOpenlyric: false, //是否打开歌词界面
      lyrData: null, //歌词数据
      allKeys: [], //歌词所有的key
    };
  },
  mounted() {
    //使用事件总线接收playMusic的信息
    // this.$bus.$on("playMusic", (playList, index, musicList, id) => {
    //   this.playList = playList;
    //   this.musicList = musicList;
    //   this.playIndex = index;
    //   this.playListId = id;
    // });
  },
  watch: {
    //监视音乐进度条改变,一旦改变，再次调用
    percent() {
      //如果正在拖拽
      if (this.isDrag) {
        this.HandlerMusicPercent();
      }
    },
  },
  computed: {
    ...mapState(["playList", "playIndex"]),
    //获得播放的音乐的src
    // playMusic() {
    //   // return (
    //   //   (this.playList[this.playIndex] && this.playList[this.playIndex].src) ||''
    //   // );
    //   //return this.playList[this.playIndex] && `https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`
    // },
    /**格式化audio currentTime => 'MM:dd' */
    //获得当前歌曲时长
    getCurrentTime() {
      /* new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
      return formatDate(new Date(this.currentTime * 1000), "mm:ss") || "00:00";
    },
    //获得当前歌曲总时长
    /**格式化audio duration => 'MM:dd' */
    getDuration() {
      /* new Date()传入的是毫秒，而$refs.audio.duration返回的是秒*/
      return formatDate(new Date(this.duration * 1000), "mm:ss") || "00:00";
    },
  },
  methods: {
    ...mapMutations(["updateCurrentTime", "updateLyrData", "updatePlayIndex"]),
    //处理音乐进度条的封装方法
    HandlerMusicPercent() {
      this.$refs.audio.currentTime = parseInt(
        (this.percent / 100) * this.$refs.audio.duration
      );
      this.percent =
        parseInt(this.$refs.audio.currentTime / this.$refs.audio.duration) *
        100;
    },
    //音乐开始加载
    musicLoad() {
      //获取当前音频的长度（以秒计）
      this.duration = parseInt(this.$refs.audio.duration);
      getLyric(this.playList[this.playIndex].id).then((res) => {
        //console.log(res.data.lrc.lyric)
        // 解析歌词
        this.handleLyric(res.data.lrc.lyric);
      });
    },
    //开始播放音乐
    musicPlay() {
      this.isPlay = true;
    },
    //播放或暂停
    paly_pause() {
      this.isPlay = !this.isPlay;
      //如果正在播放
      if (this.isPlay) {
        //播放歌曲
        this.$refs.audio.play();
      } else {
        //暂停歌曲
        this.$refs.audio.pause();
      }
    },
    //上一首
    preMusic() {
      let index = this.playIndex;
      //歌曲的索引小于等于 0 跳回到歌单的最后一首
      if (index <= 0) {
        index = this.playList.length - 1;
      } else {
        index--;
      }
      //更新vuex播放歌曲的索引
      this.updatePlayIndex(index);
    },
    //下一首
    nextMusic() {
      let index = this.playIndex;
      if (index >= this.playList.length - 1) {
        index = 0;
      } else {
        index++;
      }
      //更新vuex播放歌曲的索引
      this.updatePlayIndex(index);
    },
    //当前音乐时长更新
    audioTimeUpdate() {
      if (this.$refs.audio != null && !this.isDrag) {
        // 获取当前播放时间以秒计
        this.currentTime = parseInt(this.$refs.audio.currentTime);
        this.updateCurrentTime(this.currentTime);
        // 计算当前音乐进度条的位置
        this.percent = parseInt((this.currentTime / this.duration) * 100);
      }
    },
    //音乐进度条发生改变(鼠标拖拽松开时)
    changeMusicDuration() {
      this.isDrag = true;
      if (this.duration <= 0) {
        return;
      } else {
        //调用处理音乐进度条事件
        this.HandlerMusicPercent();
      }
      this.isDrag = false;
    },
    //改变音乐音量
    changeVolume() {
      if (this.$refs.audio) {
        this.$refs.audio.volume = this.volumePercent / 100;
      }
    },
    //改变音量大小
    toggleMuted() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        /**保存之前音量 */
        this.preVolumePercent = this.volumePercent;
        this.$refs.audio.volume = 0;
        this.volumePercent = 0;
      } else {
        this.$refs.audio.volume = this.preVolumePercent / 100;
        this.volumePercent = this.preVolumePercent;
      }
    },
    //切换播放模式
    toggleSchema() {
      this.schemaIndex >= 2 ? (this.schemaIndex = 0) : this.schemaIndex++;
    },
    //音乐结束，判断播放模式
    musicEnd() {
      this.isPlay = false;
      //console.log("音乐结束")
      let index = this.playIndex;
      if (this.schemaIndex === 0) {
        index >= this.playList.length - 1 ? 0 : index++;
      }
      if (this.schemaIndex === 1) {
        index = parseInt(Math.random() * this.playList.length);
      }
      if (this.schemaIndex === 2) {
        index = index;
      }
      //更新vuex中的playIndex
      this.updatePlayIndex(index);
    },
    //打开歌词界面
    openLyric() {
      this.isOpenlyric = true;
    },
    //解析歌词
    handleLyric(values) {
      if (!values) return
      var lrc = {};
      var lyrics = values.split("\n");
      //console.log(lyrics)
      var reg = /\[\d*:\d*(\.|:)\d*]/g;
      for (let i = 0; i < lyrics.length; i++) {
        var timeRegArr = lyrics[i].match(reg);
        //console.log(timeRegArr) [00:00.000]
        if (!timeRegArr) continue;
        //获取歌词
        var content = lyrics[i].replace(timeRegArr, "");
        //console.log(content)
        //获取时间
        var t = timeRegArr[0];
        var min = parseInt(t.match(/\[\d*/i).toString().slice(1));
        var sec = parseInt(t.match(/\:\d*/i).toString().slice(1));
        var time = min * 60 + sec;
        //console.log(time)
        lrc[time] = content;
        //console.log(lrc)
      }
      this.lyrData = lrc;
      // 更新歌词数据
      this.updateLyrData(this.lyrData);
      // 保存歌词所有的key值
      this.getAllKeys(lrc);
      //console.log(this.lyrData)
    },
    getAllKeys(lrcArr) {
      //获得所有歌词时先清空之前的歌词清空
      this.allKeys = [];
      for (let i in lrcArr) {
        this.allKeys.push(i);
      }
      //console.log(this.allKeys)
    },
  },
  components: {
    PlayInfo,
    DetailSongList,
    PlayLyr,
  },
};
</script>

<style scoped>
.play-fun {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.play-icon {
  display: flex;
}
.play-icon img {
  width: 50px;
  height: 30px;
}
.play-currentTime {
  padding: 0 15px;
}
.playSlider {
  width: 430px;
}
.play-duration {
  padding: 0 15px;
}
.play-volume {
  width: 100px;
}
.volume-icon {
  margin-right: 2px;
}
.volume-icon img:nth-child(1) {
  display: flex;
  width: 20px;
  height: 20px;
}
.volume-icon img:nth-child(2) {
  display: flex;
  width: 20px;
  height: 20px;
}
.play-switch {
  display: flex;
  margin-left: 25px;
}
.play-switch img {
  width: 20px;
  height: 20px;
}
.play-list {
  display: flex;
  margin-left: 5px;
  margin-right: 20px;
}
.play-list img {
  width: 20px;
  height: 20px;
}
.title {
  margin-left: 20px;
}
>>> .el-slider__runway {
  height: 3px;
}
>>> .el-slider__bar {
  height: 3px;
  background-color: #e00;
}
>>> .el-slider__button-wrapper {
  top: -16px;
}
>>> .el-slider__button {
  width: 10px;
  height: 10px;
  border: 1px solid #e00;
  background-color: #e00;
}
</style>
