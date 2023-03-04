import {request} from './request.js'

//获取搜索结果
export function getSearchResult(keywords,limit,offset,type){
	return request({
		url:'/search',
		params:{
			keywords,
			limit,
			offset,
			type
		}
	})
}

//获取热搜列表(详细)
export function getSearchHot(){
	return request({
		url:'/search/hot/detail',
	})
}