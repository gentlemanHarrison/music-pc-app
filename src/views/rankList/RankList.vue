<template>
  <div class="rank-list">
    <RankListItem :slist="sList" :wlist="wList" :itemSong="song" />
  </div>
</template>

<script>
import RankListItem from "./childComps/RankListItem.vue";
import { getRankList } from "../../network/rank.js";
import { getMusicListDetail } from "../../network/ListDetail.js";

export default {
  data() {
    return {
      sList: [],
      wList: [],
      id: [],
      song: [],
    };
  },
  created() {
    getRankList().then((res) => {
      this.sList = res.data.list.slice(0, 4);
      this.wList = res.data.list.slice(4, 33);
      for (let i = 0; i < this.sList.length; i++) {
        let sid = this.sList[i].id;
        this.id.push(sid);
        getMusicListDetail(this.id[i]).then((res) => {
          let totalsong = res.data.playlist.tracks.slice(0, 8);
          this.song.push(totalsong);
          //console.log(this.song)
        });
      }
      //console.log(this.id)
    });
  },
  components: {
    RankListItem
  }
};
</script>

<style scoped>
.rank-list{
  width: 100%;
}
</style>>


