import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //tabCurrentIndex:localStorage.getItem("tabCurrentIndex"),
    playList: JSON.parse(localStorage.getItem('playList'))||[
      {
        album: "苦茶子",
        artist: "Starling8",
        id: 1922888354,
        index: 2,
        name: "苦茶子",
        pic: "https://p1.music.126.net/x8LI4oQGho-afSQFthr7wg==/109951167084000790.jpg",
        time: "02:50",
      }
    ] ,//播放的音乐列表
    playIndex: 0,
    //保存当前歌曲播放的时间
    currentTime: 0,
    //保存当前播放歌曲的歌词
    lyrData: {},
    token: '' || localStorage.getItem('token'),
    uid: '' || localStorage.getItem('uid'),
    avatar: null || localStorage.getItem('avatar'),
    userName: null || localStorage.getItem('userName'),
  },
  mutations: {
    //更新页面左边导航的索引
    // updateTabCurrentIndex(state, tabCurrentIndex) {
    //   state.tabCurrentIndex = tabCurrentIndex
    //   localStorage.setItem('tabCurrentIndex',tabCurrentIndex)
    // },
    //更新当前音乐列表
    updatePlayList(state, playList) {
      state.playList = playList
      localStorage.setItem('playList',JSON.stringify(playList)) 
    },
    // 更新播放的下标
    updatePlayIndex(state, playIndex) {
      state.playIndex = playIndex
    },
    //更新当前播放时间
    updateCurrentTime(state, currentTime) {
      state.currentTime = currentTime
    },
    //更新歌词
    updateLyrData(state, lyrData) {
      state.lyrData = lyrData
    },
    //更新用户的token
    updateToken(state, token) {
      state.token = token
    },
    //更新用户头像
    updateAvatar(state, avatar) {
      state.avatar = avatar
    },
    //更新用户名
    updateUserName(state, userName) {
      state.userName = userName
    },
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
