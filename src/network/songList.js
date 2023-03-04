import {request} from './request.js'

//歌单分类
export function getCatlist(){
	return request({
		url:'/playlist/catlist'
	})
}

//获取热门歌单
export function getHotPlaylist(cat,limit,offset){
	return request({
		url:'/playlist/hot',
		params:{
			cat,
			limit,
			offset
		}
	})
}

//获得精品歌单
export function getHighQuality(cat,limit){
	return request({
		url:'/top/playlist/highquality',
		params:{
			cat,
			limit:1
		}
	})
}

/**获取歌单--网友精选碟，全部歌单 */
export function getPlayList(cat,limit,offset){
    return request({
        url:'/top/playlist',
        params:{
            cat,
            limit,
            offset
        }
    })
}