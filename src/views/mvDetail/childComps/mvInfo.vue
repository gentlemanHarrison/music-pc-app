<template>
<div class="detail-info">
	<div class="detail-title">
			<span class="mv-logo">MV</span>
			<span class="mv-artistName">{{mvInfo.artistName}}—</span>
			<span class="mv-name">{{mvInfo.name}}</span>
		</div>
		<div class="mv-video">
			<video :src="mvUrl" class="mv-url" controls preload poster/>
		</div>
	<div class="detail-desc">
			<span class="mv-logo">MV介绍</span>
			<p class="mv-time">发布时间:
			<span>{{mvInfo.publishTime}}</span>
			</p>
			<p class="mv-time">播放次数:
			<span>{{mvInfo.playCount}}</span>
			</p>
			<p class="mv-desc">简介:
			<span>{{mvInfo.desc||"暂无简介"}}</span>
			</p>
		</div>	
	
</div>		
</template>

<script>
  export default{
	props: {
		mvInfo: {
			type: Object,
			default(){
				return {}
			}
		},
		mvUrl: {
			type: String,
			default:null
		},
	},
  }
</script>

<style scoped>
	.detail-title{
		margin-top: 20px;
		height: 40px;
	}
	.mv-logo{
		color: #e83c3c;
		font-weight: 600;
		font-size: 14px;
		border: 2px solid  #e83c3c;
		border-radius: 10%;
		padding: 5px;
	}
	.mv-artistName{
		margin-left: 10px;
	}
	.mv-name{
		color: #00aaff;
	}
	.mv-video{
		width: 70%;
		height: 70%;
	}
	.mv-video video{
		width: 100%;
		height: 100%;
	}
	.mv-time{
		margin-top: 10px;
		font-size: 13px;
	}
	.mv-desc{
		margin-top: 10px;
		font-size: 13px;
		width: 90%;
	}
	.detail-desc{
		margin-top: 20px;
		margin-bottom: 10px;
	}
</style>
