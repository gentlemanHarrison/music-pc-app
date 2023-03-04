<template>
<div class="top-list" :style="{backgroundImage:'url(' + toplist.coverImgUrl + ')'}">
	<div class="list-left">
	<img :src="toplist.coverImgUrl" alt=""/>
	</div>
	<div class="list-right">
	<span style="color: #ccc;">精品歌单</span>
	<p>{{toplist.name}}</p>
	<p class="list-desc">{{toplist.description}}</p>
	</div>
</div>
</template>

<script>
  export default{
	props: {
		toplist: {
			type: Object,
			default(){
				return {}
			}
		},
	},
  }
</script>

<style scoped>
	.top-list{
		display: flex;
		height: 130px;
		width: 95%;
		margin-top: 10px;
	}
	.top-list img{
		width: 120px;
		height: 120px;
		padding: 10px;
		border-radius: 5%;
	}
	.top-list p{
		font-size: 12px;
		color: #ccc;
	}
	.list-right{
		overflow: hidden;
		padding: 5px;
		height: 120px;
	}
</style>
