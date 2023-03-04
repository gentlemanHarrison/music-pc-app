<template>
<div class="singer-info">
	<div class="info-top">
		<div class="info-left">
			<img :src="singerInfo.picUrl"/>
		</div>
		<div class="info-right">
			<span class="singer">歌手</span>
			<span class="singer-name">{{singerInfo.name}}</span>
			<div class="right-item">
				<p>单曲数:<i>{{singerInfo.musicSize}}</i></p>
				<p>专辑数:<i>{{singerInfo.albumSize}}</i></p>
				<p>MV数:<i>{{singerInfo.albumSize}}</i></p>
				<p>简介:<i>{{singerDesc.briefDesc}}</i></p>
			</div>
		</div>
		
	</div>
	
</div>
</template>

<script>
  export default{
	props: {
		singerInfo: {
			type: Object,
			default(){
				return {}
			}
		},
		singerDesc:{
			type: Object,
			default(){
				return {}
			}
		}
	},
  }
</script>

<style scoped>
	.singer-info{
		padding-top: 10px;
	}
	.info-top{
		display: flex;
	}
	.info-left{
		width: 20%;
	}
	.info-left img{
		width: 100%;
		height: 180px;
		border-radius: 5px;
	}
	.info-right{
		margin: 10px 30px;
	}
	.singer{
		color: #e83c3c;
		font-weight: 600;
		font-size: 14px;
		border: 2px solid #e83c3c;
		padding: 5px 10px;
		border-radius: 10%;
	}
	.singer-name{
		font-weight: 600;
		font-size: 16px;
		margin-left: 10px;
	}
	.right-item p{
		font-size: 13px;
		margin-top: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 500px;
		
	}
	.right-item p i{
		margin-left: 4px;
	}
</style>
