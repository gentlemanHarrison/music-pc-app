<template>
	<div class="song-info">
		<div class="song-img">
		<img :src="songInfo.pic" />
		</div>
		<div class="info-item">
			<span class="song-name">{{songInfo.name}}</span>
		<span class="singer-name">{{songInfo.artist}}</span>
		</div>
		
	</div>
</template>

<script>
  export default{
		props: {
			songInfo: {
				type: Object,
				default(){
					return {}
				}
			},
		},
	}
</script>

<style scoped>
	.song-info{
		width: 18%;
		display: flex;
	}
	.song-img{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.song-img img{
		border-radius: 10%;
		width: 40px;
		height: 40px;
	}
	.info-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.song-name{
		font-size: 13px;
		font-weight: bold;
		width: 160px;
		height: 20px;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
		white-space:nowrap
	}
	.song-info .singer-name{
		font-size: 13px;
		width: 160px;
		height: 20px;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
		white-space:nowrap
	}
</style>
