import {request} from './request.js'
import {formatDate} from '../components/common/utils.js'

//获取歌单详情
export function getMusicListDetail(id){
    return request({
        url:'/playlist/detail',
        params:{
            id
        }
    })
}
/**获取歌单歌曲信息 */
export function getSongsDetail(id){
    return request({
        url:`/playlist/track/all?id=${id}`,
    })
}

/**获取歌曲url */
export function getMusicUrl(id){
    return request({
        url:'/song/url',
        params:{
            id
        }
    })
}
//获得歌单评论
export function getRecomment(id,limit,offset){
	return request({
		url:'/comment/playlist',
		params:{
			id,
			limit,
			offset
		}
	})
}

/**获取歌单收藏者 */
export function getSubs(id,limit){
    return request({
        url:'/playlist/subscribers',
        params:{
            id,
            limit
        }
    })
}

/**获取歌词 */
export function getLyric(id){
    return request ({
        url:'/lyric',
        params:{
            id:id
        }
    })
}

/**对歌曲数据进行封装 */
export class songDetail{
    constructor(songs){
        this.id= songs[0].id ;
        this.name = songs[0].name;
        this.album= songs[0].al.name ;
        this.artist=songs[0].ar[0].name;
        this.pic=songs[0].al.picUrl;
        this.time=formatDate(new Date(songs[0].dt),'mm:ss')
    }
}
