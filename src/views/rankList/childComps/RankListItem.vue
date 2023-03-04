<template>
  <div class="total-list">
    <div class="title">
      <h4>官方榜</h4>
    </div>
    <div class="slist" v-if="slist.length">
      <div
        class="slist-item"
        v-for="(item, index) in slist"
        :key="index"
        @click="enterSListDetail(index)"
      >
        <img :src="item.coverImgUrl" />
      </div>
      <!-- <div v-if="itemSong.length" class="song-list">
			<div 
			v-for="(item,index) in itemSong"
			class="song-item">
				<div 
				v-for="(song,index) in item" :key="index"
				class="child-item">
				<span>{{index +1}}</span>
				<span>{{song.name}}</span>
				</div>
			</div>
		</div> -->
    </div>

    <div class="title">
      <h4>全球榜</h4>
    </div>
    <div class="wlist" v-if="wlist.length">
      <div
        class="wlist-item"
        v-for="(item, index) in wlist"
        @click="enterSListDetail(index)"
        :key="index"
      >
        <img :src="item.coverImgUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slist: {
      type: Array,
      default() {
        return [];
      },
    },
    wlist: {
      type: Array,
      default() {
        return [];
      },
    },
    itemSong: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //进入排行榜详情界面
    enterSListDetail(index) {
      this.$router.push({
        path: "/musiclistdetail",
        query: {
          id: this.slist[index].id,
        },
      });
    },
  },
};
</script>

<style scoped>
.total-list {
  width: 95%;
}
.title {
  margin: 10px 0 10px 0;
}
.slist {
  width: 100%;
}
.slist-item {
  width: 175px;
  height: 175px;
  margin-right: 20px;
  cursor: pointer;
  margin-bottom: 20px;
}
.slist-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
/* .song-list{
		display: flex;
		
	} */
/* .song-item{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 220px;
		font-size: 14px;
		margin-left: 15px;
		border-left: 1px solid #dcdfe6;
		border-right: 1px solid #dcdfe6;
		border-bottom: 1px solid #dcdfe6;
	} */
/* .child-item{
		padding: 10px;
	}
	.child-item:hover{
		background-color: #00aaff;
	}
	.child-item span:nth-child(1){
		margin-right: 10px;
	}
	.child-item span:nth-child(2){
		margin-right: 20px;
	}
	.el-icon-video-play:hover{
		color: #ff0000;
	} */
.wlist {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.wlist-item {
  width: 20%;
  height: 20%;
  cursor: pointer;
  padding: 10px 10px 10px 0;
}
.wlist-item img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
