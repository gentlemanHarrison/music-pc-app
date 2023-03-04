<template>
<div class="detail-comment" v-if="detailComments.length">
	<div class="comment-area">
		<textarea class="text-area"></textarea>
		<el-button type="text" class="comment-button">评论</el-button>
	</div>	
	
	<div class="selcet-comment"  >
		<p class="title">最新评论</p>
		<div class="comment-base"
		v-for="item in detailComments"
		:key="item.time">
		 <img :src="item.user.avatarUrl" alt=""/>
		 <div class="comment-info">
			 <span>{{ item.user.nickname }}:&nbsp;</span>
			 <span>{{item.content}}</span>
			 <p>{{getTime(item.time)}}</p>
		 </div>
		</div>
	</div>
</div>
</template>

<script>
	import {formatDate} from '../../../components/common/utils.js'
  export default{
	props:{
		detailComments:{
			type:Array,
			default(){
				return []
			}
		}
	},
	methods:{
		//格式化评论时间
		getTime(value){
			return formatDate(new Date(value),"yyyy年MM月dd日 hh:mm")
		}
	}
  }
</script>

<style scoped>
	.detail-comment{
		margin-left: 30px;
	}
	.comment-area{
		margin-top: 10px;
		background-color:  #f0f0f2;
		height: 130px;
		width: 77%;
	}
	.text-area{
		width: 95%;
		height: 60px;
		margin-top: 20px;
		margin-left: 25px;
	}
	.comment-button{
		position: relative;
		left: 95%;	
	}
	.selcet-comment{
		margin-top: 10px;
	}
	.selcet-comment .title{
		font-size: 16px;	
		font-weight: bold;
	}
	.comment-base{
		display: flex;
		padding: 20px;
		border-bottom: 1px solid #ccc;
	}
	.comment-base img{
		width: 40px;
		height: 40px;
		border-radius: 30px;
		margin-right: 20px;
	}
	.comment-info{
		font-size: 13px;
		width: 90%;
	}
	.comment-info p{
		margin-top: 10px;
		color: rgb(183, 172, 172);
	}
	.comment-info span:nth-child(1){
		color: #5c90c4;
	}
	
</style>
