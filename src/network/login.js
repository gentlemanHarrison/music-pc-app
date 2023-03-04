import {request} from './request.js'

//检测手机号码是否已注册
export function phoneVerify(phone){
	return request({
		url:'/cellphone/existence/check',
		params:{
			phone
		}
	})
}


export function login(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone,
            password
        }
    })
}

export function getUserPlaylist(uid ){
	return request({
		url:'/user/playlist',
		params:{
			uid 
		}
	})
}

export function loginOut(){
	return request({
		url:'/logout'
	})
}


export function loginStatus(){
	return request({
		url:'/login/status'
	})
}
