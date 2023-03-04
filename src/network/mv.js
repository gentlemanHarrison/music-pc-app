import {request} from './request.js'

/**mv详情 */
export function getMvDetail(mvid){
    return request({
        url:'/mv/detail',
        params:{
            mvid
        }
    })
}

/**mv地址 */
export function getMVUrl(id){
    return request({
        url:'/mv/url',
        params:{
            id
        }
    })
}

/**mv评论 */
export function getMVComment(id,limit,offset){
    return request({
        url:'/comment/mv',
        params:{
            id,
            limit,
            offset
        }
    })
}

/**相似MV */
export function getSimiMv(id){
    return request({
        url:'/simi/mv',
        params:{
            mvid:id
        }
    })
}

/**推荐mv */
export  function getTopMv(limit=10,area,offset){
    return request({
        url:'/top/mv',
        params:{
            limit:limit,
            area,
            offset
        }
    })
}
// 全部mv
export function getMvAll(area,limit,offset){
	return request({
		url:'/mv/all',
		params:{
			area,
			limit,
			offset
		}
	})
}