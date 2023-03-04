<template>
  <div class="header">
    <!-- 网易云logo图区域 -->
    <div class="header-logo">
      <img src="@/assets/img/header/logo.png" />
    </div>
    <!-- 回退和前进按钮 -->
    <div class="header-return">
      <i
        class="el-icon-arrow-left"
        style="color: #fff; font-size: 10px"
        @click="$router.go(-1)"
      ></i>
      <i
        class="el-icon-arrow-right"
        style="color: #fff; font-size: 12px"
        @click="$router.go(1)"
      ></i>
    </div>
    <!-- 搜索按钮区域 -->
    <div class="header-search">
      <!-- <div class="header-btn">
        <img src="../../../assets/img/header/search.svg" />
      </div>
      <input
        type="text"
        placeholder="请输入要搜索的歌曲"
        v-model="inputValue"
        @keyup.enter="toSearchDetail"
      /> -->
      <!-- 搜索的弹出框 -->
      <el-popover
        placement="bottom"
        width="360"
        v-model="isPopShow"
        height="200"
        trigger="focus"
        popper-class="searchPop"
        transition
        offset:100
      >
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="mini"
          slot="reference"
          @keyup.enter.native="toSearchDetail"
          v-model="inputValue"
        />
        <!-- 搜索历史 -->
        <div v-show="newHistroySearch.length">
          搜索历史
          <!-- 清空历史记录按钮 -->
          <i class="el-icon-delete" @click="clearHistory" style="margin-left:5px;"></i>
          <div class="history-singer">
            <!-- 历史搜索列表 -->
            <span  v-for="(item,index) in newHistroySearch" :key="index"
            @click="historyClick(item)">
              {{item}}
              </span>
          </div>
        </div>
        <!-- 热搜榜 -->
        <div class="hotSearch">
          <div class="hotSearchTitle">热搜榜</div>
          <div
            class="hotSearchItem"
            v-for="(item, index) in hotSearchList"
            :key="index"
            @click="goSearch(item.searchWord)"
          >
            <!-- 热门歌曲排序 -->
            <div class="hotSearchIndex" :class="index < 3 ? 'topThree' : ''">
              {{ index + 1 }}
            </div>
            <div class="hotSearchInfo">
              <div class="hotSearchWord">
                <!-- 歌手名字 -->
                <span :class="index < 3 ? 'hotSearchWordTopThree' : ''">{{
                  item.searchWord
                }}</span>
                <!--歌手分数 -->
                <span style="margin: 0 8px; color: #ccc">{{ item.score }}</span>
                <!--hot图片 -->
                <img :src="item.iconUrl" v-if="item.iconUrl" />
              </div>
              <div class="hotSearchContent">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </el-popover>
    </div>
    <!-- 用户登录区域 -->
    <div class="header-profile">
      <div class="header-login" v-if="!userName">
        <img src="../../../assets/img/header/profile.svg" />
        <span @click="showLogin">未登录</span>
      </div>
      <div class="header-me" v-else>
        <img :src="avatar" />
        <span @click="showProfile">{{ userName }}</span>
      </div>
    </div>
    <!-- 用户登录界面组件 -->
    <div v-show="isLogin">
      <loginPanel />
    </div>
  </div>
</template>

