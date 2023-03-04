<template>
  <div class="music-list" v-if="Lists.length">
    <div
      class="comment-list"
      v-for="(item, index) in Lists"
      :key="index"
      @click="enterMusicListDetail(item.id)"
      @mouseenter="handlerMouseEnter(index)"
      @mouseleave="handlerMouseLeave(index)"
    >
     <!-- 鼠标进入显示的播放数量盒子 -->
          <div class="music-info" v-show="imgShow && i == index">
        <span>{{ item.copywriter }}</span>
        <img src="../../../assets/img/comment/listen.svg" />
        <span>{{ item.playCount | playCountFilter }}</span>
      </div>
      <el-image :src="item.picUrl || item.coverImgUrl" lazy>
          <div class="music-info" v-show="imgShow && i == index">
        <span>{{ item.copywriter }}</span>
        <img src="../../../assets/img/comment/listen.svg" />
        <span>{{ item.playCount | playCountFilter }}</span>
      </div>
     
     
        <!-- 占位加载图片区域 -->
         <div slot="placeholder" class="image-slot">
          <img :src="`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-df2597840c48e1bf6a4e67e1c5ceaf5d_b.gif&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663017323&t=db67e36e7cb0efe3402c184e25d5d875`"/>
      </div>
    </el-image>
     <!-- 鼠标进入显示的播放图标 -->
      <img
        src="@/assets/img/comment/showbofang.png"
        class="bofang-img"
        v-show="imgShow && i == index"
      />
      <!-- 歌单名字 -->
     <div> <p class="item-name">{{ item.name }}</p></div>
      
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Lists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imgShow: false, //播放图片是否显示
      i: 0, //鼠标经过的图片索引
    };
  },
  filters: {
    //过滤播放数量
    playCountFilter(value) {
      let result = value;
      if (value > 10000) {
        result = (result / 10000).toFixed(2) + "万";
      }
      return result;
    },
  },
  methods: {
    //进入歌单详情页
    enterMusicListDetail(id) {
      this.$router.push({
        path: "/musiclistdetail",
        query: { id },
      });
    },
    //鼠标移入事件
    handlerMouseEnter(index) {
      this.i = index;
      this.imgShow = true;
    },
    //鼠标离开事件
    handlerMouseLeave(index) {
      this.i = index;
      this.imgShow = false;
    }
  },
};
</script>

<style scoped>
.music-list {
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 20px 0 10px 0;
}
.comment-list {
  padding: 5px;
  width: 20%;
  height: 30%;
  position: relative;
  cursor: pointer;
}
.el-image{
  width: 100%;
  height: 200px;
  border-radius: 5%;
}
.el-image img{
  width: 100%;
  height: 200px;
  border-radius: 5px;
}
.bofang-img {
  width: 18%;
  height: 18%;
  position: absolute;
  bottom: 25%;
  left: 75%;
  border-radius: 50%;
  z-index: 10;
}
.comment-list p {
  width: 100%;
  font-size: 14px;
}
.music-info-big{
  width: 100%;
  display: flex;
  align-items: center;
}
.music-info {
  position: absolute;
  top: 5px;
  left: 0;
  width:95%;
  background: rgba(0, 0, 0, 0.2);
  font-size: 15px;
  z-index: 100;
  border-radius: 10px 10px 0 0;
  margin-left: 5px;
}
.music-info span:nth-child(1) {
  margin-right: 15px;
  width: 30%;
}
.music-info img {
  width: 15px;
  height: 10px;
}

</style>
