import {request} from './request.js'

export function getNewMusic(type){
	return request({
		url:'/top/song',
		params:{
			type
		}
	})
}