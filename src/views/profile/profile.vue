<template>
  <div class="prifile-panel">
    <div class="profile-top">
      <div class="profile-img">
        <img :src="getavatar" />
      </div>
      <div class="profile-name">{{ getUserName }}</div>
      <div class="loginout" @click="_loginout">
        <span>退出登录</span>
      </div>
    </div>
    <div class="profile-muscilist">
      <p>我喜欢的音乐</p>
    </div>
    <MusicList :Lists="playList" />
  </div>
</template>

<script>
import { getUserPlaylist, loginOut } from "../../network/login.js";
import { userDetail } from "../../network/profile.js";
import MusicList from "../../components/content/musicList/MusicList.vue";
export default {
  data() {
    return {
      listid: null,
      uid: null,
      createdMusicList: [],
      collectedMusicList: [],
      playList: [],
    };
  },
  mounted() {
    this.uid = this.$store.state.uid;
    this._getUserPlaylist();
     userDetail(this.uid).then(res=>{
    	 //console.log(res)
     })
  },
  computed: {
    getavatar() {
      return this.$store.state.avatar;
    },
    getUserName() {
      return this.$store.state.userName;
    },
  },
  methods: {
    _getUserPlaylist() {
      //console.log( this.getUserId)
      //获取用户歌单
      getUserPlaylist(this.uid).then((res) => {
        console.log(res);
        //this.listid = res.data.playlist[0].id;
        this.playList = res.data.playlist;
      });
    },
    _loginout() {
      loginOut().then((res) => {
        if (res.data.code != 200) {
          this.$message("退出登录失败, 请稍后重试!");
          return;
        }
        //移除本地储存的用户名和头像
        localStorage.removeItem("userName");
        localStorage.removeItem("avatar");
        this.$store.commit("updateUserName", null);
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
      });
      this.$message.success("退出成功!");
      this.$router.push("/comment");

    },
  },
  components: {
    MusicList,
  },
};
</script>

<style scoped>
.prifile-panel {
  position: fixed;
  top: 60px;
  left: 220px;
  background-color: #fff;
  width: 100%;
  height: calc(100%-120px);
  bottom: 60px;
}
.profile-top {
  display: flex;
  margin: 20px;
}
.profile-img {
  width: 200px;
  height: 200px;
}
.profile-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.loginout {
  margin-left: 30px;
  color: #373737;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  font-weight: lighter;
  padding: 0 15px;
  border: 1px solid #ddd;
  transform: scale(0.9);
}

.loginout:hover {
  background-color: #f2f2f2;
}
.profile-muscilist{
   margin-left: 20px;
}
</style>
