<template>
<div class="song-list"  v-if="musicList.length">
	<table class="list-table">
		<tr 
		v-for="(item, index) in musicList" 
		@dblclick="playMusic(item.id)">
			<td>{{getIndex(index)}}</td>
			<td><img src="../../../assets/img/detail/love.svg" id="img"/></td>
			<td>{{item.name}}</td>
			<td>{{item.ar[0].name}}</td>
			<td>{{item.al.name}}</td>
			<td>{{getTime(item)}}</td>
		</tr>
	</table>
	<div></div>
</div>
</template>

<script>
	import {formatDate} from '../../../components/common/utils.js'
	import {playMusic} from '../../../mixin/playMusic.js'
  export default{
	mixins:[playMusic],
	props:{
		musicList:{
			type:Array,
			default(){
				return []
			}
		}
	},
	methods:{
		getTime(item){
			//将date进行格式化
			return formatDate(new Date(item.dt),'mm:ss')
		},
		getIndex(index){
			let currentIndex = 0;
			return currentIndex = index < 9 ? "0" + (index + 1) : index + 1;
		}
	},
}
</script>

<style scoped>
	.song-list{
		margin-left: 28px;
		margin-top: 10px;
		background-color:#FFF;
		font-size: 12px;
		width: 70%;
		border-bottom: 1px solid #dcdfe6;
	}
	.list-table{
		height: 25px;	
	}
	.list-table tr td{
		padding: 5px 0;
	}
	.list-table tr:nth-child(1) td:nth-child(1){
		width: 50px;
	}
	.list-table tr:nth-child(1) td:nth-child(2){
		width: 50px;
	}
	.list-table tr:nth-child(1) td:nth-child(3){
		width: 240px;
	}
	.list-table tr:nth-child(1) td:nth-child(4){
		width: 240px;
	}
	.list-table tr:nth-child(1) td:nth-child(5){
		width: 260px;
		display: inline-block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.list-table tr:nth-child(1) td:nth-child(6){
		width: 100px;
	}
	#img{
		width: 15px;
		height: 15px;
	}
</style>
