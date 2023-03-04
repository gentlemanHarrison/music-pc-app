<template>
<div class="hot-play-list" v-if="Hottags.length">
	<!-- 标签 -->
	<div v-for="(item,index) in Hottags" :key='index' class="tags">
		<span class="tag-item" 
		@click="itemClick(index,item.name)"
		:class="{active:currentIndex === index}"
		>
		{{item.name}}
		</span>
	</div>
</div>
</template>

<script>
  export default{
	 data() {
	  	return {
	  		currentIndex: 0
	  	}
	  },
	props: {
		Hottags: {
			type: Array,
			default(){
				return []
			} 
		},
		playlists:{
			type: Array,
			default(){
				return []
			} 
		}
	},
	methods: {
		itemClick(index) {
			this.currentIndex = index
			this.$emit('itemClick',index)
		}
	},
  }
</script>

<style scoped>
	.hot-play-list{
		width: 95%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.tags{
		margin-top: 10px;
	}
	.tag-item{
		font-size: 15px;
		padding: 5px 10px;
		color: grey;
		cursor: pointer;
	}
	.active{
		border-bottom: 3px solid #e00;
		color: #e00;
	}
</style>
