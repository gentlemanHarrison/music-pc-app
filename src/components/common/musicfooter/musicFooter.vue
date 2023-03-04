<template>
<div class="music-footer">
	<!-- 播放功能-->
	 <PlayFun/>
</div>
</template>
<script>
	import PlayFun from '../../../player/PlayFun.vue'
  export default{
	 data(){
		  return{
		  }	  
	 },
	components: {
		PlayFun
	},
  }
</script>

<style scoped>
	.music-footer{
		background-color: #ededed;
		position: fixed;
		bottom: 0px;
		left: 0;
		height: 60px;
		z-index: 10;
		width: 100%;
		display: flex;
	}

</style>
