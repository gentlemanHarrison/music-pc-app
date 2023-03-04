import {request} from './request.js'

/**获取轮播图数据 */
export function getBanner() {
    return request({
        url: '/banner'
    })
}

/**推荐歌单 */
export function getPersonalized(config) {
    return request({
        url: '/personalized',
        params: {
            limit: config
        }
    })
}

export function getPrivateContent(){
	return request({
		url:'/personalized/privatecontent'
	})
}
