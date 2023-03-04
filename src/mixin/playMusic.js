import { getMusicUrl } from '../network/ListDetail.js'
import { songInfo } from '../components/common/initSongInfo.js'
//播放音乐mixin封装
export const playMusic = {
	methods: {
		playMusic(index) {
			//console.log(this.musicList)
			//console.log(index)
			let playList = []
			for (let i = 0, length = this.musicList.length; i < length; i++) {
				getMusicUrl(this.musicList[i].id).then(res =>{
					let url = res.data.data[0].url;
					//console.log(res)
					let song = new songInfo(i, this.musicList[i],url, this.musicList[i].id)
					//console.log(song)
					playList.push(song)
					if (i == 0) {
					    /**全局播放事件
					     * playList         处理后的播放列表
					     * index            音乐列表中音乐开始播放的位置
					     * musicList        歌曲列表，用于播放器中歌单展示
					     * id               唯一标识，用于显示当前播放歌曲的列表
					     */
					   this.$bus.$emit('playMusic',playList,index,this.musicList,this.id)
					}
				})
			}	
			//console.log(playList) 
			// let playList = this.musicList.map(async (x) => {
			// 	let {data:result} = await getMusicUrl(x.id)
			//     return {
			// 		index,
			// 		id:result.id,
			// 		url:result.url
			// 	}
			// })
			
		}
	}
}

