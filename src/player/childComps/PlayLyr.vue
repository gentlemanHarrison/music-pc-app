<template>
<div class="play-lyr">
	<div class="lyr-background">
		<img :src="songInfo.pic"/>
	</div>
	<!-- 下箭头 -->
		<div class="downImg">
			<img src="../../assets/img/footer/downArrow.svg" 
			@click="closeFullScreen"
			/>
		</div>
		<div class="play-panel">
		<!-- 播放封面 -->
		<div class="play-img">
			<img :src="songInfo.pic"
			:class="{active:!isPlay}" />
		</div>
		
		<div class="play-info">
			<!-- 播放歌手信息 -->
		<div class="song-info">
			<p class="song-name">{{songInfo.name}}</p>
			<p class="singer-name">歌手:{{songInfo.artist}}</p>
		</div>
		<div class="lyrs" id="lyrs" ref="musicLyrs">
			<p 
			class="lyr-p" v-for="(item,key,index) in lyrData" :key="index"
			:class="{lyrActive:currentTime > allKeys[index]
					&&currentTime < allKeys[index +1]}"
			>
				{{item}}
			</p>
		</div>
	</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
	
  export default{
	  props:{
		  isPlay:Boolean,
		  songInfo: {
		  	type: Object,
		  	default(){
		  		return {}
		  	}
		  },
		// currentTime: Number,
		allKeys:{
			type:Array,
			default(){
				return []
			}
		}
	  },
	  watch:{
		 //歌词滚动
		currentTime(){
			let p = document.querySelector('p.lyrActive')
			//没有找到p直接返回，防止缩小歌词页面导致报错
			if(!p) return
			if(p.offsetTop > 300){
				this.$refs.musicLyrs.scrollTop = p.offsetTop - 300
			}
		}
	  },
	  computed:{
		...mapState(['currentTime','lyrData'])
	  },
	 methods:{
		 //退出歌词界面
		 closeFullScreen(){
			 this.$parent.isOpenlyric = false
		 }
	 }
  }
</script>

<style scoped>
	.play-lyr{
		position: fixed;
		background-color: #fff;
		left:0px;
		top:0px;
		bottom: 60px;
		z-index: 999;
		width: 100%;
		padding-top: 10px;
		height: calc(100%-60px);
		overflow-y:scroll;
	}
	.lyr-background{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: -1;
		opacity: 0.6;
		filter: blur(20px);
	}
	.lyr-background img{
		background-color: #aaa;
		opacity: 0.3;
		filter: none;
		width: 100%;
		height: 100%;
	}
	.downImg{
		margin-left: 200px;
		width: 30px;
		height: 30px;
	}
	.downImg img{
		width: 100%;
		height: 100%;
	}
	.play-panel{
		display: flex;
		height: 100%;
	}
	.play-info{
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
	}
	.song-info{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:70%;
		height: 20%;
	}
	.song-name{
		font-weight: bold;	
		margin-bottom: 10px;
		text-align: center;
	}
	.singer-name{
		text-align: center;
	}
	.lyrs{
		width:75%;
		text-align: center;
		height: 70%;
		overflow-y: scroll;	
	}
	.lyr-p{	
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		width: 100%;
	}
	.lyrActive{
		color: #00aaff;
		font-size: 18px;
	}
	.play-img{
		width: 250px;
		height: 250px;
		border-radius: 50%;
		border: 35px solid #000;
		margin-top: 10%;
		margin-left: 20%;
	}
	.play-img img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		animation: rotate 20s  linear infinite;
	}
	.active{
		animation-play-state:paused !important;
	}
</style>
