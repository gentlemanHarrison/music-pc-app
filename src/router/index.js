import Vue from 'vue'
import VueRouter from 'vue-router'

const Recomment = () => import('../views/Recomment/Recomment.vue')
const SongList = () => import('../views/songList/SongList.vue')
const RankList = () => import('../views/rankList/RankList.vue')
const Singers = () => import('../views/singers/Singers.vue')
const Mv = () => import('../views/mv/Mv.vue')
const NewMusic = () => import('../views/newMusic/NewMusic.vue')
const MusicListDetail = () => import('../views/musicListDetail/MusicListDetail.vue')
const SingerDetail = () => import('../views/singerDetail/SingerDetail.vue')
const MvDetail = () => import('../views/mvDetail/MvDetail.vue')
const SearchDetail = () => import ('../views/searchDetail/SearchDetail.vue')
const profile = () => import('../views/profile/profile.vue')
Vue.use(VueRouter)


/**解决router重复报错 */
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
	{
	  path: '',
	  redirect: '/recomment'
	},
	{
	    path: '/recomment',
	    component: Recomment
	},
	{
		path:'/musiclistdetail',
		component: MusicListDetail
	},
	{
	    path: '/songlist',
	    component: SongList
	},
	{
	    path: '/rankList',
	    component: RankList
	},
	{
	    path: '/singers',
	    component: Singers
	},
	{
	    path: '/singerdetail',
	    component: SingerDetail
	},
	{
	    path: '/mvdetail',
	    component: MvDetail
	},
	{
	    path: '/mv',
	    component: Mv
	},
	{
	    path: '/newmusic',
	    component: NewMusic
	},
	{
	    path: '/searchdetail',
	    component: SearchDetail
	},
	{
		path:'/profile',
		component:profile
	}
]

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to,from,next) => {
	if(!localStorage.getItem('token')&&to.path === '/profile'){
		next('/')
	}else{
		next()
	}
})

export default router
