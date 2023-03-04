<template>
<div class="simi-mv" v-if="simiMv.length">
	<div v-for="item in simiMv" class="mv-item">
		<img :src="item.cover" alt=""
		@click="enterMvDetail(item.id)"/>
	</div>
</div>
</template>

<script>
  export default{
	props: {
		simiMv: {
			type: Array,
			default(){
				return []
			} 
		},
	},
	methods: {
		enterMvDetail(id){
			this.$router.push({
			  path:'/mvdetail',
			  query:{
			    id: id
			  }
			})
		}
	},
  }
</script>

<style scoped>
	.simi-mv{
		display: flex;
		margin-bottom: 10px;
	}
	.mv-item{
		margin-right: 20px;
		width: 180px;
		height: 130px;
	}
	.mv-item img{
		width: 100%;
		height:  100%;
	}
</style>
