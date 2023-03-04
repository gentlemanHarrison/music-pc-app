import axios from 'axios'
import store from '@/store'
export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    baseURL:'/api',
    timeout: 30000,
    withCredentials: true
  })
  //2.axios的拦截器
  //2.1 请求拦截的作用
  instance.interceptors.request.use(config =>{
    const token = store.state.token
    //如果用户已经登录，设置请求头
    if(token){
       //设置token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },err =>{
    console.log(err)
  })

  instance.defaults.withCredentials = true;
  //2.2.响应拦截
  instance.interceptors.response.use(res =>{
    return res
  },err =>{
     console.log(err)
  })
  //3.发送真正的网络请求
  return instance(config)
}