import {request} from './request.js'

//获取所有榜单
export function getRankList(){
	return request({
		url:'/toplist'
	})
}