<script>
import loginPanel from "./childComps/loginPanel.vue";
import { mapState } from "vuex";
import { getSearchHot } from "@/network/search.js";
export default {
  data() {
    return {
      inputValue: "", //搜索关键词
      isLogin: false, //是否显示登录界面
      isPopShow: false, //是否显示弹出框
      hotSearchList: [], // 热门搜索列表
      historySearch:JSON.parse(localStorage.getItem('history')) || [] //搜索历史列表
    };
  },
  async mounted() {
    //获取热门搜索列表
    const res = await getSearchHot();
    // console.log(res);
    this.hotSearchList = res.data.data;
  },
  computed: {
    ...mapState(["userName", "avatar"]),
    newHistroySearch(){
      return [...this.historySearch].reverse()
    }
  },
  watch:{
    historySearch: {
      deep: true,
      handler () {
        const set = new Set(this.historySearch)
        const arr = Array.from(set)
        localStorage.setItem('history', JSON.stringify(arr))
      }
    }
  },
  methods: {
    //去搜索详情页事件
    toSearchDetail() {
      if (this.inputValue.trim() === "") {
        //提示用户
        this.$message.warning("请输入搜索内容");
        //清空输入框
        this.inputValue = "";
      } else {
        this.historySearch.push(this.inputValue)
        //前往搜索详情页面
        this.$router.push("/searchdetail?q=" + this.inputValue);
        //清空输入框
        this.inputValue = "";
        //隐藏弹出框
        this.isPopShow = false;
      }
    },
    goSearch(name) {
      this.historySearch.push(name)
      //前往搜索详情页面
      this.$router.push("/searchdetail?q=" + name);
        //隐藏弹出框
        this.isPopShow = false;
    },
    historyClick(item){
         //前往搜索详情页面
      this.$router.push("/searchdetail?q=" + item);
        //隐藏弹出框
        this.isPopShow = false;
    },
    //显示登录界面
    showLogin() {
      //console.log("--")
      this.isLogin = true;
    },
    //显示个人中心界面
    showProfile() {
      this.$router.push("/profile");
    },
    //清空历史搜索
    clearHistory(){
      this.historySearch = []
    }
  },
  components: {
    loginPanel,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  background-color: #ec4141;
  align-items: center;
  height: 65px;
  width: 100%;
  position: relative;
  z-index: 10;
}
.header-logo {
  display: flex;
  width: 200px;
  margin: 15px;
}
.header-logo img {
  width: 70%;
  height: 35px;
}
/* 回退和前进按钮样式 */
.header-return {
  display: flex;
  width: 70px;
}
.header-return i:nth-child(1) {
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  width: 23px;
  height: 23px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}
.header-return i:nth-child(2) {
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  width: 23px;
  height: 23px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
/* 搜索框 */
/* .header-search {
  position: relative;
  width: 200px;
  background-color: #eee;
  display: flex;
  border-radius: 50px;
  height: 30px;
}
.header-search input {
  width: 150px;
  margin-left: 25px;
  background-color: #eee;
  border: 0;
  font-size: 13px;
}
.header-btn {
  width: 20px;
  height: 20px;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 3px;
  bottom: 0;
  margin: auto;
}
.header-btn img {
  width: 100%;
  height: 100%;
} */
/* 搜索历史样式 */
.history-singer {
  margin-top: 5px;
  padding: 0 8px;
  display: flex;
  flex-wrap: wrap;
}
.history-singer span {
  display: inline-block;
  font-size: 10px;
  padding: 3px 15px;
  border: 1px solid #ddd;
  margin: 5px;
  border-radius: 20px;
}
.hotSearchTitle {
  font-size: 13px;
  margin: 10px 0 5px 20px;
}

.hotSearchItem {
  display: flex;
  align-items: center;
  padding: 15px;
  height: 15%;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hotSearchItem:hover {
  background-color: #f2f2f2;
}

.hotSearchIndex {
  margin-right: 15px;
  width: 20px;
  color: #aaa;
}

.topThree {
  color: #e13e3e;
}

.hotSearchWord {
  font-size: 12px;
  color: rgb(51, 51, 51);
}

.hotSearchWordTopThree {
  font-weight: 600;
  color: black;
}

.hotSearchContent {
  font-size: 12px;
  color: #aaa;
  /* transform: scale(0.9) translateX(-5%); */
}
.topThree {
  color: #e13e3e;
}

.hotSearchWord {
  font-size: 12px;
  color: rgb(51, 51, 51);
}
.hotSearchWord img {
  width: 20px;
  height: 13px;
}
.hotSearchWordTopThree {
  font-weight: bold;
}
.header-profile {
  display: flex;
  margin-left: 27%;
  height: 60px;
}
.header-login {
  display: flex;
}
.header-login img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}
.header-login span {
  height: 60px;
  line-height: 60px;
  align-items: center;
  margin-left: 10px;
}
.header-me {
  display: flex;
}
.header-me img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
  border-radius: 50%;
}
.header-me span {
  height: 60px;
  line-height: 60px;
  align-items: center;
  margin-left: 10px;
}
>>> .el-input--mini .el-input__inner {
  height: 30px;
  transform: scale(0.9);
}

.el-input {
  width: 90%;
}

>>> .el-input--mini .el-input__icon {
  line-height: 30px;
  color: rgb(235, 235, 235);
  transform: scale(0.9);
}

>>> .el-input__prefix {
  left: 12px;
}

>>> .el-input__inner {
  background-color: #e13e3e;
  border: none;
  color: white;
  border-radius: 15px;
}

>>> .el-input__inner::-webkit-input-placeholder {
  color: white;
}

>>> .el-form-item {
  font-size: 12px;
}

>>> .el-form-item__label-wrap {
  width: 100px;
  text-align: right;
  transform: scale(0.9);
}

>>> .el-button--danger:focus,
.el-button--danger:hover {
  background-color: #ec4141;
  color: #fff;
}
>>> .el-button--danger {
  background-color: #ec4141;
}

>>> .el-button:focus,
>>> .el-button:hover {
  border-color: #dcdfe6;
  color: #606266;
}
</style>
