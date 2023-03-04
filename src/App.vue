<template>
  <div id="app">
    <musicHeader />
    <musicLeft />
    <div class="container">
      <keep-alive exclude="SearchDetail,SingerDetail,MusicListDetail">
        <router-view/>
      </keep-alive>
    </div>
    <musicFooter />
  </div>
</template>

<script>
import musicHeader from "./components/common/musicHeader/musicHeader.vue";
import musicLeft from "./components/common/musicLeft/MusicLeft.vue";
import musicFooter from "./components/common/musicfooter/musicFooter.vue";
export default {
  components: {
    musicHeader,
    musicLeft,
    musicFooter,
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 100vh;
}
.container {
  position: absolute;
  left: 16%;
  top: 65px;
  padding-bottom: 60px;
  width: 84%;
  height: calc(100% - 60px);
  padding-left: 25px;
  overflow-y: scroll;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.el-popover{
  height: 400px; 
  overflow-y: scroll;
}
/* 设置滚动条整体，宽高 */
::-webkit-scrollbar{
	width:8px;
	height:8px;
}
/* 设置滚动条的轨道 */
::-webkit-scrollbar-track{
	background: #fff;
	border-radius:2px;
}
/* 设置滚动条里面的小方块 */
::-webkit-scrollbar-thumb{
	background: #ccc;
	border-radius:10px;
}
/* 修改elmentui样式 */
 .el-pager li.active {
  color: #e00;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #e00;
  color: #fff;
}
/* 左右翻页移上去样式 */
.el-pagination button:hover {
  color: #fff;
  background-color: #e00;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #fff;
  background-color: #e00;
} 
.el-loading-spinner{
  top: 200px;
}
</style>
