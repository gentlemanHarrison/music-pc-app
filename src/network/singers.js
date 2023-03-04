import {request} from './request.js'

export function getSingers(limit,offset,type,area,initial){
	return request({
		url:'/artist/list',
		params:{
			limit,
			offset,
			type,
			area,
			initial
		}
	})
}

//获取歌手基本信息
export function getSingerDesc(id){
	return request({
		url:'/artist/desc',
		params:{
			id
		}
	})
}
//歌手热门50首歌曲
export function getTopSong(id){
	return request({
		url:'/artist/top/song',
		params:{
			id
		}
	})
}

/**获取歌手专辑 */
export function getSingerAlbum(id,limit){
    return request({
        url:'/artist/album',
        params:{
            id,
			limit:10
        }
    })
}

/**获取专辑内容 */
export function getAlbum(id){
    return request({
        url:'/album',
        params:{
            id
        }
    })
}

/**mv */
export function getSongerstMv(id){
    return request({
        url:'/artist/mv',
        params:{
            id:id
        }
    })
}