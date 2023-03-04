<template>
<div class="play-list" v-if="playList.length">
	<div 
	class="playlist-item"
	v-for="(item,index) in playList"
	:key="index">
	<img
	:src="item.pic" 
	class="song-img"/>
	<span class="song-name">{{item.name}}————</span>
	<span class="singer-name">{{item.artist}}</span>
	</div>
	
	</div>
	<div v-else>
		<p>暂时无播放的歌单</p>
	</div>
</template>

<script>
  export default{
	props:{
		playList:{
			type:Array,
			default(){
				return []
			}
		}
	}
  }
</script>

<style scoped>
	.playlist-item{
		display: flex;
		line-height: 40px;
		margin: 10px;
		height: 40px;
		width: 330px;
		overflow: hidden;
		text-overflow: ellipsis;
		 white-space:nowrap
	}
	.playlist-item:hover{
		background-color: #f9f9f9;
	}
	.playlist-item img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.song-name{
		font-size: 14px;
		font-weight: bold;	
		margin-left: 20px;
	}
	.singer-name{
		font-size: 14px;
	}
</style>
